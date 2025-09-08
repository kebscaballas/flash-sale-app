import { FlashSaleRepository } from 'src/repositories/flash_sale_repository';
import { Module } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment_repository';
import { PaymentsController } from '../controllers/payments_controller';
import { PaymentService } from '../services/payment_service';
import { ProductRepository } from 'src/repositories/product_repository';

@Module({
  providers: [
    FlashSaleRepository,
    PaymentService,
    PaymentRepository,
    ProductRepository,
  ],
  controllers: [PaymentsController],
})
export class PaymentModule {}
