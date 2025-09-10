import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateFlashSalePayload from '../payloads/flash_sale/create_flash_sale_payload';
import { FlashSaleService } from '../services/flash_sale_service';

@Controller('flash_sales')
export class FlashSalesController {
  constructor(private readonly flashSaleService: FlashSaleService) {}

  @Post()
  async create(@Body() dto: CreateFlashSalePayload) {
    const response = await this.flashSaleService.create(dto);

    return response;
  }

  @Get('/nearest')
  async getNearest() {
    const response = await this.flashSaleService.getNearest();

    return response;
  }
}
