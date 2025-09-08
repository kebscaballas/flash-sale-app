import { Module } from '@nestjs/common';
import { PaymentsController } from '../controllers/payments_controller';
import { PaymentService } from '../services/payment_service';
import { PaymentRepository } from '../repositories/payment_repository';

@Module({
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentsController],
})
export class PaymentModule {}
