import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment_repository';
import CreatePaymentPayload from '../payloads/payment/create_payment_payload';
import ListPaymentsPayload from 'src/payloads/payment/list_payments_payload';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async list(dto: ListPaymentsPayload) {
    return await this.paymentRepository.query(dto);
  }

  async create(dto: CreatePaymentPayload) {
    return await this.paymentRepository.create(dto);
  }
}
