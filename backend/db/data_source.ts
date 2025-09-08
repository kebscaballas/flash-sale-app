import { DataSource } from 'typeorm';
import FlashSaleEntity from 'src/entities/flash_sale_entity';
import PaymentEntity from 'src/entities/payment_entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'app',
  entities: [FlashSaleEntity, PaymentEntity],
});
