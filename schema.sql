-- D1 schema for PARA orders.
-- Apply:  wrangler d1 execute para-orders --file=./schema.sql   (add --remote for prod)

CREATE TABLE IF NOT EXISTS orders (
  merchant_tx_id     TEXT PRIMARY KEY,
  amount             INTEGER NOT NULL,          -- integer dinars
  currency           TEXT NOT NULL DEFAULT 'RSD',
  status             TEXT NOT NULL DEFAULT 'PENDING',  -- PENDING | PAID | FAILED
  customer_email     TEXT NOT NULL,
  items_json         TEXT NOT NULL,
  allsecure_uuid     TEXT,
  purchase_id        TEXT,
  receipt_issued     INTEGER NOT NULL DEFAULT 0,
  fiscal_receipt_url TEXT,
  created_at         TEXT NOT NULL,
  updated_at         TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_status  ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at);
