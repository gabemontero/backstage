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

import express from 'express';
import Router from 'express-promise-router';
import request from 'supertest';
import type { Entity } from '@backstage/catalog-model';
import {
  mockCredentials,
  mockErrorHandler,
  mockServices,
} from '@backstage/backend-test-utils';
import type {
  AuditorService,
  HttpAuthService,
} from '@backstage/backend-plugin-api';
import type { CatalogService } from '@backstage/plugin-catalog-node';
import {
  AuthorizeResult,
  type PermissionEvaluator,
} from '@backstage/plugin-permission-common';
import type {
  KubernetesWatchStreamEvent,
  KubernetesWatchSubscription,
} from '@backstage/plugin-kubernetes-common';

import { addWatchRoutesToRouter } from './watchRoutes';
import type { KubernetesWatchFanOutHandler } from '../service/KubernetesWatchFanOutHandler';

const entity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'my-component',
    namespace: 'default',
  },
};

const subscription: KubernetesWatchSubscription = {
  id: 'cluster-a|pods|v1|pods|my-ns|backstage.io/kubernetes-id=my-component',
  cluster: 'cluster-a',
  objectType: 'pods',
  group: '',
  apiVersion: 'v1',
  plural: 'pods',
  namespace: 'my-ns',
  labelSelector: 'backstage.io/kubernetes-id=my-component',
};

function makeApp(options: {
  allow?: boolean;
  events?: KubernetesWatchStreamEvent[];
  failure?: Error;
}) {
  const auditEvent = {
    success: jest.fn().mockResolvedValue(undefined),
    fail: jest.fn().mockResolvedValue(undefined),
  };
  const createEvent = jest.fn().mockResolvedValue(auditEvent);
  const auditor = {
    createEvent,
  } as unknown as AuditorService;
  const httpAuth = {
    credentials: jest.fn().mockResolvedValue(mockCredentials.user()),
  } as unknown as HttpAuthService;
  const permissionApi = {
    authorize: jest.fn().mockResolvedValue([
      {
        result:
          options.allow === false
            ? AuthorizeResult.DENY
            : AuthorizeResult.ALLOW,
      },
    ]),
  } as unknown as PermissionEvaluator;
  const catalog = {
    getEntityByRef: jest.fn().mockResolvedValue(entity),
  } as unknown as CatalogService;
  const watchFanOut = {
    watchObjectsByEntity: jest.fn().mockImplementation(async function* () {
      for (const event of options.events ?? []) {
        yield event;
      }
      if (options.failure) {
        throw options.failure;
      }
    }),
  } as unknown as KubernetesWatchFanOutHandler;

  const router = Router();
  addWatchRoutesToRouter(router, {
    catalog,
    watchFanOut,
    httpAuth,
    permissionApi,
    auditor,
    logger: mockServices.logger.mock(),
  });

  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(mockErrorHandler());

  return { app, auditEvent, createEvent, watchFanOut };
}

describe('watchRoutes', () => {
  it('streams multiplexed events as server-sent events', async () => {
    const { app, auditEvent } = makeApp({
      events: [
        {
          subscription,
          type: 'ADDED',
          object: { kind: 'Pod', metadata: { name: 'pod-1' } },
          resourceVersion: '1',
        },
        {
          subscription,
          type: 'MODIFIED',
          object: { kind: 'Pod', metadata: { name: 'pod-1' } },
          resourceVersion: '2',
        },
      ],
    });

    const response = await request(app)
      .post('/resources/watch')
      .send({ entityRef: 'component:default/my-component' });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('text/event-stream');
    expect(response.text.match(/^data: /gm)).toHaveLength(2);
    expect(response.text).toContain('"resourceVersion":"2"');
    expect(auditEvent.success).toHaveBeenCalled();
    expect(auditEvent.fail).not.toHaveBeenCalled();
  });

  it('creates an audit event with the watch query type', async () => {
    const { app, createEvent, auditEvent } = makeApp({ events: [] });

    await request(app)
      .post('/resources/watch')
      .send({ entityRef: 'component:default/my-component' });

    expect(createEvent).toHaveBeenCalledWith({
      eventId: 'resource-fetch',
      request: expect.anything(),
      meta: {
        queryType: 'watch',
        entityRef: 'component:default/my-component',
      },
    });
    expect(auditEvent.success).toHaveBeenCalled();
  });

  it('rejects a request without an entity ref', async () => {
    const { app, auditEvent } = makeApp({ events: [] });

    const response = await request(app).post('/resources/watch').send({});

    expect(response.status).toBe(400);
    expect(auditEvent.fail).toHaveBeenCalled();
    expect(auditEvent.success).not.toHaveBeenCalled();
  });

  it('rejects a request when the permission is denied', async () => {
    const { app, auditEvent } = makeApp({ events: [], allow: false });

    const response = await request(app)
      .post('/resources/watch')
      .send({ entityRef: 'component:default/my-component' });

    expect(response.status).toBe(403);
    expect(auditEvent.fail).toHaveBeenCalled();
    expect(auditEvent.success).not.toHaveBeenCalled();
  });

  it('sends an error event when the watch stream fails after starting', async () => {
    const { app, auditEvent } = makeApp({
      events: [
        {
          subscription,
          type: 'ADDED',
          object: { kind: 'Pod', metadata: { name: 'pod-1' } },
        },
      ],
      failure: new Error('watch failed'),
    });

    const response = await request(app)
      .post('/resources/watch')
      .send({ entityRef: 'component:default/my-component' });

    expect(response.status).toBe(200);
    expect(response.text).toContain('"type":"ERROR"');
    expect(auditEvent.fail).toHaveBeenCalled();
    expect(auditEvent.success).not.toHaveBeenCalled();
  });
});
