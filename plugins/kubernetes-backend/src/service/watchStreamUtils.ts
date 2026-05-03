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

import { Readable } from 'node:stream';
import split2 from 'split2';
import { LoggerService } from '@backstage/backend-plugin-api';
import { statusCodeToErrorType } from './KubernetesFetcher';
import type { KubernetesFetchError } from '@backstage/plugin-kubernetes-common';

export interface WatchEvent {
  type: string;
  object?: unknown;
  resourceVersion?: string;
}

export type WatchStreamEvent = WatchEvent | KubernetesFetchError;

export async function* processWatchStream(
  stream: Readable,
  resourcePath: string,
  logger: LoggerService,
): AsyncGenerator<WatchStreamEvent> {
  const pipeline = stream.pipe(split2(JSON.parse));

  try {
    for await (const data of pipeline) {
      // Skip empty lines
      if (!data) {
        continue;
      }

      // Handle malformed JSON - split2 will throw or return undefined/null
      if (!data.type) {
        logger.warn(
          `Malformed watch event received for path "${resourcePath}": missing type field`,
        );
        continue;
      }

      // Transform ERROR events to error type
      if (data.type === 'ERROR') {
        const statusCode = data.object?.code;
        yield {
          errorType: statusCodeToErrorType(statusCode || 0),
          statusCode,
          resourcePath,
        } as KubernetesFetchError;
      } else {
        // Transform other events with type, object, and resourceVersion
        const resourceVersion = data.object?.metadata?.resourceVersion;
        yield {
          type: data.type,
          object: data.object,
          resourceVersion,
        } as WatchEvent;
      }
    }
  } finally {
    // Clean up stream
    pipeline.destroy();
  }
}
