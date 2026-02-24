-- 0006_ai_jobs_tailors.sql

CREATE TABLE IF NOT EXISTS tailors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  config jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id uuid,
  entity_type text,
  entity_id uuid,
  job_type text NOT NULL,
  input_hash text,
  output_hash text,
  model_id text,
  prompt_version text,
  confidence_score numeric(5,4),
  status text NOT NULL DEFAULT 'pending',
  input jsonb NOT NULL,
  output jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  attempts int NOT NULL DEFAULT 0,
  last_error text
);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_tenant_status ON ai_jobs(tenant_id, status);
