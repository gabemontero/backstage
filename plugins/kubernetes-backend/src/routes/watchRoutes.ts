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
import {
  parseEntityRef,
  stringifyEntityRef,
  type CompoundEntityRef,
} from '@backstage/catalog-model';
import { InputError } from '@backstage/errors';
import type { Request, Response, Router } from 'express';
import type {
  AuditorService,
  HttpAuthService,
  LoggerService,
} from '@backstage/backend-plugin-api';
import type { PermissionEvaluator } from '@backstage/plugin-permission-common';
import { kubernetesResourcesReadPermission } from '@backstage/plugin-kubernetes-common';
import type { KubernetesWatchStreamEvent } from '@backstage/plugin-kubernetes-common';
import type { CatalogService } from '@backstage/plugin-catalog-node';

import { requirePermission } from '../auth/requirePermission';
import type { KubernetesWatchFanOutHandler } from '../service/KubernetesWatchFanOutHandler';

/**
 * How often to write a keep-alive comment to an otherwise idle watch stream.
 */
export const DEFAULT_WATCH_HEARTBEAT_INTERVAL_MS = 15_000;

/**
 * Options for {@link addWatchRoutesToRouter}.
 *
 * @internal
 */
export interface WatchRoutesOptions {
  catalog: CatalogService;
  watchFanOut: KubernetesWatchFanOutHandler;
  httpAuth: HttpAuthService;
  permissionApi: PermissionEvaluator;
  auditor: AuditorService;
  logger: LoggerService;
  heartbeatIntervalMs?: number;
}

/**
 * Adds the browser-facing Kubernetes watch endpoint to an Express router.
 *
 * The endpoint returns `text/event-stream` and multiplexes one Kubernetes
 * watch per cluster and resource type for the requested entity.
 *
 * @internal
 */
export function addWatchRoutesToRouter(
  router: Router,
  options: WatchRoutesOptions,
) {
  const {
    catalog,
    watchFanOut,
    httpAuth,
    permissionApi,
    auditor,
    logger,
    heartbeatIntervalMs = DEFAULT_WATCH_HEARTBEAT_INTERVAL_MS,
  } = options;

  const getEntityByReq = async (req: Request<any>): Promise<Entity> => {
    const rawEntityRef = req.body?.entityRef;
    if (rawEntityRef && typeof rawEntityRef !== 'string') {
      throw new InputError('entity query must be a string');
    } else if (!rawEntityRef) {
      throw new InputError('entity is a required field');
    }

    let entityRef: CompoundEntityRef | undefined;
    try {
      entityRef = parseEntityRef(rawEntityRef);
    } catch (error) {
      throw new InputError(`Invalid entity ref, ${error}`);
    }

    const entity = await catalog.getEntityByRef(entityRef, {
      credentials: await httpAuth.credentials(req),
    });
    if (!entity) {
      throw new InputError(
        `Entity ref missing, ${stringifyEntityRef(entityRef)}`,
      );
    }

    return entity;
  };

  router.post('/resources/watch', async (req: Request, res: Response) => {
    const entityRef =
      typeof req.body?.entityRef === 'string' ? req.body.entityRef : undefined;

    const auditorEvent = await auditor.createEvent({
      eventId: 'resource-fetch',
      request: req,
      meta: { queryType: 'watch', entityRef },
    });

    const controller = new AbortController();
    const abort = () => controller.abort();
    req.on('close', abort);

    let heartbeat: NodeJS.Timeout | undefined;

    try {
      await requirePermission(
        permissionApi,
        kubernetesResourcesReadPermission,
        httpAuth,
        req,
      );
      const credentials = await httpAuth.credentials(req);
      const entity = await getEntityByReq(req);

      res.status(200);
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.flushHeaders();

      heartbeat = setInterval(() => {
        if (!res.writableEnded) {
          res.write(': keep-alive\n\n');
        }
      }, heartbeatIntervalMs);
      heartbeat.unref?.();

      for await (const event of watchFanOut.watchObjectsByEntity(
        { entity, auth: req.body?.auth ?? {} },
        { credentials, signal: controller.signal },
      )) {
        if (controller.signal.aborted) {
          break;
        }
        await writeEvent(res, event);
      }

      auditorEvent
        .success()
        .catch(error =>
          logger.error(
            'Failed to emit audit event resource-fetch (watch)',
            error,
          ),
        );
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      await auditorEvent.fail({ error: err });

      if (res.headersSent) {
        if (!res.writableEnded && !controller.signal.aborted) {
          const errorEvent: KubernetesWatchStreamEvent = {
            type: 'ERROR',
            error: {
              errorType: 'SYSTEM_ERROR',
              statusCode: 0,
              resourcePath: '',
            },
          };
          try {
            await writeEvent(res, errorEvent);
          } catch {
            // The client is already gone.
          }
        }
        return;
      }

      throw error;
    } finally {
      if (heartbeat) {
        clearInterval(heartbeat);
      }
      req.off('close', abort);
      if (res.headersSent && !res.writableEnded) {
        res.end();
      }
    }
  });
}

async function writeEvent(
  res: Response,
  event: KubernetesWatchStreamEvent,
): Promise<void> {
  if (res.write(`data: ${JSON.stringify(event)}\n\n`)) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const handlers = {
      onDrain() {
        res.off('close', handlers.onClose);
        resolve();
      },
      onClose() {
        res.off('drain', handlers.onDrain);
        reject(new Error('SSE client disconnected'));
      },
    };

    res.once('drain', handlers.onDrain);
    res.once('close', handlers.onClose);
  });
}
