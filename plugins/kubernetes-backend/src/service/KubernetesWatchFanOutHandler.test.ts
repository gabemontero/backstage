/*
 * Copyright 2026 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Entity } from '@backstage/catalog-model';
import { mockCredentials, mockServices } from '@backstage/backend-test-utils';
import type {
  KubernetesWatchEvent,
  KubernetesWatchStreamEvent,
} from '@backstage/plugin-kubernetes-common';
import type {
  AuthenticationStrategy,
  ClusterDetails,
  KubernetesServiceLocator,
  KubernetesWatcher,
  ObjectToFetch,
} from '@backstage/plugin-kubernetes-node';

import { KubernetesWatchFanOutHandler } from './KubernetesWatchFanOutHandler';

const objectTypesToFetch: ObjectToFetch[] = [
  {
    group: '',
    apiVersion: 'v1',
    plural: 'pods',
    objectType: 'pods',
  },
];

const entity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'my-component',
    namespace: 'default',
    annotations: {
      'backstage.io/kubernetes-namespace': 'my-ns',
    },
  },
};

function clusterDetails(
  name: string,
  overrides: Partial<ClusterDetails> = {},
): ClusterDetails {
  return {
    name,
    url: `https://${name}.example.com`,
    authMetadata: {
      'kubernetes.io/auth-provider': 'serviceAccount',
    },
    ...overrides,
  };
}

function createHandler(options: {
  clusters: ClusterDetails[];
  watchResource: jest.Mock;
  timeoutSeconds?: number;
}) {
  const serviceLocator = {
    getClustersByEntity: jest.fn().mockResolvedValue({
      clusters: options.clusters,
    }),
  } as unknown as KubernetesServiceLocator;

  const authStrategy = {
    getCredential: jest.fn().mockResolvedValue({
      type: 'bearer token',
      token: 'token',
    }),
    validateCluster: jest.fn().mockReturnValue([]),
    presentAuthMetadata: jest.fn().mockReturnValue({}),
  } as unknown as AuthenticationStrategy;

  return new KubernetesWatchFanOutHandler({
    logger: mockServices.logger.mock(),
    watcher: {
      watchResource: options.watchResource,
    } as unknown as KubernetesWatcher,
    serviceLocator,
    authStrategy,
    customResources: [],
    objectTypesToFetch,
    timeoutSeconds: options.timeoutSeconds,
  });
}

function generatorOf(
  events: KubernetesWatchEvent[],
  onReturn?: () => void,
): AsyncGenerator<KubernetesWatchEvent, void, undefined> {
  return (async function* () {
    try {
      for (const event of events) {
        yield event;
      }
    } finally {
      onReturn?.();
    }
  })();
}

async function collect(
  events: AsyncGenerator<KubernetesWatchStreamEvent, void, undefined>,
): Promise<KubernetesWatchStreamEvent[]> {
  const result: KubernetesWatchStreamEvent[] = [];
  for await (const event of events) {
    result.push(event);
  }
  return result;
}

describe('KubernetesWatchFanOutHandler', () => {
  it('fans out one watch per cluster and resource type with the combined watch key', async () => {
    const watched: Array<{ key: string; event: KubernetesWatchEvent }> = [];
    const watchResource = jest.fn(
      ({ clusterDetails: cluster, plural }, watchOptions) => {
        const event: KubernetesWatchEvent = {
          type: 'ADDED',
          object: {
            kind: 'Pod',
            metadata: { name: `${cluster.name}-${plural}` },
          },
          resourceVersion: '1',
        };
        watched.push({
          key: JSON.stringify({
            cluster: cluster.name,
            plural,
            ...watchOptions,
          }),
          event,
        });
        return generatorOf([event]);
      },
    );

    const handler = createHandler({
      clusters: [clusterDetails('cluster-a'), clusterDetails('cluster-b')],
      watchResource,
    });

    const events = await collect(
      handler.watchObjectsByEntity(
        { entity, auth: {} },
        { credentials: mockCredentials.user() },
      ),
    );

    expect(watchResource).toHaveBeenCalledTimes(2);
    expect(watchResource).toHaveBeenCalledWith(
      expect.objectContaining({
        clusterDetails: expect.objectContaining({ name: 'cluster-a' }),
        credential: { type: 'bearer token', token: 'token' },
        group: '',
        apiVersion: 'v1',
        plural: 'pods',
      }),
      {
        namespace: 'my-ns',
        labelSelector: 'backstage.io/kubernetes-id=my-component',
        allowWatchBookmarks: true,
        timeoutSeconds: 300,
        signal: undefined,
      },
    );

    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      type: 'ADDED',
      subscription: {
        cluster: 'cluster-a',
        objectType: 'pods',
        group: '',
        apiVersion: 'v1',
        plural: 'pods',
        namespace: 'my-ns',
        labelSelector: 'backstage.io/kubernetes-id=my-component',
      },
    });
    expect(new Set(events.map(event => event.subscription?.id)).size).toBe(2);
  });

  it('includes custom resources and honors the label selector annotation', async () => {
    const watchResource = jest.fn(() => generatorOf([]));

    const handler = createHandler({
      clusters: [
        clusterDetails('cluster-a', {
          customResources: [
            { group: 'example.com', apiVersion: 'v1', plural: 'widgets' },
          ],
        }),
      ],
      watchResource,
    });

    const selectedEntity: Entity = {
      ...entity,
      metadata: {
        ...entity.metadata,
        annotations: {
          ...entity.metadata.annotations,
          'backstage.io/kubernetes-label-selector': 'app=my-app',
        },
      },
    };

    await collect(
      handler.watchObjectsByEntity(
        { entity: selectedEntity, auth: {} },
        { credentials: mockCredentials.user() },
      ),
    );

    expect(watchResource).toHaveBeenCalledTimes(2);
    expect(watchResource).toHaveBeenCalledWith(
      expect.objectContaining({
        group: 'example.com',
        apiVersion: 'v1',
        plural: 'widgets',
      }),
      expect.objectContaining({ labelSelector: 'app=my-app' }),
    );
  });

  it('merges events from all subscriptions and isolates errors', async () => {
    const watchResource = jest.fn(({ plural }: { plural: string }) => {
      if (plural === 'pods') {
        return generatorOf([
          { type: 'ADDED', object: { metadata: { name: 'pod-1' } } },
          {
            type: 'ERROR',
            error: {
              errorType: 'UNKNOWN_ERROR',
              statusCode: 410,
              resourcePath: '/api/v1/pods',
            },
          },
        ]);
      }
      return generatorOf([
        { type: 'MODIFIED', object: { metadata: { name: 'service-1' } } },
      ]);
    });

    const handlerWithTwoResources = new KubernetesWatchFanOutHandler({
      logger: mockServices.logger.mock(),
      watcher: { watchResource } as unknown as KubernetesWatcher,
      serviceLocator: {
        getClustersByEntity: jest.fn().mockResolvedValue({
          clusters: [clusterDetails('cluster-a')],
        }),
      } as unknown as KubernetesServiceLocator,
      authStrategy: {
        getCredential: jest.fn().mockResolvedValue({
          type: 'bearer token',
          token: 'token',
        }),
        validateCluster: jest.fn().mockReturnValue([]),
        presentAuthMetadata: jest.fn().mockReturnValue({}),
      } as unknown as AuthenticationStrategy,
      customResources: [],
      objectTypesToFetch: [
        ...objectTypesToFetch,
        {
          group: '',
          apiVersion: 'v1',
          plural: 'services',
          objectType: 'services',
        },
      ],
    });

    const events = await collect(
      handlerWithTwoResources.watchObjectsByEntity(
        { entity, auth: {} },
        { credentials: mockCredentials.user() },
      ),
    );

    expect(events).toHaveLength(3);
    expect(events.filter(event => event.type === 'ADDED')).toHaveLength(1);
    expect(events.filter(event => event.type === 'MODIFIED')).toHaveLength(1);
    expect(events.filter(event => event.type === 'ERROR')).toEqual([
      expect.objectContaining({
        subscription: expect.objectContaining({ plural: 'pods' }),
        error: expect.objectContaining({ statusCode: 410 }),
      }),
    ]);
  });

  it('reports client-side auth clusters as unsupported without opening a watch', async () => {
    const watchResource = jest.fn(() => generatorOf([]));
    const handler = createHandler({
      clusters: [
        clusterDetails('cluster-a', {
          authMetadata: {
            'kubernetes.io/auth-provider': 'oidc',
          },
        }),
      ],
      watchResource,
    });

    const events = await collect(
      handler.watchObjectsByEntity(
        { entity, auth: {} },
        { credentials: mockCredentials.user() },
      ),
    );

    expect(watchResource).not.toHaveBeenCalled();
    expect(events).toEqual([
      expect.objectContaining({
        type: 'ERROR',
        subscription: expect.objectContaining({ cluster: 'cluster-a' }),
        error: expect.objectContaining({
          errorType: 'BAD_REQUEST',
          statusCode: 400,
        }),
      }),
    ]);
  });

  it('stops iterating and closes watches when aborted', async () => {
    let returned = false;
    let release!: () => void;
    const blocked = new Promise<void>(resolve => {
      release = resolve;
    });

    const watchResource = jest.fn(() =>
      (async function* () {
        try {
          yield {
            type: 'ADDED' as const,
            object: { metadata: { name: 'pod-1' } },
          };
          await blocked;
        } finally {
          returned = true;
        }
      })(),
    );

    const handler = createHandler({
      clusters: [clusterDetails('cluster-a')],
      watchResource,
    });

    const controller = new AbortController();
    const iterator = handler
      .watchObjectsByEntity(
        { entity, auth: {} },
        { credentials: mockCredentials.user(), signal: controller.signal },
      )
      [Symbol.asyncIterator]();

    const first = await iterator.next();
    expect(first.value).toMatchObject({ type: 'ADDED' });

    controller.abort();
    release();

    await expect(iterator.next()).resolves.toEqual({
      value: undefined,
      done: true,
    });
    expect(returned).toBe(true);
  });
});
