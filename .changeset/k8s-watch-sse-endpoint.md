---
'@backstage/plugin-kubernetes-backend': patch
---

Added an endpoint that streams Kubernetes watch events for an entity as server-sent events, combining watches across the entity's clusters and resource types into a single stream. Watch supports clusters that use server-side authentication; client-side authentication clusters report an error on the stream so that callers can continue to poll those clusters.
