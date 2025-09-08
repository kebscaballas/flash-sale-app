import { ApplicationRepository } from './application_repository';
import { DataSource } from 'typeorm';
import PaymentEntity from '../entities/payment_entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentRepository extends ApplicationRepository<PaymentEntity> {
  constructor(dataSource: DataSource) {
    super(PaymentEntity, dataSource);
  }
}
