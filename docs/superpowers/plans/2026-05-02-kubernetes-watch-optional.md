# Kubernetes Watch Client - Optional Method Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add optional watch functionality to Kubernetes plugin with utility-based stream processing for better separation of concerns and testability.

**Architecture:** Optional `watchResource?()` method on `KubernetesFetcher` interface that delegates stream processing to a standalone `processWatchStream()` utility function. Main method handles HTTP/auth, utility handles NDJSON parsing and event transformation.

**Tech Stack:** TypeScript, split2, node-fetch, MSW (for testing)

---

## File Structure

### New Files

- `plugins/kubernetes-backend/src/service/watchStreamUtils.ts` - Stream processing utility (~40 lines)
- `plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts` - Unit tests for utility (~300 lines)

### Modified Files

- `plugins/kubernetes-common/src/types.ts` - Watch event type definitions
- `plugins/kubernetes-node/src/types/types.ts` - Optional interface method
- `plugins/kubernetes-backend/src/service/KubernetesFetcher.ts` - watchResource implementation + export statusCodeToErrorType
- `plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts` - Integration tests
- `plugins/kubernetes-backend/package.json` - Add split2 dependency

---

## Task 1: Add Watch Event Type Definitions

**Files:**

- Modify: `plugins/kubernetes-common/src/types.ts`

- [ ] **Step 1: Add watch event types at end of file**

Add after the last existing type definition (around line 335):

```typescript
/**
 * Kubernetes watch event types
 * @public
 */
export type KubernetesWatchEventType =
  | 'ADDED'
  | 'MODIFIED'
  | 'DELETED'
  | 'BOOKMARK'
  | 'ERROR';

/**
 * Kubernetes watch event
 * @public
 */
export type KubernetesWatchEvent =
  | {
      type: 'ADDED' | 'MODIFIED' | 'DELETED' | 'BOOKMARK';
      object: JsonObject;
      resourceVersion?: string;
    }
  | {
      type: 'ERROR';
      error: KubernetesFetchError;
    };

/**
 * Options for watching Kubernetes resources
 * @public
 */
export interface KubernetesWatchOptions {
  namespace?: string;
  labelSelector?: string;
  resourceVersion?: string;
  timeoutSeconds?: number;
  allowWatchBookmarks?: boolean;
}
```

- [ ] **Step 2: Verify types are exported**

The types are already exported via the existing wildcard export in `plugins/kubernetes-common/src/index.ts`. No changes needed to index.ts.

- [ ] **Step 3: Verify types compile**

