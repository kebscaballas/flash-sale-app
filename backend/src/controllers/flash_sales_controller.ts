import { Body, Controller, Post } from '@nestjs/common';
import CreateFlashSalePayload from 'src/payloads/flash_sale/create_flash_sale_payload';
import { FlashSaleService } from 'src/services/flash_sale_service';

@Controller('flash_sales')
export class FlashSalesController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Post()
  async create(@Body() dto: CreateFlashSalePayload) {
    const response = await this.flashSaleService.create(dto);

    return response;
  }
}
