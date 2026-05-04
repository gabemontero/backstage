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

import {
  ApiEntityV1alpha3Default,
  McpServerApiEntityV1alpha3,
  AiModelServerApiEntityV1alpha3,
  apiEntityV1alpha3Validator,
  mcpServerApiEntityV1alpha3Validator,
  aiModelServerApiEntityV1alpha3Validator,
  isMcpServerApiEntity,
  isAiModelServerApiEntity,
} from './ApiEntityV1alpha3';

describe('apiEntityV1alpha3Validator (default specType)', () => {
  let entity: ApiEntityV1alpha3Default;

  beforeEach(() => {
    entity = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'test' },
      spec: {
        type: 'openapi',
        lifecycle: 'production',
        owner: 'me',
        definition: 'openapi: "3.0.0"',
        system: 'system',
      },
    };
  });

  it('accepts a valid v1alpha3 string-definition entity', async () => {
    await expect(apiEntityV1alpha3Validator.check(entity)).resolves.toBe(true);
  });

  it('ignores v1alpha1', async () => {
    (entity as any).apiVersion = 'backstage.io/v1alpha1';
    await expect(apiEntityV1alpha3Validator.check(entity)).resolves.toBe(false);
  });

  it('ignores v1alpha2', async () => {
    (entity as any).apiVersion = 'backstage.io/v1alpha2';
    await expect(apiEntityV1alpha3Validator.check(entity)).resolves.toBe(false);
  });

  it('rejects missing definition', async () => {
    delete (entity as any).spec.definition;
    await expect(apiEntityV1alpha3Validator.check(entity)).rejects.toThrow(
      /definition/,
    );
  });

  it('rejects missing lifecycle', async () => {
    delete (entity as any).spec.lifecycle;
    await expect(apiEntityV1alpha3Validator.check(entity)).rejects.toThrow(
      /lifecycle/,
    );
  });
});

describe('mcpServerApiEntityV1alpha3Validator', () => {
  let entity: McpServerApiEntityV1alpha3;

  beforeEach(() => {
    entity = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'test-mcp' },
      spec: {
        type: 'mcp-server',
        lifecycle: 'experimental',
        owner: 'backstage',
        remotes: [
          {
            type: 'streamable-http',
            url: 'http://localhost:7007/api/mcp',
          },
        ],
      },
    };
  });

  it('accepts a valid mcp-server entity', async () => {
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).resolves.toBe(true);
  });

  it('rejects wrong spec.type value', async () => {
    (entity as any).spec.type = 'openapi';
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/type/);
  });

  it('rejects missing remotes', async () => {
    delete (entity as any).spec.remotes;
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/remotes/);
  });

  it('rejects empty remotes array', async () => {
    (entity as any).spec.remotes = [];
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/remotes/);
  });

  it('rejects remote missing url', async () => {
    (entity as any).spec.remotes[0] = { type: 'stdio' };
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/url/);
  });

  it('rejects remote missing type', async () => {
    (entity as any).spec.remotes[0] = { url: 'http://x' };
    await expect(
      mcpServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/type/);
  });
});

describe('aiModelServerApiEntityV1alpha3Validator', () => {
  let entity: AiModelServerApiEntityV1alpha3;

  beforeEach(() => {
    entity = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'test-ai-model' },
      spec: {
        type: 'ai-model-server',
        lifecycle: 'experimental',
        owner: 'backstage',
        remotes: [
          {
            type: 'http',
            url: 'http://localhost:8000/api/v1',
          },
        ],
      },
    };
  });

  it('accepts a valid ai-model-server entity', async () => {
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).resolves.toBe(true);
  });

  it('rejects wrong spec.type value', async () => {
    (entity as any).spec.type = 'openapi';
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/type/);
  });

  it('rejects missing remotes', async () => {
    delete (entity as any).spec.remotes;
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/remotes/);
  });

  it('rejects empty remotes array', async () => {
    (entity as any).spec.remotes = [];
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/remotes/);
  });

  it('rejects remote missing url', async () => {
    (entity as any).spec.remotes[0] = { type: 'http' };
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/url/);
  });

  it('rejects remote missing type', async () => {
    (entity as any).spec.remotes[0] = { url: 'http://localhost:8000' };
    await expect(
      aiModelServerApiEntityV1alpha3Validator.check(entity),
    ).rejects.toThrow(/type/);
  });
});

describe('isMcpServerApiEntity', () => {
  it('returns true for mcp-server entity', () => {
    const entity: McpServerApiEntityV1alpha3 = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'm' },
      spec: {
        type: 'mcp-server',
        lifecycle: 'production',
        owner: 'me',
        remotes: [{ type: 'stdio', url: 'cmd' }],
      },
    };
    expect(isMcpServerApiEntity(entity)).toBe(true);
  });

  it('returns false for default entity', () => {
    const entity: ApiEntityV1alpha3Default = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'a' },
      spec: {
        type: 'openapi',
        lifecycle: 'production',
        owner: 'me',
        definition: 'x',
      },
    };
    expect(isMcpServerApiEntity(entity)).toBe(false);
  });

  it('returns false for ai-model-server entity', () => {
    const entity: AiModelServerApiEntityV1alpha3 = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'a' },
      spec: {
        type: 'ai-model-server',
        lifecycle: 'production',
        owner: 'me',
        remotes: [{ type: 'http', url: 'http://localhost:8000' }],
      },
    };
    expect(isMcpServerApiEntity(entity)).toBe(false);
  });
});

describe('isAiModelServerApiEntity', () => {
  it('returns true for ai-model-server entity', () => {
    const entity: AiModelServerApiEntityV1alpha3 = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'a' },
      spec: {
        type: 'ai-model-server',
        lifecycle: 'production',
        owner: 'me',
        remotes: [{ type: 'http', url: 'http://localhost:8000' }],
      },
    };
    expect(isAiModelServerApiEntity(entity)).toBe(true);
  });

  it('returns false for default entity', () => {
    const entity: ApiEntityV1alpha3Default = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'a' },
      spec: {
        type: 'openapi',
        lifecycle: 'production',
        owner: 'me',
        definition: 'x',
      },
    };
    expect(isAiModelServerApiEntity(entity)).toBe(false);
  });

  it('returns false for mcp-server entity', () => {
    const entity: McpServerApiEntityV1alpha3 = {
      apiVersion: 'backstage.io/v1alpha3',
      kind: 'API',
      metadata: { name: 'm' },
      spec: {
        type: 'mcp-server',
        lifecycle: 'production',
        owner: 'me',
        remotes: [{ type: 'stdio', url: 'cmd' }],
      },
    };
    expect(isAiModelServerApiEntity(entity)).toBe(false);
  });
});
