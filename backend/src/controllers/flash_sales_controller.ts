import { Controller, Post } from '@nestjs/common';
import { FlashSaleService } from 'src/services/flash_sale_service';

@Controller('flash_sales')
export class FlashSalesController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Post()
  create() {
    return this.flashSaleService.create({
      started_at: new Date(),
      ended_at: new Date('2025-09-11'),
    });
  }
}
