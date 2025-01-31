/*
 * Copyright 2025 The Backstage Authors
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
  processingResult,
  CatalogProcessor,
  CatalogProcessorEmit,
  CatalogProcessorParser,
  CatalogProcessorResult,
} from '@backstage/plugin-catalog-node';
import { UrlReaderService } from '@backstage/backend-plugin-api';

import { LocationSpec } from '@backstage/plugin-catalog-common';

// A processor that reads from the RHDH RHOAI Bridge
export class RHDHRHOAIReaderProcessor implements CatalogProcessor {
  constructor(private readonly reader: UrlReaderService) {}

  getProcessorName(): string {
    return 'RHDHRHOAIReaderProcessor';
  }

  async readLocation(
    location: LocationSpec,
    _optional: boolean,
    emit: CatalogProcessorEmit,
    parser: CatalogProcessorParser,
  ): Promise<boolean> {
    // Pick a custom location type string. A location will be
    // registered later with this type.
    if (location.type !== 'rhdh-rhoai-bridge') {
      return false;
    }

    try {
      // Use the builtin reader facility to grab data from the
      // API. If you prefer, you can just use plain fetch here
      // (from the node-fetch package), or any other method of
      // your choosing.
      const data = await this.reader.readUrl(location.target);
      const yamlStr = await data.buffer.toString();
      const response = [{ url: location.target, data: await data.buffer() }];
      // const json = JSON.parse((await response.buffer()).toString());
      // Repeatedly call emit(processingResult.entity(location, <entity>))
      const parseResults: CatalogProcessorResult[] = [];
      for (const item of response) {
        for await (const parseResult of parser({
          data: item.data,
          location: { type: location.type, target: item.url },
        })) {
          parseResults.push(parseResult);
          emit(parseResult);
        }
      }
      emit(processingResult.refresh(`${location.type}:${location.target}`));
    } catch (error) {
      const message = `Unable to read ${location.type}, ${error}`;
      emit(processingResult.generalError(location, message));
    }

    return true;
  }
}
