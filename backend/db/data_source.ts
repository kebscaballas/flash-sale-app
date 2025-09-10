import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import FlashSaleEntity from '../src/entities/flash_sale_entity';
import PaymentEntity from '../src/entities/payment_entity';
import ProductEntity from '../src/entities/product_entity';

dotenv.config();

const defaultDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [FlashSaleEntity, PaymentEntity],
  extra: {
    max: 10,
    connectionTimeout: 5000,
    requestTimeout: 10000,
  },
};

const testDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.TEST_DB_URL,
  entities: [FlashSaleEntity, PaymentEntity, ProductEntity],
  synchronize: true,
  dropSchema: true,
  logging: false,
};

const ENVIRONMENT = process.env.NODE_ENV ?? 'development';

export const AppDataSource = new DataSource(
  ENVIRONMENT === 'test' ? testDataSourceOptions : defaultDataSourceOptions,
);
