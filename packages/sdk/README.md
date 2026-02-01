# @castquest/sdk-starter

This is a lightweight TypeScript fetch-based client for CastQuest. It is a starter client generated from infra/openapi/castquest-full-openapi.yaml.

Usage
1. Build:
   npm install
   npm run build

2. Example:
   Set CQ_BASE_URL and CQ_PROJECT_ID then run:
   node dist/examples/frame-builder.js

Regeneration
- To regenerate types & client from the OpenAPI file, you can:
  - Use openapi-typescript to generate types
  - Or use openapi-generator to produce a client, then adapt to the fetch wrapper pattern used here.

Recommended commands:
- npx openapi-typescript infra/openapi/castquest-full-openapi.yaml --output src/generated/types.ts
- Then adapt src/index.ts to call the typed interfaces.

Notes
- This starter client is dependency-light and uses cross-fetch for the example runtime.
- Add authentication via `client.withAuth(token)` to include bearer token in requests.
