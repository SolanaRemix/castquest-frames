-- 0009_protocol_audit_system.sql

CREATE TABLE IF NOT EXISTS protocol_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  chain_id int,
  contract_address text,
  decimals int,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS protocol_fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  fee_type text NOT NULL,
  bps int NOT NULL,
  max_bps int NOT NULL DEFAULT 1000,
  updated_by uuid REFERENCES users(id),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS protocol_metrics_snapshots (
  id bigserial PRIMARY KEY,
  tenant_id uuid REFERENCES tenants(id),
  timestamp timestamptz NOT NULL DEFAULT now(),
  tvl_usd numeric,
  volume_24h_usd numeric,
  active_users_24h int,
  frames_active int,
  mints_24h int
);

CREATE TABLE IF NOT EXISTS system_health_checks (
  id bigserial PRIMARY KEY,
  timestamp timestamptz NOT NULL DEFAULT now(),
  component text NOT NULL,
  status text NOT NULL,
  latency_ms int,
  metadata jsonb
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY,
  tenant_id uuid REFERENCES tenants(id),
  user_id uuid,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  ip inet,
  created_at timestamptz NOT NULL DEFAULT now(),
  immutable_seq bigserial UNIQUE
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id);

-- TODO: Add RLS policies in PR #10
