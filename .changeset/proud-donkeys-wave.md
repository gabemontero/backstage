---
'@backstage/catalog-model': minor
---

Added `backstage.io/v1alpha3` of the `API` kind. This cumulative version includes all features from `v1alpha2` and additionally supports a new `spec.type: 'ai-model-server'` subtype for modeling AI model servers and LLM endpoints. The AI model server type allows you to represent services like OpenAI, Ollama, Anthropic, and other AI inference endpoints in the catalog using a structured `spec.remotes` array similar to the MCP server pattern. New public exports: `ApiEntityV1alpha3`, `ApiEntityV1alpha3Default`, `AiModelServerApiEntityV1alpha3`, `AiModelServerRemote`, `McpServerApiEntityV1alpha3`, `apiEntityV1alpha3Validator`, `mcpServerApiEntityV1alpha3Validator`, `aiModelServerApiEntityV1alpha3Validator`, `isAiModelServerApiEntity`, and `isMcpServerApiEntityV1alpha3`.
