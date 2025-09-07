import { Module } from '@nestjs/common';
import { FlashSalesController } from '../controllers/flash_sales_controller';
import { FlashSaleService } from '../services/flash_sale_service';
import { FlashSaleRepository } from '../repositories/flash_sale_repository';

@Module({
  providers: [FlashSaleService, FlashSaleRepository],
  controllers: [FlashSalesController],
})
export class FlashSaleModule {}
