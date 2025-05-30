/*
 * Copyright 2024 The Backstage Authors
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
import { createTransport } from 'nodemailer';
import { SendRawEmailCommand, SES } from '@aws-sdk/client-ses';
import { Config } from '@backstage/config';
import { AwsCredentialsManager } from '@backstage/integration-aws-node';

export const createSesTransport = async (
  config: Config,
  credentialsManager: AwsCredentialsManager,
) => {
  const credentials = await credentialsManager.getCredentialProvider({
    accountId: config.getOptionalString('accountId'),
  });
  const ses = new SES([
    {
      apiVersion: config.getOptionalString('apiVersion') ?? '2010-12-01',
      credentials: credentials.sdkCredentialProvider,
      region: config.getOptionalString('region'),
      endpoint: config.getOptionalString('endpoint'),
    },
  ]);
  return createTransport({
    SES: { ses, aws: { SendRawEmailCommand } },
  });
};
