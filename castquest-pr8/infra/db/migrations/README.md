# DB Migrations

This directory contains SQL migrations to create the initial core schema.

How to run:
- Use your preferred migration tool (node-pg-migrate, Flyway, sqitch, knex migrations).
- Example with psql:
  psql $DATABASE_URL -f infra/db/migrations/0001_create_tenants_users.sql
  psql $DATABASE_URL -f infra/db/migrations/0002_auth_sessions_apikeys.sql
  ...

Notes:
- These migrations intentionally do not add Row Level Security (RLS). RLS policies will be added in PR #10.
- The migrations use `pgcrypto` and `citext`. Ensure the DB allows creating extensions.
- Index recommendations are included; revisit index choices after load testing.
