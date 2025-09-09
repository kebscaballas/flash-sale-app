# Flash Sale
## System Design

## System Diagram

## Installation

## Testing

### Load testing
Load testing for each endpoint was conducted using K6. Each test consists of the following stages:
1. Target of 10 concurrent users for 30 seconds.
2. Target of 50 concurrent users for 2 minutes.
3. Target of 0 concurrent users for 30 seconds.

To execute the tests for each endpoint, run the following scripts individually:
```
// GET /products
docker run --rm -i --network flash-sale-app_default grafana/k6 run - < ./test/k6/products/get_product.ts

// GET /flash_sales/nearest
docker run --rm -i --network flash-sale-app_default grafana/k6 run - < ./test/k6/flash_sales/get_nearest_flash_sale.ts

// POST /flash_sales
docker run --rm -i --network flash-sale-app_default grafana/k6 run - < ./test/k6/flash_sales/create_flash_sale.ts

// GET /payments
docker run --rm -i --network flash-sale-app_default grafana/k6 run - < ./test/k6/payments/list_payments.ts

// POST /payments
docker run --rm -i --network flash-sale-app_default grafana/k6 run - < ./test/k6/payments/create_payment.ts
```