Run: `yarn tsc`
Expected: No type errors (may have warnings about unused types - that's expected at this stage)

- [ ] **Step 4: Commit type definitions**

```bash
git add plugins/kubernetes-common/src/types.ts
git commit -m "feat(kubernetes-common): add watch event types

Add KubernetesWatchEventType, KubernetesWatchEvent, and
KubernetesWatchOptions for optional watch functionality.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Add split2 Dependency

**Files:**

- Modify: `plugins/kubernetes-backend/package.json`

- [ ] **Step 1: Add split2 to dependencies**

Add to the dependencies section (around line 70):

```json
"split2": "^4.2.0"
```

- [ ] **Step 2: Install dependencies**

Run: `yarn install`
Expected: split2 installed successfully

- [ ] **Step 3: Commit dependency**

```bash
git add plugins/kubernetes-backend/package.json yarn.lock
git commit -m "feat(kubernetes-backend): add split2 dependency

Add split2 for line-delimited JSON parsing in watch streams.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Extend KubernetesFetcher Interface with Optional Method

**Files:**

- Modify: `plugins/kubernetes-node/src/types/types.ts`

- [ ] **Step 1: Import watch types**

Add to the import statement from `@backstage/plugin-kubernetes-common` (around line 13):

```typescript
import {
  // ... existing imports ...
  KubernetesWatchEvent,
  KubernetesWatchOptions,
} from '@backstage/plugin-kubernetes-common';
```

- [ ] **Step 2: Add optional watchResource method to KubernetesFetcher interface**

Add after `fetchPodMetricsByNamespaces` method (around line 252):

```typescript
/**
 * Watch Kubernetes resources for changes (optional)
 * Returns an async iterator that yields watch events
 *
 * @param clusterDetails - Cluster connection details
 * @param credential - Authentication credentials
 * @param group - API group (empty string for core resources)
 * @param apiVersion - API version (e.g., 'v1', 'v1beta1')
 * @param plural - Resource plural name (e.g., 'pods', 'deployments')
 * @param options - Optional watch parameters
 */
watchResource?(
  clusterDetails: ClusterDetails,
  credential: KubernetesCredential,
  group: string,
  apiVersion: string,
  plural: string,
  options?: KubernetesWatchOptions,
): AsyncGenerator<KubernetesWatchEvent, void, undefined>;
```

- [ ] **Step 3: Verify types compile**

Run: `yarn tsc`
Expected: No type errors

- [ ] **Step 4: Commit interface extension**

```bash
git add plugins/kubernetes-node/src/types/types.ts
git commit -m "feat(kubernetes-node): add optional watchResource to KubernetesFetcher

Add optional watchResource?() method signature to interface.
Implementations can choose whether to provide watch support.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Write Failing Tests for Utility Function

**Files:**

- Create: `plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`

- [ ] **Step 1: Create test file with basic structure**

Create new file `plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`:

```typescript
import { Readable } from 'stream';
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`
Expected: FAIL - "Cannot find module './watchStreamUtils'"

- [ ] **Step 3: Commit failing test**

```bash
git add plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts
git commit -m "test(kubernetes-backend): add failing test for processWatchStream

Add test for ADDED event processing. Test currently fails as
utility function is not implemented.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Implement processWatchStream Utility Function

**Files:**

- Create: `plugins/kubernetes-backend/src/service/watchStreamUtils.ts`

- [ ] **Step 1: Create utility file with processWatchStream function**

Create new file `plugins/kubernetes-backend/src/service/watchStreamUtils.ts`:

```typescript
/*
 * Copyright 2020 The Backstage Authors
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

// @ts-ignore
import split2 from 'split2';
import { KubernetesWatchEvent } from '@backstage/plugin-kubernetes-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import { statusCodeToErrorType } from './KubernetesFetcher';

/**
 * Process a Kubernetes watch stream and yield watch events
 *
 * @param stream - The response body stream from fetch
 * @param resourcePath - URL path for error reporting
 * @param logger - Logger for warnings
 * @returns Async generator yielding KubernetesWatchEvent objects
 */
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
```

- [ ] **Step 2: Run test to verify it passes**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`
Expected: FAIL - "Cannot find module './KubernetesFetcher'" (statusCodeToErrorType not exported yet)

Note: This is expected. We'll export statusCodeToErrorType in the next task.

- [ ] **Step 3: Commit utility function (even though test doesn't pass yet)**

```bash
git add plugins/kubernetes-backend/src/service/watchStreamUtils.ts
git commit -m "feat(kubernetes-backend): implement processWatchStream utility

Add async generator function for processing Kubernetes watch streams.
Handles NDJSON parsing, event transformation, and stream cleanup.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Export statusCodeToErrorType from KubernetesFetcher

**Files:**

- Modify: `plugins/kubernetes-backend/src/service/KubernetesFetcher.ts`

- [ ] **Step 1: Find statusCodeToErrorType function**

The function is defined around line 52-70. It's currently not exported.

- [ ] **Step 2: Export the function**

Change the function declaration from:

```typescript
const statusCodeToErrorType = (statusCode?: number): KubernetesErrorTypes => {
```

To:

```typescript
export const statusCodeToErrorType = (statusCode?: number): KubernetesErrorTypes => {
```

- [ ] **Step 3: Run utility test to verify it passes**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`
Expected: PASS (1 test passing)

- [ ] **Step 4: Verify types compile**

Run: `yarn tsc`
Expected: No type errors

- [ ] **Step 5: Commit export**

```bash
git add plugins/kubernetes-backend/src/service/KubernetesFetcher.ts
git commit -m "refactor(kubernetes-backend): export statusCodeToErrorType

Export function for use in watchStreamUtils. No behavior change.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Write Failing Test for watchResource Method

**Files:**

- Modify: `plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts`

- [ ] **Step 1: Add watchResource test to existing describe block**

Find the existing `describe('KubernetesFetcher')` block and add a new describe block for watchResource at the end (around line 1400+):

```typescript
describe('watchResource', () => {
  const logger = mockServices.logger.mock();
  let sut: KubernetesClientBasedFetcher;

  beforeEach(() => {
    sut = new KubernetesClientBasedFetcher({ logger });
  });

  it('should yield ADDED events for pod creation', async () => {
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

    const clusterDetails = {
      name: 'test-cluster',
      url: 'http://localhost:9999',
      authMetadata: {},
    };

    worker.use(
      rest.get('http://localhost:9999/*', (req, res, ctx) => {
        if (req.url.searchParams.get('watch') === 'true') {
          return res(ctx.text(watchData));
        }
        return res(ctx.status(400));
      }),
    );

    const events: KubernetesWatchEvent[] = [];
    for await (const event of sut.watchResource!(
      clusterDetails,
      { type: 'bearer token', token: 'token' },
      '',
      'v1',
      'pods',
      { namespace: 'default' },
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
```

- [ ] **Step 2: Add import for KubernetesWatchEvent**

Add to the imports from `@backstage/plugin-kubernetes-common` at the top of the file:

```typescript
import {
  // ... existing imports ...
  KubernetesWatchEvent,
} from '@backstage/plugin-kubernetes-common';
```

- [ ] **Step 3: Run test to verify it fails**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts -- --testNamePattern="should yield ADDED events"`
Expected: FAIL - "watchResource is not a function" or similar

- [ ] **Step 4: Commit failing test**

```bash
git add plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts
git commit -m "test(kubernetes-backend): add failing test for watchResource

Add test for basic watch functionality. Test currently fails as
watchResource method is not implemented.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Implement watchResource Method

**Files:**

- Modify: `plugins/kubernetes-backend/src/service/KubernetesFetcher.ts`

- [ ] **Step 1: Add imports**

Add to the imports from `@backstage/plugin-kubernetes-common`:

```typescript
import {
  // ... existing imports ...
  KubernetesWatchEvent,
  KubernetesWatchOptions,
} from '@backstage/plugin-kubernetes-common';
```

Add import for the utility function after other imports:

```typescript
import { processWatchStream } from './watchStreamUtils';
```

- [ ] **Step 2: Implement watchResource method**

Add after the `fetchPodMetricsByNamespaces` method (around line 500+):

```typescript
async *watchResource(
  clusterDetails: ClusterDetails,
  credential: KubernetesCredential,
  group: string,
  apiVersion: string,
  plural: string,
  options?: KubernetesWatchOptions,
): AsyncGenerator<KubernetesWatchEvent, void, undefined> {
  const { namespace, labelSelector, resourceVersion, timeoutSeconds, allowWatchBookmarks } = options || {};

  // Build resource path
  const encode = (s: string) => encodeURIComponent(s);
  let resourcePath = group
    ? `/apis/${encode(group)}/${encode(apiVersion)}`
    : `/api/${encode(apiVersion)}`;
  if (namespace) {
    resourcePath += `/namespaces/${encode(namespace)}`;
  }
  resourcePath += `/${encode(plural)}`;

  // Get auth setup
  const authProvider =
    clusterDetails.authMetadata[ANNOTATION_KUBERNETES_AUTH_PROVIDER];
  let url: URL;
  let requestInit: RequestInit;

  if (this.isServiceAccountAuthentication(authProvider, clusterDetails)) {
    [url, requestInit] = await this.fetchArgsInCluster(credential);
  } else if (!this.isCredentialMissing(authProvider, credential)) {
    [url, requestInit] = await this.fetchArgs(clusterDetails, credential);
  } else {
    yield {
      type: 'ERROR',
      error: {
        errorType: 'UNAUTHORIZED_ERROR',
        statusCode: 401,
        resourcePath,
      },
    };
    return;
  }

  // Set path and query params
  if (url.pathname === '/') {
    url.pathname = resourcePath;
  } else {
    url.pathname += resourcePath;
  }

  const queryParams: Record<string, string> = { watch: 'true' };
  if (labelSelector) queryParams.labelSelector = labelSelector;
  if (resourceVersion) queryParams.resourceVersion = resourceVersion;
  if (timeoutSeconds) queryParams.timeoutSeconds = timeoutSeconds.toString();
  if (allowWatchBookmarks) queryParams.allowWatchBookmarks = 'true';

  url.search = new URLSearchParams(queryParams).toString();

  // Make request with network error handling
  let response;
  try {
    response = await fetch(url, requestInit);
  } catch (err) {
    this.logger.warn(
      `Network error watching "${resourcePath}" from cluster "${clusterDetails.name}": ${err}`,
    );
    yield {
      type: 'ERROR',
      error: {
        errorType: 'SYSTEM_ERROR',
        statusCode: 0,
        resourcePath,
      },
    };
    return;
  }

  // Handle HTTP errors
  if (!response.ok) {
    yield {
      type: 'ERROR',
      error: await this.handleUnsuccessfulResponse(clusterDetails.name, response),
    };
    return;
  }

  // Validate response body exists
  if (!response.body) {
    yield {
      type: 'ERROR',
      error: {
        errorType: 'SYSTEM_ERROR',
        statusCode: response.status,
        resourcePath,
      },
    };
    return;
  }

  // Delegate stream processing to utility
  yield* processWatchStream(response.body, resourcePath, this.logger);
}
```

- [ ] **Step 3: Run test to verify it passes**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts -- --testNamePattern="should yield ADDED events"`
Expected: PASS

- [ ] **Step 4: Run all KubernetesFetcher tests**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts`
Expected: All tests pass

- [ ] **Step 5: Verify types compile**

Run: `yarn tsc`
Expected: No type errors

- [ ] **Step 6: Commit implementation**

```bash
git add plugins/kubernetes-backend/src/service/KubernetesFetcher.ts
git commit -m "feat(kubernetes-backend): implement watchResource method

Add optional watchResource() async generator that delegates stream
processing to processWatchStream utility. Handles auth, URL building,
fetch, and HTTP errors. Reuses existing helper methods.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Add Comprehensive Tests for Utility Function

**Files:**

- Modify: `plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`

- [ ] **Step 1: Add test for MODIFIED events**

Add to the describe block:

```typescript
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
```

- [ ] **Step 2: Add test for DELETED events**

```typescript
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
```

- [ ] **Step 3: Add test for K8s ERROR events**

```typescript
it('should transform K8s ERROR events to error events', async () => {
  const errorEvent = JSON.stringify({
    type: 'ERROR',
    object: {
      kind: 'Status',
      apiVersion: 'v1',
      status: 'Failure',
      message: 'too old resource version: 1 (8)',
      reason: 'Expired',
      code: 410,
    },
  });

  const mockStream = Readable.from([errorEvent]);

  const events = [];
  for await (const event of processWatchStream(
    mockStream,
    resourcePath,
    logger,
  )) {
    events.push(event);
  }

  expect(events).toHaveLength(1);
  expect(events[0].type).toBe('ERROR');
  if (events[0].type === 'ERROR') {
    expect(events[0].error.statusCode).toBe(410);
    expect(events[0].error.errorType).toBe('UNKNOWN_ERROR');
    expect(events[0].error.resourcePath).toBe(resourcePath);
  }
});
```

- [ ] **Step 4: Add test for malformed JSON**

```typescript
it('should skip malformed JSON and continue', async () => {
  const pod = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: { name: 'test-pod', resourceVersion: '100' },
  };

  const watchData = [
    JSON.stringify({ type: 'ADDED', object: pod }),
    '{ invalid json',
    JSON.stringify({ type: 'MODIFIED', object: pod }),
  ].join('\n');

  const mockStream = Readable.from([watchData]);

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
```

- [ ] **Step 5: Add test for empty lines**

```typescript
it('should skip empty lines', async () => {
  const pod = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: { name: 'test-pod', resourceVersion: '100' },
  };

  const watchData = [
    JSON.stringify({ type: 'ADDED', object: pod }),
    '',
    '',
    JSON.stringify({ type: 'MODIFIED', object: pod }),
  ].join('\n');

  const mockStream = Readable.from([watchData]);

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
```

- [ ] **Step 6: Add test for multiple events**

```typescript
it('should handle multiple events in sequence', async () => {
  const pod1 = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: { name: 'pod-1', resourceVersion: '1' },
  };
  const pod2 = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: { name: 'pod-2', resourceVersion: '2' },
  };

  const watchData = [
    JSON.stringify({ type: 'ADDED', object: pod1 }),
    JSON.stringify({ type: 'MODIFIED', object: pod2 }),
  ].join('\n');

  const mockStream = Readable.from([watchData]);

  const events = [];
  for await (const event of processWatchStream(
    mockStream,
    resourcePath,
    logger,
  )) {
    events.push(event);
  }

  expect(events).toHaveLength(2);
  expect(events[0]).toEqual({
    type: 'ADDED',
    object: pod1,
    resourceVersion: '1',
  });
  expect(events[1]).toEqual({
    type: 'MODIFIED',
    object: pod2,
    resourceVersion: '2',
  });
});
```

- [ ] **Step 7: Add test for BOOKMARK events**

```typescript
it('should yield BOOKMARK events', async () => {
  const bookmarkEvent = JSON.stringify({
    type: 'BOOKMARK',
    object: {
      kind: 'Pod',
      apiVersion: 'v1',
      metadata: {
        resourceVersion: '15000',
      },
    },
  });

  const mockStream = Readable.from([bookmarkEvent]);

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
    object: expect.objectContaining({
      kind: 'Pod',
      metadata: { resourceVersion: '15000' },
    }),
    resourceVersion: '15000',
  });
});
```

- [ ] **Step 8: Run all utility tests**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`
Expected: All 8 tests passing

