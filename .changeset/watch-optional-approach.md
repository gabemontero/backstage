---
'@backstage/plugin-kubernetes-common': patch
'@backstage/plugin-kubernetes-node': patch
'@backstage/plugin-kubernetes-backend': patch
---

Add optional watch functionality to Kubernetes plugin with utility-based approach. The `watchResource?()` method provides an async iterator interface for streaming resource changes, with stream processing extracted to a reusable `processWatchStream()` utility function for better testability and separation of concerns.
