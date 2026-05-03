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

import type { Cluster, CoreV1Api, Metrics } from '@kubernetes/client-node';
import lodash, { Dictionary } from 'lodash';
import {
  FetchResponseWrapper,
  KubernetesFetcher,
  ObjectFetchParams,
} from '@backstage/plugin-kubernetes-node';
import {
  ANNOTATION_KUBERNETES_AUTH_PROVIDER,
  SERVICEACCOUNT_CA_PATH,
  FetchResponse,
  KubernetesErrorTypes,
  KubernetesFetchError,
  PodStatusFetchResponse,
  KubernetesWatchEvent,
  KubernetesWatchOptions,
} from '@backstage/plugin-kubernetes-common';
import fetch, { RequestInit, Response } from 'node-fetch';
import * as https from 'node:https';
import fs from 'fs-extra';
import { JsonObject } from '@backstage/types';
import {
  ClusterDetails,
  KubernetesCredential,
} from '@backstage/plugin-kubernetes-node';
import { LoggerService } from '@backstage/backend-plugin-api';
import { processWatchStream } from './watchStreamUtils';

export interface KubernetesClientBasedFetcherOptions {
  logger: LoggerService;
}

type FetchResult = FetchResponse | KubernetesFetchError;

const isError = (fr: FetchResult): fr is KubernetesFetchError =>
  fr.hasOwnProperty('errorType');

function fetchResultsToResponseWrapper(
  results: FetchResult[],
): FetchResponseWrapper {
  const groupBy: Dictionary<FetchResult[]> = lodash.groupBy(results, value => {
    return isError(value) ? 'errors' : 'responses';
  });

  return {
    errors: groupBy.errors ?? [],
    responses: groupBy.responses ?? [],
  } as FetchResponseWrapper; // TODO would be nice to get rid of this 'as'
}

export const statusCodeToErrorType = (
  statusCode: number,
): KubernetesErrorTypes => {
  switch (statusCode) {
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED_ERROR';
    case 404:
      return 'NOT_FOUND';
    case 500:
      return 'SYSTEM_ERROR';
    default:
      return 'UNKNOWN_ERROR';
  }
};

export class KubernetesClientBasedFetcher implements KubernetesFetcher {
  private readonly logger: LoggerService;

  constructor({ logger }: KubernetesClientBasedFetcherOptions) {
    this.logger = logger;
  }

  fetchObjectsForService(
    params: ObjectFetchParams,
  ): Promise<FetchResponseWrapper> {
    const fetchResults = Array.from(params.objectTypesToFetch)
      .concat(params.customResources)
      .map(({ objectType, group, apiVersion, plural }) =>
        this.fetchResource(
          params.clusterDetails,
          params.credential,
          group,
          apiVersion,
          plural,
          params.namespace,
          params.labelSelector,
        ).then(
          (r: Response): Promise<FetchResult> =>
            r.ok
              ? r.json().then(
                  ({ kind, items }): FetchResponse => ({
                    type: objectType,
                    resources: this.transformResources(objectType, kind, items),
                  }),
                )
              : this.handleUnsuccessfulResponse(params.clusterDetails.name, r),
        ),
      );

    return Promise.all(fetchResults).then(fetchResultsToResponseWrapper);
  }

  async fetchPodMetricsByNamespaces(
    clusterDetails: ClusterDetails,
    credential: KubernetesCredential,
    namespaces: Set<string>,
    labelSelector?: string,
  ): Promise<FetchResponseWrapper> {
    const { topPods } = await import('@kubernetes/client-node');

    const fetchResults = Array.from(namespaces).map(async ns => {
      const [podMetrics, podList] = await Promise.all([
        this.fetchResource(
          clusterDetails,
          credential,
          'metrics.k8s.io',
          'v1beta1',
          'pods',
          ns,
          labelSelector,
        ),
        this.fetchResource(
          clusterDetails,
          credential,
          '',
          'v1',
          'pods',
          ns,
          labelSelector,
        ),
      ]);
      if (podMetrics.ok && podList.ok) {
        return topPods(
          {
            listPodForAllNamespaces: () => podList.json(),
          } as unknown as CoreV1Api,
          {
            getPodMetrics: () => podMetrics.json(),
          } as unknown as Metrics,
        ).then(
          (resources): PodStatusFetchResponse => ({
            type: 'podstatus',
            resources,
          }),
        );
      } else if (podMetrics.ok) {
        return this.handleUnsuccessfulResponse(clusterDetails.name, podList);
      }
      return this.handleUnsuccessfulResponse(clusterDetails.name, podMetrics);
    });

    return Promise.all(fetchResults).then(fetchResultsToResponseWrapper);
  }