- [ ] **Step 9: Commit utility tests**

```bash
git add plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts
git commit -m "test(kubernetes-backend): add comprehensive watchStreamUtils tests

Add tests for MODIFIED, DELETED, ERROR, BOOKMARK events, malformed
JSON, empty lines, and multiple events. Full coverage of utility.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Add Comprehensive Tests for watchResource

**Files:**

- Modify: `plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts`

- [ ] **Step 1: Add test for HTTP 401 error**

Add to the `describe('watchResource')` block:

```typescript
it('should yield ERROR event for 401 Unauthorized', async () => {
  const clusterDetails = {
    name: 'test-cluster',
    url: 'http://localhost:9999',
    authMetadata: {},
  };

  worker.use(
    rest.get('http://localhost:9999/*', (req, res, ctx) => {
      return res(ctx.status(401), ctx.text('authentication required'));
    }),
  );

  const events: KubernetesWatchEvent[] = [];
  for await (const event of sut.watchResource!(
    clusterDetails,
    { type: 'bearer token', token: 'bad-token' },
    '',
    'v1',
    'pods',
    { namespace: 'default' },
  )) {
    events.push(event);
  }

  expect(events).toHaveLength(1);
  expect(events[0].type).toBe('ERROR');
  if (events[0].type === 'ERROR') {
    expect(events[0].error.errorType).toBe('UNAUTHORIZED_ERROR');
    expect(events[0].error.statusCode).toBe(401);
  }
});
```

- [ ] **Step 2: Add test for network error**

```typescript
it('should yield ERROR event on network failure', async () => {
  const clusterDetails = {
    name: 'test-cluster',
    url: 'http://localhost:9999',
    authMetadata: {},
  };

  worker.use(
    rest.get('http://localhost:9999/*', (req, res) => {
      return res.networkError('Failed to connect');
    }),
  );

  const events: KubernetesWatchEvent[] = [];
  for await (const event of sut.watchResource!(
    clusterDetails,
    { type: 'bearer token', token: 'token' },
    '',
    'v1',
    'pods',
    { namespace: 'default' },
  )) {
    events.push(event);
  }

  expect(events).toHaveLength(1);
  expect(events[0].type).toBe('ERROR');
  if (events[0].type === 'ERROR') {
    expect(events[0].error.errorType).toBe('SYSTEM_ERROR');
    expect(events[0].error.statusCode).toBe(0);
  }
});
```

- [ ] **Step 3: Add test for watch options**

```typescript
it('should include labelSelector in query params', async () => {
  const clusterDetails = {
    name: 'test-cluster',
    url: 'http://localhost:9999',
    authMetadata: {},
  };

  let capturedUrl: URL | undefined;
  worker.use(
    rest.get('http://localhost:9999/*', (req, res, ctx) => {
      capturedUrl = new URL(req.url);
      if (req.url.searchParams.get('watch') === 'true') {
        return res(ctx.text(''));
      }
      return res(ctx.status(400));
    }),
  );

  for await (const event of sut.watchResource!(
    clusterDetails,
    { type: 'bearer token', token: 'token' },
    '',
    'v1',
    'pods',
    { labelSelector: 'app=myapp' },
  )) {
    // Consume stream
  }

  expect(capturedUrl?.searchParams.get('labelSelector')).toBe('app=myapp');
  expect(capturedUrl?.searchParams.get('watch')).toBe('true');
});
```

- [ ] **Step 4: Add test for custom resources**

```typescript
it('should handle custom resources with API group', async () => {
  const clusterDetails = {
    name: 'test-cluster',
    url: 'http://localhost:9999',
    authMetadata: {},
  };

  let capturedUrl: URL | undefined;
  worker.use(
    rest.get('http://localhost:9999/*', (req, res, ctx) => {
      capturedUrl = new URL(req.url);
      if (req.url.searchParams.get('watch') === 'true') {
        return res(ctx.text(''));
      }
      return res(ctx.status(400));
    }),
  );

  for await (const event of sut.watchResource!(
    clusterDetails,
    { type: 'bearer token', token: 'token' },
    'apps',
    'v1',
    'deployments',
    { namespace: 'default' },
  )) {
    // Consume stream
  }

  expect(capturedUrl?.pathname).toBe(
    '/apis/apps/v1/namespaces/default/deployments',
  );
});
```

- [ ] **Step 5: Run all watchResource tests**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts -- --testNamePattern="watchResource"`
Expected: All 5 watch tests passing

