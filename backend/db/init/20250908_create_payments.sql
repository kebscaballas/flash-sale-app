CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  email VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_product_id_email_payment UNIQUE (email, product_id)
);

CREATE INDEX idx_payments_email ON payments (email);