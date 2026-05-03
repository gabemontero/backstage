# Kubernetes Watch Client - Optional Method with Utility Approach

**Date:** 2026-05-02  
**Status:** Approved  
**Related:** Alternative to 2026-05-01-kubernetes-watch-client-design.md (Approach 1)

## Overview

Add optional watch functionality to the Kubernetes plugin using a utility-based approach for better separation of concerns. This is "Approach 3" from the original design exploration - combining an optional interface method with a dedicated utility function for stream processing.

## Background

The original implementation (Approach 1) added `watchResource()` as a required method directly on `KubernetesClientBasedFetcher`. This alternative explores making the method optional on the interface and extracting stream processing logic to a reusable utility function.

## Goals

- Add optional watch functionality via `watchResource?()`
- Extract stream processing to independently testable utility
- Maximize code reuse from existing auth/HTTP methods
- Use async iterators for modern TypeScript streaming patterns
- Maintain consistency with existing error handling (errors as data)
- Support all Kubernetes watch event types: ADDED, MODIFIED, DELETED, BOOKMARK, ERROR

## Non-Goals

- Kubernetes Informer implementation
- Event filtering beyond what the Kubernetes API provides
- Multi-resource watching in a single call
- Watch result caching or aggregation

## Architecture

### Approach: Optional Method + Utility Function

**Components:**

1. **Optional Interface Method**

   - `watchResource?()` on `KubernetesFetcher` interface (marked optional with `?`)
   - Implementations can choose whether to provide watch support
   - `KubernetesClientBasedFetcher` implements it

2. **Utility Module**

   - New file: `plugins/kubernetes-backend/src/service/watchStreamUtils.ts`
   - Exports `processWatchStream()` async generator function
   - Handles: split2 piping, line parsing, JSON parsing, event transformation

3. **Main Method**
   - `watchResource()` in `KubernetesClientBasedFetcher`
   - Handles: auth setup, URL building, fetch call, HTTP errors
   - Delegates stream processing via `yield* processWatchStream(...)`

### Division of Responsibilities

```
watchResource() method in KubernetesFetcher.ts:
├─ Build resource URL (reuse existing URL logic)
├─ Set up authentication (reuse fetchArgs/fetchArgsInCluster)
├─ Make fetch request with error handling
├─ Handle HTTP errors (reuse handleUnsuccessfulResponse)
├─ Handle network errors (try-catch around fetch)
├─ Validate response.body exists
└─ Delegate to utility ──> processWatchStream() in watchStreamUtils.ts:
                           ├─ Pipe response.body through split2
                           ├─ Parse each line as JSON
                           ├─ Skip empty lines
                           ├─ Skip/log malformed JSON
                           ├─ Transform to KubernetesWatchEvent
                           ├─ Handle K8s ERROR events
                           └─ Cleanup stream in finally block
```

### Benefits Over Approach 1

- **Better testability:** Stream processing logic can be tested independently with mock streams
- **Reusability:** Other implementations could use `processWatchStream()`
- **Separation of concerns:** HTTP/auth logic vs. stream processing are clearly separated
- **Smaller files:** Each file has a focused responsibility
- **Optional interface:** Implementations that don't support watch aren't forced to provide a stub

## Type Definitions

### KubernetesWatchEvent

Discriminated union type for watch events (same as Approach 1):

```typescript
export type KubernetesWatchEventType =
  | 'ADDED'
  | 'MODIFIED'
  | 'DELETED'
  | 'BOOKMARK'
  | 'ERROR';

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
```

### KubernetesWatchOptions

```typescript
export interface KubernetesWatchOptions {
  namespace?: string;
  labelSelector?: string;
  resourceVersion?: string;
  timeoutSeconds?: number;
  allowWatchBookmarks?: boolean;
}
```

## API Design

### Interface Extension (Optional Method)

Extend `KubernetesFetcher` interface in `kubernetes-node/src/types/types.ts`:

```typescript
export interface KubernetesFetcher {
  fetchObjectsForService(params: ObjectFetchParams): Promise<FetchResponseWrapper>;
  fetchPodMetricsByNamespaces(...): Promise<FetchResponseWrapper>;

  // Optional watch method - implementations can choose to provide it
  watchResource?(
    clusterDetails: ClusterDetails,
    credential: KubernetesCredential,
    group: string,
    apiVersion: string,
    plural: string,
    options?: KubernetesWatchOptions,
  ): AsyncGenerator<KubernetesWatchEvent, void, undefined>;
}
```

**Usage with optional check:**

```typescript
if (fetcher.watchResource) {
  for await (const event of fetcher.watchResource(...)) {
    // Handle events
  }
} else {
  // Fallback: watch not supported by this implementation
}
```

### Utility Function Signature

New file: `plugins/kubernetes-backend/src/service/watchStreamUtils.ts`

```typescript
export async function* processWatchStream(
  stream: NodeJS.ReadableStream,
  resourcePath: string,
  logger: LoggerService,
): AsyncGenerator<KubernetesWatchEvent, void, undefined>;
```

