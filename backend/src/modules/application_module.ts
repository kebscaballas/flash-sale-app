import { ApplicationController } from 'src/controllers/application_controller';
import { DbModule } from 'db/db_module';
import { FlashSaleModule } from './flash_sale_module';
import { Module } from '@nestjs/common';
import { PaymentModule } from './payment_module';

@Module({
  imports: [DbModule, FlashSaleModule, PaymentModule],
  controllers: [ApplicationController],
})
export class AppModule {}
