import { Module } from '@nestjs/common';
import { ApplicationController } from 'src/controllers/application_controller';
import { FlashSaleModule } from './flash_sale_module';
import { DbModule } from 'db/db_module';

@Module({
  imports: [DbModule, FlashSaleModule],
  controllers: [ApplicationController],
})
export class AppModule {}