**Parameters:**

- `stream` - The response body stream from fetch
- `resourcePath` - URL path for error reporting
- `logger` - Logger for warnings (malformed JSON, etc.)

**Returns:** Async generator yielding `KubernetesWatchEvent` objects

## Implementation Details

### Utility Function (watchStreamUtils.ts)

```typescript
import split2 from 'split2';
import { KubernetesWatchEvent } from '@backstage/plugin-kubernetes-common';
import { LoggerService } from '@backstage/backend-plugin-api';
import { statusCodeToErrorType } from './KubernetesFetcher';

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

### Main Method (KubernetesFetcher.ts)

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

  // Build resource path (reuse existing URL building logic)
  const encode = (s: string) => encodeURIComponent(s);
  let resourcePath = group
    ? `/apis/${encode(group)}/${encode(apiVersion)}`
    : `/api/${encode(apiVersion)}`;
  if (namespace) {
    resourcePath += `/namespaces/${encode(namespace)}`;
  }
  resourcePath += `/${encode(plural)}`;

  // Get auth setup (reuse existing methods)
  const authProvider = clusterDetails.authMetadata[ANNOTATION_KUBERNETES_AUTH_PROVIDER];
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

  // Handle HTTP errors (reuse existing method)
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

**Key Points:**

- Main method: ~60 lines (auth, URL, fetch, HTTP/network errors)
- Utility function: ~40 lines (stream processing)
- Clean separation of concerns
- Maximum code reuse from existing methods

### Export from Utility Module

The `statusCodeToErrorType` function needs to be accessible to the utility. Options:

1. Export it from `KubernetesFetcher.ts`
2. Move it to a shared error utilities file
3. Pass it as a parameter to `processWatchStream()`

**Recommended:** Export from `KubernetesFetcher.ts` for minimal changes:

```typescript
// In KubernetesFetcher.ts
export const statusCodeToErrorType = (
  statusCode: number,
): KubernetesErrorTypes => {
  // existing implementation
};
```

## Error Handling

### Error Categories (Same as Approach 1)

1. **HTTP Status Errors (initial connection):**

   - Non-200 response → yield ERROR event using `handleUnsuccessfulResponse()`
   - Handled in main method before delegating to utility

2. **Network Errors:**

   - Catch exceptions from fetch() → yield ERROR with statusCode 0
   - Handled in main method with try-catch

3. **Stream Errors (ERROR events from K8s API):**

   - Kubernetes sends ERROR events with Status objects
   - Handled in utility function's event transformation

4. **Parse Errors:**

   - Malformed JSON → log warning, skip line, continue streaming
   - Handled in utility function

5. **Null Response Body:**

   - Check for null body → yield ERROR with response status
   - Handled in main method before delegating to utility

6. **Cleanup:**
   - Destroy stream in finally block
   - Handled in utility function

## Testing Strategy

### Unit Tests for Utility (watchStreamUtils.test.ts)

New dedicated test file:

```typescript
describe('processWatchStream', () => {
  it('should yield ADDED events', async () => {
    const mockStream = Readable.from([
      JSON.stringify({
        type: 'ADDED',
        object: { metadata: { name: 'pod1', resourceVersion: '123' } },
      }),
    ]);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      '/api/v1/pods',
      mockLogger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('ADDED');
    expect(events[0].resourceVersion).toBe('123');
  });

  it('should skip malformed JSON and continue', async () => {
    const mockStream = Readable.from(
      [
        JSON.stringify({ type: 'ADDED', object: {} }),
        '{ invalid json',
        JSON.stringify({ type: 'MODIFIED', object: {} }),
      ].join('\n'),
    );

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      '/api/v1/pods',
      mockLogger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(2);
    expect(events[0].type).toBe('ADDED');
    expect(events[1].type).toBe('MODIFIED');
  });

  it('should transform K8s ERROR events', async () => {
    const mockStream = Readable.from([
      JSON.stringify({
        type: 'ERROR',
        object: { kind: 'Status', code: 410, reason: 'Expired' },
      }),
    ]);

    const events = [];
    for await (const event of processWatchStream(
      mockStream,
      '/api/v1/pods',
      mockLogger,
    )) {
      events.push(event);
    }

    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('ERROR');
    expect(events[0].error.statusCode).toBe(410);
  });

  // Additional tests: empty lines, stream cleanup, multiple events, etc.
});
```

### Integration Tests (KubernetesFetcher.test.ts)

Comprehensive tests for the full `watchResource()` method:

- HTTP error handling (401, 404, 500)
- Network errors (fetch throws)
- Authentication scenarios (bearer token, x509, service account, missing credentials)
- Watch options (namespace, labelSelector, resourceVersion, timeoutSeconds, allowWatchBookmarks)
- Custom resources with API groups
- Multiple events in sequence
- BOOKMARK events
- End-to-end flow with MSW mocking HTTP responses

**Test Coverage Distribution:**

```
watchStreamUtils.test.ts (isolated unit tests):
├─ Event transformation correctness ✓
├─ JSON parsing edge cases ✓
├─ Stream cleanup ✓
└─ Error event mapping ✓

