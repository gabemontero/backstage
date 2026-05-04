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

import { compileCatalogModel } from '../model/compileCatalogModel';
import { defaultCatalogEntityModel } from '../model/defaultCatalogEntityModel';

describe('apiEntityModel v1alpha2 dispatch', () => {
  const model = compileCatalogModel([defaultCatalogEntityModel]);

  it('routes mcp-server and non-mcp-server v1alpha2 entities to different schemas', () => {
    const mcp = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha2',
      spec: { type: 'mcp-server' },
    });
    const openapi = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha2',
      spec: { type: 'openapi' },
    });

    expect(mcp).toBeDefined();
    expect(openapi).toBeDefined();

    // The mcp-server specType entry has a distinct description; the default
    // entry falls back to the kind-level description. If these are equal,
    // dispatch is broken.
    expect(mcp!.description).not.toBe(openapi!.description);

    // The mcp-server schema requires spec.remotes; the default schema requires
    // spec.definition. Inspect the compiled JSON Schema directly.
    const mcpSpecRequired = (mcp!.jsonSchema.properties as any).spec
      .required as string[];
    const openapiSpecRequired = (openapi!.jsonSchema.properties as any).spec
      .required as string[];

    expect(mcpSpecRequired).toContain('remotes');
    expect(mcpSpecRequired).not.toContain('definition');
    expect(openapiSpecRequired).toContain('definition');
    expect(openapiSpecRequired).not.toContain('remotes');
  });

  it('routes a v1alpha1 entity to the existing v1alpha1 schema', () => {
    const kind = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha1',
      spec: { type: 'openapi' },
    });
    expect(kind).toBeDefined();
    const required = (kind!.jsonSchema.properties as any).spec
      .required as string[];
    expect(required).toContain('definition');
  });
});

describe('apiEntityModel v1alpha3 dispatch', () => {
  const model = compileCatalogModel([defaultCatalogEntityModel]);
  let defaultType: ReturnType<typeof model.getKind>;
  let mcpServer: ReturnType<typeof model.getKind>;
  let aiModelServer: ReturnType<typeof model.getKind>;

  beforeEach(() => {
    defaultType = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha3',
      spec: { type: 'openapi' },
    });
    mcpServer = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha3',
      spec: { type: 'mcp-server' },
    });
    aiModelServer = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha3',
      spec: { type: 'ai-model-server' },
    });
  });

  it('routes v1alpha3 entities to different schemas based on spec.type', () => {
    expect(defaultType).toBeDefined();
    expect(mcpServer).toBeDefined();
    expect(aiModelServer).toBeDefined();

    // Each specType should have a distinct description, indicating proper dispatch
    expect(mcpServer!.description).not.toBe(defaultType!.description);
    expect(aiModelServer!.description).not.toBe(defaultType!.description);
    expect(aiModelServer!.description).not.toBe(mcpServer!.description);
  });

  it('verifies v1alpha3 schema routing with different required fields', () => {
    // Default schema requires spec.definition
    const defaultSpecRequired = (defaultType!.jsonSchema.properties as any).spec
      .required as string[];
    expect(defaultSpecRequired).toContain('definition');
    expect(defaultSpecRequired).not.toContain('remotes');

    // mcp-server schema requires spec.remotes
    const mcpSpecRequired = (mcpServer!.jsonSchema.properties as any).spec
      .required as string[];
    expect(mcpSpecRequired).toContain('remotes');
    expect(mcpSpecRequired).not.toContain('definition');

    // ai-model-server schema should have its own distinct requirements
    const aiModelSpecRequired = (aiModelServer!.jsonSchema.properties as any)
      .spec.required as string[];
    expect(aiModelSpecRequired).toBeDefined();
    expect(aiModelSpecRequired).toContain('remotes');
    expect(aiModelSpecRequired).not.toContain('definition');
  });

  it('ensures v1alpha1 and v1alpha2 continue working (regression test)', () => {
    // v1alpha1 should still work
    const v1alpha1 = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha1',
      spec: { type: 'openapi' },
    });
    expect(v1alpha1).toBeDefined();

    // v1alpha2 default should still work
    const v1alpha2Default = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha2',
      spec: { type: 'openapi' },
    });
    expect(v1alpha2Default).toBeDefined();

    // v1alpha2 mcp-server should still work
    const v1alpha2Mcp = model.getKind({
      kind: 'API',
      apiVersion: 'backstage.io/v1alpha2',
      spec: { type: 'mcp-server' },
    });
    expect(v1alpha2Mcp).toBeDefined();
  });
});
