import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import FlashSaleEntity from 'src/entities/flash_sale_entity';
import PaymentEntity from 'src/entities/payment_entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [FlashSaleEntity, PaymentEntity],
});
