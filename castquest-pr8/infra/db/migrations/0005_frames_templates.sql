-- 0005_frames_templates.sql

CREATE TABLE IF NOT EXISTS frame_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id),
  name text NOT NULL,
  description text,
  current_version_id uuid,
  farcaster_frame_id text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS frame_template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES frame_templates(id) ON DELETE CASCADE,
  version int NOT NULL,
  schema jsonb NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  change_summary text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (template_id, version)
);

CREATE TABLE IF NOT EXISTS frame_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  template_id uuid NOT NULL REFERENCES frame_templates(id) ON DELETE CASCADE,
  version_id uuid,
  event_type text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid
);

CREATE INDEX IF NOT EXISTS idx_frame_timelines_template ON frame_timelines(template_id);
