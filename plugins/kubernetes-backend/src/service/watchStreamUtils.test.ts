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
import { processWatchStream } from './watchStreamUtils';
import { mockServices } from '@backstage/backend-test-utils';

describe('processWatchStream', () => {
  const logger = mockServices.logger.mock();
  const resourcePath = '/api/v1/pods';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should yield ADDED events', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        namespace: 'default',
        resourceVersion: '12345',
      },
      spec: {
        containers: [{ name: 'nginx', image: 'nginx:latest' }],
      },
    };

    const watchData = JSON.stringify({
      type: 'ADDED',
      object: mockPod,
    });

    const mockStream = Readable.from([watchData]);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      resourcePath,
      logger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      type: 'ADDED',
      object: mockPod,
      resourceVersion: '12345',
    });
  });
});
