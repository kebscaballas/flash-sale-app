import { Injectable } from '@nestjs/common';
import { FlashSaleRepository } from '../repositories/flash_sale_repository';

interface FlashSaleServiceInterface {
  create: (payload: { [key: string]: any }) => any;
}

@Injectable()
export class FlashSaleService implements FlashSaleServiceInterface {
  constructor(private readonly flashSaleRepository: FlashSaleRepository) {}

  async create(payload: { [key: string]: any }) {
    return await this.flashSaleRepository.create(payload);
  }
}
