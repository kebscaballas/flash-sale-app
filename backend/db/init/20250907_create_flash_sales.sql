CREATE TABLE IF NOT EXISTS flash_sales (
  id SERIAL PRIMARY KEY,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_flash_sales_started_at ON flash_sales (started_at);
CREATE INDEX idx_flash_sales_started_at_ended_at ON flash_sales (started_at, ended_at);