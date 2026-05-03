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

  it('should yield MODIFIED events', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        namespace: 'default',
        resourceVersion: '12346',
      },
      spec: {
        containers: [{ name: 'nginx', image: 'nginx:1.21' }],
      },
    };

    const watchData = JSON.stringify({
      type: 'MODIFIED',
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
      type: 'MODIFIED',
      object: mockPod,
      resourceVersion: '12346',
    });
  });

  it('should yield DELETED events', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        namespace: 'default',
        resourceVersion: '12347',
      },
    };

    const watchData = JSON.stringify({
      type: 'DELETED',
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
      type: 'DELETED',
      object: mockPod,
      resourceVersion: '12347',
    });
  });

  it('should yield BOOKMARK events', async () => {
    const watchData = JSON.stringify({
      type: 'BOOKMARK',
      object: {
        apiVersion: 'v1',
        kind: 'WatchEvent',
        metadata: {
          resourceVersion: '12348',
        },
      },
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
      type: 'BOOKMARK',
      object: {
        apiVersion: 'v1',
        kind: 'WatchEvent',
        metadata: {
          resourceVersion: '12348',
        },
      },
      resourceVersion: '12348',
    });
  });

  it('should handle K8s ERROR events', async () => {
    const errorData = {
      type: 'ERROR',
      object: {
        apiVersion: 'v1',
        kind: 'Status',
        status: 'Failure',
        message: 'Unauthorized',
        reason: 'Unauthorized',
        code: 401,
      },
    };

    const watchData = JSON.stringify(errorData);
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
      type: 'ERROR',
      error: {
        errorType: 'UNAUTHORIZED_ERROR',
        statusCode: 401,
        resourcePath: '/api/v1/pods',
      },
    });
  });

  it('should skip malformed JSON and continue watching', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        resourceVersion: '100',
      },
    };

    const watchData = [
      `${JSON.stringify({ type: 'ADDED', object: mockPod })}\n`,
      '{ invalid json\n',
      `${JSON.stringify({ type: 'MODIFIED', object: mockPod })}\n`,
    ];

    const mockStream = Readable.from(watchData);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      resourcePath,
      logger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(2);
    expect(events[0].type).toBe('ADDED');
    expect(events[1].type).toBe('MODIFIED');
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Failed to parse watch event'),
    );
  });

  it('should skip empty lines', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        resourceVersion: '100',
      },
    };

    const watchData = [
      `${JSON.stringify({ type: 'ADDED', object: mockPod })}\n`,
      '\n',
      '\n',
      `${JSON.stringify({ type: 'MODIFIED', object: mockPod })}\n`,
    ];

    const mockStream = Readable.from(watchData);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      resourcePath,
      logger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(2);
    expect(events[0].type).toBe('ADDED');
    expect(events[1].type).toBe('MODIFIED');
  });

  it('should handle multiple events in sequence', async () => {
    const mockPod = {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        name: 'test-pod',
        resourceVersion: '100',
      },
    };

    const watchData = [
      `${JSON.stringify({ type: 'ADDED', object: mockPod })}\n`,
      `${JSON.stringify({
        type: 'MODIFIED',
        object: {
          ...mockPod,
          metadata: { ...mockPod.metadata, resourceVersion: '101' },
        },
      })}\n`,
      `${JSON.stringify({ type: 'DELETED', object: mockPod })}\n`,
    ];

    const mockStream = Readable.from(watchData);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      resourcePath,
      logger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(3);
    expect(events[0].type).toBe('ADDED');
    expect(events[0].resourceVersion).toBe('100');
    expect(events[1].type).toBe('MODIFIED');
    expect(events[1].resourceVersion).toBe('101');
    expect(events[2].type).toBe('DELETED');
    expect(events[2].resourceVersion).toBe('100');
  });
});
