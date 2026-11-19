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
import type {
  BackstageCredentials,
  LoggerService,
} from '@backstage/backend-plugin-api';
import {
  ANNOTATION_KUBERNETES_AUTH_PROVIDER,
  KUBERNETES_ANNOTATION,
  KUBERNETES_LABEL_SELECTOR_QUERY_ANNOTATION,
  type KubernetesFetchError,
  type KubernetesWatchEvent,
  type KubernetesWatchStreamEvent,
  type KubernetesWatchSubscription,
} from '@backstage/plugin-kubernetes-common';
import type {
  AuthenticationStrategy,
  ClusterDetails,
  CustomResource,
  KubernetesObjectsByEntity,
  KubernetesServiceLocator,
  KubernetesWatcher,
  ObjectToFetch,
} from '@backstage/plugin-kubernetes-node';
import { DEFAULT_OBJECTS } from './KubernetesFanOutHandler';
import { CLIENT_SIDE_AUTH_PROVIDERS } from './KubernetesWatcher';

/**
 * Default server-side timeout for a Kubernetes watch subscription, in seconds.
 */
export const DEFAULT_WATCH_TIMEOUT_SECONDS = 300;

/**
 * Options for the {@link KubernetesWatchFanOutHandler}.
 *
 * @internal
 */
export interface KubernetesWatchFanOutHandlerOptions {
  logger: LoggerService;
  watcher: KubernetesWatcher;
  serviceLocator: KubernetesServiceLocator;
  authStrategy: AuthenticationStrategy;
  customResources: CustomResource[];
  objectTypesToFetch?: ObjectToFetch[];
  timeoutSeconds?: number;
}

type NextEvent =
  | { kind: 'event'; event: KubernetesWatchEvent }
  | { kind: 'done' }
  | { kind: 'error'; error: KubernetesFetchError };

interface WatchSubscription {
  subscription: KubernetesWatchSubscription;
  generator: AsyncGenerator<KubernetesWatchEvent, void, undefined>;
}

/**
 * Fans out a single entity watch request into one Kubernetes watch per
 * cluster and resource type, and merges the resulting events into a single
 * stream.
 *
 * Watches are scoped to a single request and are torn down when the returned
 * generator is closed or its abort signal fires.
 *
 * @internal
 */
export class KubernetesWatchFanOutHandler {
  private readonly logger: LoggerService;
  private readonly watcher: KubernetesWatcher;
  private readonly serviceLocator: KubernetesServiceLocator;
  private readonly authStrategy: AuthenticationStrategy;
  private readonly customResources: CustomResource[];
  private readonly objectTypesToFetch: ObjectToFetch[];
  private readonly timeoutSeconds: number;

  constructor({
    logger,
    watcher,
    serviceLocator,
    authStrategy,
    customResources,
    objectTypesToFetch = DEFAULT_OBJECTS,
    timeoutSeconds = DEFAULT_WATCH_TIMEOUT_SECONDS,
  }: KubernetesWatchFanOutHandlerOptions) {
    this.logger = logger;
    this.watcher = watcher;
    this.serviceLocator = serviceLocator;
    this.authStrategy = authStrategy;
    this.customResources = customResources;
    this.objectTypesToFetch = objectTypesToFetch;
    this.timeoutSeconds = timeoutSeconds;
  }

  async *watchObjectsByEntity(
    { entity, auth }: KubernetesObjectsByEntity,
    options: { credentials: BackstageCredentials; signal?: AbortSignal },
  ): AsyncGenerator<KubernetesWatchStreamEvent, void, undefined> {
    const entityName = getEntityName(entity);
    const labelSelector = getLabelSelector(entity, entityName);
    const namespace = getNamespace(entity);

    const { clusters } = await this.serviceLocator.getClustersByEntity(entity, {
      objectTypesToFetch: new Set(this.objectTypesToFetch),
      customResources: this.customResources,
      credentials: options.credentials,
    });

    this.logger.debug(
      `action=watchObjectsByEntity entity.metadata.name=${entityName} clusterDetails=[${clusters
        .map(c => c.name)
        .join(', ')}]`,
    );

    const subscriptions: WatchSubscription[] = [];
    try {
      for (const clusterDetails of clusters) {
        if (options.signal?.aborted) {
          return;
        }

        const credential = await this.authStrategy.getCredential(
          clusterDetails,
          auth,
        );

        for (const resource of this.getResourcesForCluster(clusterDetails)) {
          const subscription = buildSubscription(
            clusterDetails,
            resource,
            namespace,
            labelSelector,
          );

          if (
            CLIENT_SIDE_AUTH_PROVIDERS.has(
              clusterDetails.authMetadata[ANNOTATION_KUBERNETES_AUTH_PROVIDER],
            )
          ) {
            yield {
              subscription,
              type: 'ERROR',
              error: {
                errorType: 'BAD_REQUEST',
                statusCode: 400,
                resourcePath: buildResourcePath(resource, namespace),
              },
            };
            continue;
          }

          subscriptions.push({
            subscription,
            generator: this.watcher.watchResource(
              {
                clusterDetails,
                credential,
                group: resource.group,
                apiVersion: resource.apiVersion,
                plural: resource.plural,
              },
              {
                namespace,
                labelSelector,
                allowWatchBookmarks: true,
                timeoutSeconds: this.timeoutSeconds,
                signal: options.signal,
              },
            ),
          });
        }
      }

      yield* this.merge(subscriptions, options.signal);
    } finally {
      await Promise.all(
        subscriptions.map(async ({ generator }) => {
          try {
            await generator.return(undefined);
          } catch {
            // The stream is already closed; nothing left to clean up.
          }
        }),
      );
    }
  }