- [ ] **Step 6: Commit integration tests**

```bash
git add plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts
git commit -m "test(kubernetes-backend): add watchResource integration tests

Add tests for HTTP errors, network errors, watch options, and
custom resources. Full end-to-end testing.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Run Full Test Suite and Format Code

**Files:**

- All modified files

- [ ] **Step 1: Run full test suite for kubernetes packages**

Run: `CI=1 yarn test plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`
Expected: All tests pass

- [ ] **Step 2: Run type checking**

Run: `yarn tsc`
Expected: No type errors

- [ ] **Step 3: Format code**

Run: `yarn prettier --write plugins/kubernetes-backend/src/service/KubernetesFetcher.ts plugins/kubernetes-backend/src/service/watchStreamUtils.ts plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts plugins/kubernetes-common/src/types.ts plugins/kubernetes-node/src/types/types.ts`
Expected: Files formatted

- [ ] **Step 4: Run linter**

Run: `yarn lint --fix`
Expected: No lint errors

- [ ] **Step 5: Generate API reports**

Run: `yarn build:api-reports`
Expected: API reports generated successfully

- [ ] **Step 6: Commit any formatting changes**

```bash
git add -u
git commit -m "chore: format code and update API reports

Run prettier, linter, and API report generation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" || echo "Nothing to commit"
```

---

## Task 12: Create Changeset

**Files:**

- Create: `.changeset/watch-optional-approach.md`

- [ ] **Step 1: Create changeset file**

Create new file `.changeset/watch-optional-approach.md`:

```markdown
---
'@backstage/plugin-kubernetes-common': patch
'@backstage/plugin-kubernetes-node': patch
'@backstage/plugin-kubernetes-backend': patch
---

