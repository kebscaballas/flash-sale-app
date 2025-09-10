import { ApplicationController } from '../controllers/application_controller';
import { DbModule } from '../../db/db_module';
import { FlashSaleModule } from './flash_sale_module';
import { Module } from '@nestjs/common';
import { PaymentModule } from './payment_module';
import { ProductModule } from './product_module';

@Module({
  imports: [DbModule, FlashSaleModule, PaymentModule, ProductModule],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