  private getResourcesForCluster(
    clusterDetails: ClusterDetails,
  ): ObjectToFetch[] {
    const customResources = (
      clusterDetails.customResources ?? this.customResources
    ).map(resource => ({
      ...resource,
      objectType: 'customresources' as const,
    }));

    return [...this.objectTypesToFetch, ...customResources];
  }

  private async *merge(
    subscriptions: WatchSubscription[],
    signal?: AbortSignal,
  ): AsyncGenerator<KubernetesWatchStreamEvent, void, undefined> {
    if (subscriptions.length === 0) {
      return;
    }

    const pending = subscriptions.map(subscription => ({
      ...subscription,
      next: this.nextEvent(subscription.generator),
    }));

    let onAbort: (() => void) | undefined;
    const aborted = new Promise<'abort'>(resolve => {
      if (!signal) {
        return;
      }
      if (signal.aborted) {
        resolve('abort');
        return;
      }
      onAbort = () => resolve('abort');
      signal.addEventListener('abort', onAbort, { once: true });
    });

    try {
      while (pending.length > 0) {
        if (signal?.aborted) {
          return;
        }

        const result = await Promise.race([
          ...pending.map(entry => entry.next.then(value => ({ entry, value }))),
          aborted,
        ]);

        if (result === 'abort') {
          return;
        }

        const index = pending.indexOf(result.entry);
        if (index === -1) {
          continue;
        }

        if (result.value.kind === 'done') {
          pending.splice(index, 1);
          continue;
        }

        if (result.value.kind === 'error') {
          pending.splice(index, 1);
          yield {
            subscription: result.entry.subscription,
            type: 'ERROR',
            error: result.value.error,
          };
          continue;
        }

        const { event } = result.value;
        if (event.type === 'ERROR') {
          yield {
            subscription: result.entry.subscription,
            type: 'ERROR',
            error: event.error,
          };
        } else {
          yield {
            subscription: result.entry.subscription,
            type: event.type,
            object: event.object,
            resourceVersion: event.resourceVersion,
          };
        }

        result.entry.next = this.nextEvent(result.entry.generator);
      }
    } finally {
      if (signal && onAbort) {
        signal.removeEventListener('abort', onAbort);
      }
    }
  }

  private async nextEvent(
    generator: AsyncGenerator<KubernetesWatchEvent, void, undefined>,
  ): Promise<NextEvent> {
    try {
      const result = await generator.next();
      return result.done
        ? { kind: 'done' }
        : { kind: 'event', event: result.value };
    } catch (error) {
      this.logger.warn(
        `Kubernetes watch stream failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return {
        kind: 'error',
        error: {
          errorType: 'SYSTEM_ERROR',
          statusCode: 0,
          resourcePath: '',
        },
      };
    }
  }
}

function getEntityName(entity: Entity): string {
  return (
    entity.metadata?.annotations?.['backstage.io/kubernetes-id'] ||
    entity.metadata?.name
  );
}

function getLabelSelector(entity: Entity, entityName: string): string {
  return (
    entity.metadata?.annotations?.[
      KUBERNETES_LABEL_SELECTOR_QUERY_ANNOTATION
    ] || `${KUBERNETES_ANNOTATION}=${entityName}`
  );
}

function getNamespace(entity: Entity): string | undefined {
  return entity.metadata?.annotations?.['backstage.io/kubernetes-namespace'];
}

function buildSubscription(
  clusterDetails: ClusterDetails,
  resource: ObjectToFetch,
  namespace: string | undefined,
  labelSelector: string,
): KubernetesWatchSubscription {
  return {
    id: [
      clusterDetails.name,
      resource.objectType,
      resource.group,
      resource.apiVersion,
      resource.plural,
      namespace ?? '',
      labelSelector,
    ].join('|'),
    cluster: clusterDetails.name,
    objectType: resource.objectType,
    group: resource.group,
    apiVersion: resource.apiVersion,
    plural: resource.plural,
    ...(namespace ? { namespace } : {}),
    labelSelector,
  };
}

function buildResourcePath(
  resource: Pick<ObjectToFetch, 'group' | 'apiVersion' | 'plural'>,
  namespace: string | undefined,
): string {
  const encode = (value: string) => encodeURIComponent(value);
  let path = resource.group
    ? `/apis/${encode(resource.group)}/${encode(resource.apiVersion)}`
    : `/api/${encode(resource.apiVersion)}`;
  if (namespace) {
    path += `/namespaces/${encode(namespace)}`;
  }
  path += `/${encode(resource.plural)}`;
  return path;
}
