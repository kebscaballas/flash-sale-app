import { ApplicationRepository } from './application_repository';
import { DataSource } from 'typeorm';
import FlashSaleEntity from '../entities/flash_sale_entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlashSaleRepository extends ApplicationRepository<FlashSaleEntity> {
  constructor(dataSource: DataSource) {
    super(FlashSaleEntity, dataSource);
  }
}
