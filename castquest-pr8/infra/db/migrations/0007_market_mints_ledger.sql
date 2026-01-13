-- 0007_market_mints_ledger.sql

CREATE TABLE IF NOT EXISTS markets_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  template_id uuid NOT NULL REFERENCES frame_templates(id),
  seller_id uuid NOT NULL REFERENCES users(id),
  price_wei numeric(38,0) NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  frame_id uuid REFERENCES frame_templates(id),
  token_contract text NOT NULL,
  token_id numeric(38,0) NOT NULL,
  chain_id int NOT NULL,
  minter_address text,
  tx_hash text,
  quantity numeric(38,0) DEFAULT 1,
  price_paid_wei numeric(38,0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (token_contract, token_id, chain_id)
);
CREATE INDEX IF NOT EXISTS idx_mints_tenant ON mints(tenant_id);
