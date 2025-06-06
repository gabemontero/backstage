## API Report File for "@backstage/plugin-catalog-backend"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { ConditionalPolicyDecision } from '@backstage/plugin-permission-common';
import { Conditions } from '@backstage/plugin-permission-node';
import { EntitiesSearchFilter } from '@backstage/plugin-catalog-node';
import { Entity } from '@backstage/catalog-model';
import { PermissionCondition } from '@backstage/plugin-permission-common';
import { PermissionCriteria } from '@backstage/plugin-permission-common';
import { PermissionRule } from '@backstage/plugin-permission-node';
import { PermissionRuleParams } from '@backstage/plugin-permission-common';
import { ResourcePermission } from '@backstage/plugin-permission-common';

// @alpha
export const catalogConditions: Conditions<{
  hasAnnotation: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      annotation: string;
      value?: string | undefined;
    }
  >;
  hasLabel: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      label: string;
    }
  >;
  hasMetadata: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      key: string;
      value?: string | undefined;
    }
  >;
  hasSpec: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      key: string;
      value?: string | undefined;
    }
  >;
  isEntityKind: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      kinds: string[];
    }
  >;
  isEntityOwner: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      claims: string[];
    }
  >;
}>;

// @alpha
export type CatalogPermissionRule<
  TParams extends PermissionRuleParams = PermissionRuleParams,
> = PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>;

// @alpha
export const createCatalogConditionalDecision: (
  permission: ResourcePermission<'catalog-entity'>,
  conditions: PermissionCriteria<PermissionCondition<'catalog-entity'>>,
) => ConditionalPolicyDecision;

// @alpha
export const createCatalogPermissionRule: <
  TParams extends PermissionRuleParams = undefined,
>(
  rule: PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>,
) => PermissionRule<Entity, EntitiesSearchFilter, 'catalog-entity', TParams>;

// @alpha
export const permissionRules: {
  hasAnnotation: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      annotation: string;
      value?: string | undefined;
    }
  >;
  hasLabel: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      label: string;
    }
  >;
  hasMetadata: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      key: string;
      value?: string | undefined;
    }
  >;
  hasSpec: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      key: string;
      value?: string | undefined;
    }
  >;
  isEntityKind: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      kinds: string[];
    }
  >;
  isEntityOwner: PermissionRule<
    Entity,
    EntitiesSearchFilter,
    'catalog-entity',
    {
      claims: string[];
    }
  >;
};

// (No @packageDocumentation comment for this package)
```
