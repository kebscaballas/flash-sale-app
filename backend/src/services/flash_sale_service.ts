import { Injectable, NotFoundException } from '@nestjs/common';
import { FlashSaleRepository } from '../repositories/flash_sale_repository';
import CreateFlashSalePayload from 'src/payloads/flash_sale/create_flash_sale_payload';

interface FlashSaleServiceInterface {
  create: (payload: CreateFlashSalePayload) => any;
}

@Injectable()
export class FlashSaleService implements FlashSaleServiceInterface {
  constructor(private readonly flashSaleRepository: FlashSaleRepository) {}

  async create(dto: CreateFlashSalePayload) {
    return await this.flashSaleRepository.create(dto);
  }

  async getNearest() {
    const activeFlashSale = await this.flashSaleRepository.getNearest();

    if (!activeFlashSale) {
      throw new NotFoundException({
        statusCode: 404,
        detail: 'no active flash sales found',
      });
    }

    return activeFlashSale;
  }
}
