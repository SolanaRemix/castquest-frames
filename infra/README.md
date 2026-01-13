# OpenAPI - CastQuest Full API

Location:
- infra/openapi/castquest-full-openapi.yaml

Purpose:
- Single source of truth for API surface for the gateway and downstream services.
- Use to generate SDKs and API docs.

Suggested regeneration steps for TypeScript types:
1. Install openapi-typescript:
   npm i -D openapi-typescript
2. Generate types:
   npx openapi-typescript infra/openapi/castquest-full-openapi.yaml --output packages/sdk/src/generated/types.ts

To generate a full client with openapi-generator:
- Install openapi-generator and run generation targeting TypeScript-Axios or other generators.

Notes:
- The current YAML is a working baseline; expand component schemas and examples as needed.
