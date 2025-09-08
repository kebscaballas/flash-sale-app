import { ApplicationRepository } from './application_repository';
import { DataSource } from 'typeorm';
import FlashSaleEntity from '../entities/flash_sale_entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlashSaleRepository extends ApplicationRepository<FlashSaleEntity> {
  constructor(dataSource: DataSource) {
    super(FlashSaleEntity, dataSource);
  }

  async getNearest() {
    const response = await this.persistence()
      .createQueryBuilder('flash_sale')
      .where('flash_sale.started_at IS NOT NULL')
      .orderBy(
        `
          CASE
            WHEN flash_sale.started_at <= NOW()::timestamp
            AND (NOW()::timestamp <= flash_sale.ended_at)
            THEN 0 ELSE 1
          END
        `,
        'ASC',
      )
      .addOrderBy(
        'ABS(EXTRACT(EPOCH FROM (flash_sale.started_at - NOW()::timestamp)))',
        'ASC',
      )
      .limit(1)
      .getOne();

    return response;
  }
}
