# PR: Add full OpenAPI spec, TypeScript SDK starter, and initial DB migrations

This Draft PR adds:
- infra/openapi/castquest-full-openapi.yaml — expanded OpenAPI 3.0.3 spec covering auth, projects, frames, agents, shipments, billing, ai, admin, dev-api, market, quests, social, analytics.
- packages/sdk — TypeScript SDK starter (typed fetch client), minimal generated types, example usage for the Frame Builder flow, and README.
- infra/db/migrations/0001_... -> 0010_... — initial numbered SQL migrations creating core schema.
- infra/openapi/README.md explaining regeneration steps.
- infra/.github/workflows/openapi-sdk.yml CI workflow (builds SDK and validates OpenAPI).

Follow-ups:
- PR #9: UI wiring + tests (apps/web + apps/admin integration using the new SDK)
- PR #10: Finalize DB migrations with RLS policies, index tuning, and RLS tests

Notes:
- Migrations do not include Row Level Security (RLS); add RLS in PR #10 and add RLS policies that use current_setting('app.tenant_id')::uuid pattern.
- The OpenAPI file is a baseline; expand component schemas and examples as you iterate.
