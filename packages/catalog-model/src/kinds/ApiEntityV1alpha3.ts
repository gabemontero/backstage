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

import type { Entity } from '../entity/Entity';
import type { McpServerRemote } from './ApiEntityV1alpha2';
import defaultSchema from '../schema/kinds/API.v1alpha3.schema.json';
import mcpServerSchema from '../schema/kinds/API.v1alpha3.mcp-server.schema.json';
import aiModelServerSchema from '../schema/kinds/API.v1alpha3.ai-model-server.schema.json';
import { ajvCompiledJsonSchemaValidator } from './util';

export type { McpServerRemote };

/**
 * Backstage API kind entity, v1alpha3. Introduces AI model server support
 * via spec.type: 'ai-model-server', alongside existing default and mcp-server
 * subtypes from v1alpha2.
 *
 * @public
 */
export type ApiEntityV1alpha3 =
  | ApiEntityV1alpha3Default
  | McpServerApiEntityV1alpha3
  | AiModelServerApiEntityV1alpha3;

/**
 * The default (string-definition) shape for v1alpha3 API entities. Applies
 * when spec.type is anything other than a declared structured subtype.
 *
 * @public
 */
export interface ApiEntityV1alpha3Default extends Entity {
  apiVersion: 'backstage.io/v1alpha3';
  kind: 'API';
  spec: {
    type: string;
    lifecycle: string;
    owner: string;
    system?: string;
    definition: string;
  };
}

/**
 * An MCP (Model Context Protocol) server represented as an API entity
 * (v1alpha3, spec.type: 'mcp-server').
 *
 * @public
 */
export interface McpServerApiEntityV1alpha3 extends Entity {
  apiVersion: 'backstage.io/v1alpha3';
  kind: 'API';
  spec: {
    type: 'mcp-server';
    lifecycle: string;
    owner: string;
    system?: string;
    remotes: McpServerRemote[];
  };
}

/**
 * An AI model server (LLM/predictive) represented as an API entity
 * (v1alpha3, spec.type: 'ai-model-server').
 *
 * @public
 */
export interface AiModelServerApiEntityV1alpha3 extends Entity {
  apiVersion: 'backstage.io/v1alpha3';
  kind: 'API';
  spec: {
    type: 'ai-model-server';
    lifecycle: string;
    owner: string;
    system?: string;
    remotes: AiModelServerRemote[];
  };
}

/**
 * A transport endpoint for an AI model server.
 *
 * @public
 */
export type AiModelServerRemote = {
  type: string;
  url: string;
};

/**
 * {@link KindValidator} for the default specType of {@link ApiEntityV1alpha3}.
 *
 * @public
 */
export const apiEntityV1alpha3Validator =
  ajvCompiledJsonSchemaValidator(defaultSchema);

/**
 * {@link KindValidator} for the `mcp-server` specType of {@link ApiEntityV1alpha3}.
 *
 * @public
 */
export const mcpServerApiEntityV1alpha3Validator =
  ajvCompiledJsonSchemaValidator(mcpServerSchema);

/**
 * {@link KindValidator} for the `ai-model-server` specType of {@link ApiEntityV1alpha3}.
 *
 * @public
 */
export const aiModelServerApiEntityV1alpha3Validator =
  ajvCompiledJsonSchemaValidator(aiModelServerSchema);

/**
 * Type guard: narrows a v1alpha3 API entity to the MCP server subtype.
 *
 * @public
 */
export function isMcpServerApiEntity(
  entity: ApiEntityV1alpha3,
): entity is McpServerApiEntityV1alpha3 {
  return entity.spec.type === 'mcp-server';
}

/**
 * Type guard: narrows a v1alpha3 API entity to the AI model server subtype.
 *
 * @public
 */
export function isAiModelServerApiEntity(
  entity: ApiEntityV1alpha3,
): entity is AiModelServerApiEntityV1alpha3 {
  return entity.spec.type === 'ai-model-server';
}
