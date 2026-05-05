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
  isMcpServerApiEntity,
  isMcpServerApiEntityV1alpha2,
  isMcpServerApiEntityV1alpha3,
  isAiModelServerApiEntity,
  apiEntityV1alpha2Validator,
  mcpServerApiEntityV1alpha2Validator,
  apiEntityV1alpha3Validator,
  mcpServerApiEntityV1alpha3Validator,
  aiModelServerApiEntityV1alpha3Validator,
} from '../index';

describe('API entity root exports', () => {
  it('exports unversioned and versioned MCP type guards', () => {
    expect(isMcpServerApiEntity).toBeDefined();
    expect(typeof isMcpServerApiEntity).toBe('function');
    expect(isMcpServerApiEntityV1alpha2).toBeDefined();
    expect(isMcpServerApiEntityV1alpha3).toBeDefined();
  });

  it('exports the AI model server type guard', () => {
    expect(isAiModelServerApiEntity).toBeDefined();
    expect(typeof isAiModelServerApiEntity).toBe('function');
  });

  it('exports v1alpha2 validators', () => {
    expect(apiEntityV1alpha2Validator).toBeDefined();
    expect(mcpServerApiEntityV1alpha2Validator).toBeDefined();
  });

  it('exports v1alpha3 validators', () => {
    expect(apiEntityV1alpha3Validator).toBeDefined();
    expect(mcpServerApiEntityV1alpha3Validator).toBeDefined();
    expect(aiModelServerApiEntityV1alpha3Validator).toBeDefined();
  });
});