  private async handleUnsuccessfulResponse(
    clusterName: string,
    res: Response,
  ): Promise<KubernetesFetchError> {
    const resourcePath = new URL(res.url).pathname;
    this.logger.warn(
      `Received ${
        res.status
      } status when fetching "${resourcePath}" from cluster "${clusterName}"; body=[${await res.text()}]`,
    );
    return {
      errorType: statusCodeToErrorType(res.status),
      statusCode: res.status,
      resourcePath,
    };
  }

  private async fetchResource(
    clusterDetails: ClusterDetails,
    credential: KubernetesCredential,
    group: string,
    apiVersion: string,
    plural: string,
    namespace?: string,
    labelSelector?: string,
  ): Promise<Response> {
    const encode = (s: string) => encodeURIComponent(s);
    let resourcePath = group
      ? `/apis/${encode(group)}/${encode(apiVersion)}`
      : `/api/${encode(apiVersion)}`;
    if (namespace) {
      resourcePath += `/namespaces/${encode(namespace)}`;
    }
    resourcePath += `/${encode(plural)}`;

    let url: URL;
    let requestInit: RequestInit;
    const authProvider =
      clusterDetails.authMetadata[ANNOTATION_KUBERNETES_AUTH_PROVIDER];

    if (this.isServiceAccountAuthentication(authProvider, clusterDetails)) {
      [url, requestInit] = await this.fetchArgsInCluster(credential);
    } else if (!this.isCredentialMissing(authProvider, credential)) {
      [url, requestInit] = await this.fetchArgs(clusterDetails, credential);
    } else {
      return Promise.reject(
        new Error(
          `no bearer token or client cert for cluster '${clusterDetails.name}' and not running in Kubernetes`,
        ),
      );
    }

    if (url.pathname === '/') {
      url.pathname = resourcePath;
    } else {
      url.pathname += resourcePath;
    }

    if (labelSelector) {
      url.search = `labelSelector=${encode(labelSelector)}`;
    }

    return fetch(url, requestInit);
  }

  private isServiceAccountAuthentication(
    authProvider: string,
    clusterDetails: ClusterDetails,
  ) {
    return (
      authProvider === 'serviceAccount' &&
      !clusterDetails.authMetadata.serviceAccountToken &&
      fs.pathExistsSync(SERVICEACCOUNT_CA_PATH)
    );
  }

  private isCredentialMissing(
    authProvider: string,
    credential: KubernetesCredential,
  ) {
    return (
      authProvider !== 'localKubectlProxy' && credential.type === 'anonymous'
    );
  }

