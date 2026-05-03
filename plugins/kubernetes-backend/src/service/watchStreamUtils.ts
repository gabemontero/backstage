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

import split2 from 'split2';
import { LoggerService } from '@backstage/backend-plugin-api';
import { statusCodeToErrorType } from './KubernetesFetcher';
import type { KubernetesWatchEvent } from '@backstage/plugin-kubernetes-common';

export async function* processWatchStream(
  stream: NodeJS.ReadableStream,
  resourcePath: string,
  logger: LoggerService,
): AsyncGenerator<KubernetesWatchEvent, void, undefined> {
  const lineStream = stream.pipe(split2());

  try {
    for await (const line of lineStream) {
      if (!line) continue; // Skip empty lines

      let data;
      try {
        data = JSON.parse(line);
      } catch (err) {
        logger.warn(`Failed to parse watch event: ${err}`);
        continue; // Skip malformed JSON
      }

      // Transform K8s watch event to our event type
      if (data.type === 'ERROR') {
        yield {
          type: 'ERROR',
          error: {
            errorType: statusCodeToErrorType(data.object?.code || 500),
            statusCode: data.object?.code || 500,
            resourcePath,
          },
        };
      } else {
        yield {
          type: data.type,
          object: data.object,
          resourceVersion: data.object?.metadata?.resourceVersion,
        };
      }
    }
  } finally {
    // Cleanup stream
    if (stream && 'destroy' in stream) {
      (stream as any).destroy();
    }
  }
}