KubernetesFetcher.test.ts (integration tests):
├─ HTTP/auth layer ✓
├─ URL construction ✓
├─ Query parameter handling ✓
├─ Error handling (HTTP, network, missing credentials) ✓
└─ Full end-to-end scenarios ✓
```

### Benefits of This Testing Approach

- **Fast unit tests:** Utility tests run quickly with no HTTP mocking
- **Clear test boundaries:** Stream processing vs. HTTP concerns tested separately
- **Easy to test edge cases:** Stream parsing edge cases tested in isolation
- **Comprehensive integration tests:** Full flow verified with realistic HTTP scenarios
- **Better maintainability:** When stream logic changes, only utility tests need updating

## Dependencies

### New Dependencies

- `split2` (^4.x) - Line-delimited stream parser
  - Add to `plugins/kubernetes-backend/package.json`
  - TypeScript types included
  - Already in use elsewhere in Backstage

Same dependency as Approach 1.

## File Changes

### New Files

1. **`plugins/kubernetes-backend/src/service/watchStreamUtils.ts`**

   - Export `processWatchStream()` async generator function
   - Import split2, types, logger
   - ~40 lines of stream processing logic

2. **`plugins/kubernetes-backend/src/service/watchStreamUtils.test.ts`**
   - Unit tests for `processWatchStream()`
   - Test event transformation, JSON parsing, error handling
   - ~200-300 lines of tests

### Modified Files

1. **`plugins/kubernetes-common/src/types.ts`**

   - Add `KubernetesWatchEventType` type
   - Add `KubernetesWatchEvent` type
   - Add `KubernetesWatchOptions` interface
   - Update exports

2. **`plugins/kubernetes-node/src/types/types.ts`**

   - Add optional `watchResource?()` method to `KubernetesFetcher` interface

3. **`plugins/kubernetes-backend/src/service/KubernetesFetcher.ts`**

   - Add `watchResource()` async generator implementation (~60 lines)
   - Export `statusCodeToErrorType` function
   - Import `processWatchStream` from watchStreamUtils

4. **`plugins/kubernetes-backend/src/service/KubernetesFetcher.test.ts`**

   - Add comprehensive watch test suite (~700-800 lines)

5. **`plugins/kubernetes-backend/package.json`**
   - Add `split2` dependency

### Backward Compatibility

All changes are additive:

- New types exported from `kubernetes-common`
- **Optional** method on `KubernetesFetcher` interface (doesn't break existing implementations)
- New utility module (no impact on existing code)
- Existing functionality unchanged
- No breaking changes

**Key Difference from Approach 1:** The optional method marker (`?`) means existing implementations that don't provide `watchResource()` remain valid.

## Comparison with Approach 1

| Aspect                     | Approach 1 (Direct)             | Approach 3 (Optional + Utility)               |
| -------------------------- | ------------------------------- | --------------------------------------------- |
| **Files**                  | 1 implementation file           | 2 files (implementation + utility)            |
| **Lines of code**          | ~100 lines in one method        | ~60 + ~40 lines split across files            |
| **Testability**            | Integration tests only          | Unit tests for utility + integration tests    |
| **Code reuse**             | Good (reuses auth/HTTP helpers) | Excellent (utility can be reused)             |
| **Separation of concerns** | All in one method               | Clear HTTP vs. stream separation              |
| **Interface**              | Required method                 | Optional method                               |
| **Breaking changes**       | None (additive)                 | None (additive, more compatible)              |
| **Complexity**             | Lower (everything in one place) | Slightly higher (indirection through utility) |

## Decision Log

- **Optional method:** Allows implementations to opt-in to watch support
- **Utility function over class:** Simpler, more functional approach
- **Async generator:** Modern TypeScript pattern, works well with async/await
- **Errors as events:** Maintains consistency with existing get/list error handling
- **No auto-reconnect:** Keeps scope focused, avoids informer complexity
- **split2 for line parsing:** Battle-tested, already used in Backstage
- **Separate test file for utility:** Better organization, faster test runs

## Future Considerations

### Potential Enhancements (out of scope)

1. **Informer Support:** Build on top of `watchResource()` with resource version tracking and auto-reconnect
2. **Watch Utilities:** Helper functions for common watch patterns
3. **Shared Utility Usage:** Other implementations could use `processWatchStream()`
4. **Performance:** Connection pooling for multiple watches

## References

- Original Design Spec: `docs/superpowers/specs/2026-05-01-kubernetes-watch-client-design.md`
- [Kubernetes API Watch specification](https://kubernetes.io/docs/reference/using-api/api-concepts/#efficient-detection-of-changes)
- [kubernetes-client/javascript watch implementation](https://github.com/kubernetes-client/javascript/blob/master/src/watch.ts)