Add optional watch functionality to Kubernetes plugin with utility-based approach. The `watchResource?()` method provides an async iterator interface for streaming resource changes, with stream processing extracted to a reusable `processWatchStream()` utility function for better testability and separation of concerns.
```

- [ ] **Step 2: Commit changeset**

```bash
git add .changeset/watch-optional-approach.md
git commit -m "chore: add changeset for optional watch functionality

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Final Verification

**Files:**

- All modified files

- [ ] **Step 1: Run full test suite for all kubernetes packages**

Run: `CI=1 yarn test --scope=@backstage/plugin-kubernetes-backend --scope=@backstage/plugin-kubernetes-common --scope=@backstage/plugin-kubernetes-node`
Expected: All tests pass

- [ ] **Step 2: Verify no unintended changes**

Run: `git status`
Expected: Clean working directory

- [ ] **Step 3: Review git log**

Run: `git log --oneline -15`
Expected: See all commits from this implementation

- [ ] **Step 4: Verify optional method works**

Create a simple test to verify the optional method can be checked:

```typescript
const fetcher: KubernetesFetcher = new KubernetesClientBasedFetcher({ logger });
if (fetcher.watchResource) {
  console.log('Watch is supported');
} else {
  console.log('Watch is not supported');
}
```

Expected: Should compile and print "Watch is supported"

---

## Implementation Complete

The optional watch functionality with utility-based approach is now fully implemented and tested. The implementation:

✅ Adds optional `watchResource?()` method to `KubernetesFetcher` interface  
✅ Extracts stream processing to standalone `processWatchStream()` utility  
✅ Maximizes code reuse from existing auth/HTTP methods  
✅ Uses async iterators for modern TypeScript streaming  
✅ Maintains consistency with existing error handling (errors as data)  
✅ Supports all Kubernetes watch event types  
✅ Includes comprehensive unit tests for utility function  
✅ Includes comprehensive integration tests for main method  
✅ Follows TDD approach  
✅ Uses frequent, descriptive commits

**Key Differences from Approach 1:**

- Optional interface method (implementations can choose to provide watch support)
- Stream processing logic extracted to reusable utility function
- Separate test file for utility (faster unit tests, better isolation)
- Better separation of concerns (HTTP/auth vs. stream processing)
