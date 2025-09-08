import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment_repository';
import CreatePaymentPayload from '../payloads/payment/create_payment_payload';
import ListPaymentsPayload from 'src/payloads/payment/list_payments_payload';
import { ProductRepository } from 'src/repositories/product_repository';
import { FlashSaleRepository } from 'src/repositories/flash_sale_repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly flashSaleRepository: FlashSaleRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async list(dto: ListPaymentsPayload) {
    return await this.paymentRepository.query(dto);
  }

  async create(dto: CreatePaymentPayload) {
    const product = await this.productRepository.read();

    if (product.id !== dto.product_id) {
      throw new BadRequestException({
        statusCode: 404,
        detail: `product with id ${dto.product_id} not found`,
      });
    } else if (product.stock === 0) {
      throw new BadRequestException({
        statusCode: 400,
        detail: `the product is already sold out`,
      });
    }

    const flashSale = await this.flashSaleRepository.getNearest();

    if (!flashSale || flashSale.status !== 'active') {
      throw new BadRequestException({
        statusCode: 400,
        detail: 'there are no flash sales running at the moment',
      });
    }

    const existingPayment = await this.paymentRepository.query({
      email: dto.email,
    });

    if (existingPayment.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        detail: 'a purchase has already been made by this email',
      });
    }

    const data = {
      ...dto,
      amount: product.amount,
    };

    const newPayment = await this.paymentRepository.create(data);

    await this.productRepository.update({
      stock: product.stock - 1,
    });

    return newPayment;
  }
}
