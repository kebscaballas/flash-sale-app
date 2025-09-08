import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreatePaymentPayload from 'src/payloads/payment/create_payment_payload';
import ListPaymentsPayload from 'src/payloads/payment/list_payments_payload';
import { PaymentService } from 'src/services/payment_service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async list(@Query() dto: ListPaymentsPayload) {
    const response = await this.paymentService.list(dto);

    return response;
  }

  @Post()
  async create(@Body() dto: CreatePaymentPayload) {
    const response = await this.paymentService.create(dto);

    return response;
  }
}