  private async fetchArgs(
    clusterDetails: ClusterDetails,
    credential: KubernetesCredential,
  ): Promise<[URL, fetch.RequestInit]> {
    const { bufferFromFileOrString } = await import('@kubernetes/client-node');

    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(credential.type === 'bearer token' && {
          Authorization: `Bearer ${credential.token}`,
        }),
      },
    };

    const url: URL = new URL(clusterDetails.url);
    if (url.protocol === 'https:') {
      requestInit.agent = new https.Agent({
        ca:
          bufferFromFileOrString(
            clusterDetails.caFile,
            clusterDetails.caData,
          ) ?? undefined,
        rejectUnauthorized: !clusterDetails.skipTLSVerify,
        ...(credential.type === 'x509 client certificate' && {
          cert: credential.cert,
          key: credential.key,
        }),
      });
    }
    return [url, requestInit];
  }

  private async fetchArgsInCluster(
    credential: KubernetesCredential,
  ): Promise<[URL, fetch.RequestInit]> {
    const { KubeConfig } = await import('@kubernetes/client-node');

    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(credential.type === 'bearer token' && {
          Authorization: `Bearer ${credential.token}`,
        }),
      },
    };

    const kc = new KubeConfig();
    kc.loadFromCluster();
    // loadFromCluster is guaranteed to populate the cluster/user/context
    const cluster = kc.getCurrentCluster() as Cluster;

    const url = new URL(cluster.server);
    if (url.protocol === 'https:') {
      requestInit.agent = new https.Agent({
        ca: fs.readFileSync(cluster.caFile as string),
      });
    }
    return [url, requestInit];
  }

  private transformResources(
    objectType: string,
    kind: string,
    items: JsonObject[],
  ): JsonObject[] {
    if (objectType === 'customresources') {
      return items.map((item: JsonObject) => ({
        ...item,
        kind: kind.replace(/(List)$/, ''),
      }));
    }

    if (objectType === 'secrets') {
      return items.map((item: JsonObject) => {
        if (item.data && typeof item.data === 'object') {
          return {
            ...item,
            data: Object.fromEntries(
              Object.keys(item.data).map(key => [key, '***']),
            ),
          };
        }
        return item;
      });
    }

    return items;
  }

  async *watchResource(
    clusterDetails: ClusterDetails,
    credential: KubernetesCredential,
    group: string,
    apiVersion: string,
    plural: string,
    options?: KubernetesWatchOptions,
  ): AsyncGenerator<KubernetesWatchEvent, void, undefined> {
    // Build resource path using same logic as fetchResource
    const encode = (s: string) => encodeURIComponent(s);
    let resourcePath = group
      ? `/apis/${encode(group)}/${encode(apiVersion)}`
      : `/api/${encode(apiVersion)}`;
    if (options?.namespace) {
      resourcePath += `/namespaces/${encode(options.namespace)}`;
    }
    resourcePath += `/${encode(plural)}`;

    // Set up authentication using existing methods
    let url: URL;
    let requestInit: RequestInit;
    const authProvider =
      clusterDetails.authMetadata[ANNOTATION_KUBERNETES_AUTH_PROVIDER];

    if (this.isServiceAccountAuthentication(authProvider, clusterDetails)) {
      [url, requestInit] = await this.fetchArgsInCluster(credential);
    } else if (!this.isCredentialMissing(authProvider, credential)) {
      [url, requestInit] = await this.fetchArgs(clusterDetails, credential);
    } else {
      throw new Error(
        `no bearer token or client cert for cluster '${clusterDetails.name}' and not running in Kubernetes`,
      );
    }

    // Construct watch URL
    if (url.pathname === '/') {
      url.pathname = resourcePath;
    } else {
      url.pathname += resourcePath;
    }

    // Add watch query parameters
    const searchParams = new URLSearchParams();
    searchParams.set('watch', 'true');
    if (options?.labelSelector) {
      searchParams.set('labelSelector', options.labelSelector);
    }
    if (options?.resourceVersion) {
      searchParams.set('resourceVersion', options.resourceVersion);
    }
    if (options?.timeoutSeconds !== undefined) {
      searchParams.set('timeoutSeconds', String(options.timeoutSeconds));
    }
    if (options?.allowWatchBookmarks) {
      searchParams.set('allowWatchBookmarks', 'true');
    }
    url.search = searchParams.toString();

    // Make fetch request with network error handling
    let response: Response;
    try {
      response = await fetch(url, requestInit);
    } catch (error) {
      this.logger.error(
        `Network error watching "${resourcePath}" from cluster "${clusterDetails.name}": ${error}`,
      );
      throw error;
    }

    // Handle HTTP errors
    if (!response.ok) {
      const fetchError = await this.handleUnsuccessfulResponse(
        clusterDetails.name,
        response,
      );
      yield {
        type: 'ERROR',
        error: fetchError,
      };
      return;
    }

    // Validate response.body exists
    if (!response.body) {
      this.logger.error(
        `No response body when watching "${resourcePath}" from cluster "${clusterDetails.name}"`,
      );
      yield {
        type: 'ERROR',
        error: {
          errorType: 'SYSTEM_ERROR',
          statusCode: 500,
          resourcePath,
        },
      };
      return;
    }

    // Delegate to processWatchStream utility
    yield* processWatchStream(response.body, resourcePath, this.logger);
  }
}
