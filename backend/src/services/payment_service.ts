import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment_repository';
import CreatePaymentPayload from '../payloads/payment/create_payment_payload';
import ListPaymentsPayload from '../payloads/payment/list_payments_payload';
import { ProductRepository } from '../repositories/product_repository';
import { FlashSaleRepository } from '../repositories/flash_sale_repository';

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
    try {
      const [product, flashSale] = await Promise.all([
        this.productRepository.read(),
        this.flashSaleRepository.getNearest(),
      ]);

      if (product.id !== dto.product_id) {
        throw new BadRequestException({
          statusCode: 404,
          detail: `product with id ${dto.product_id} not found`,
        });
      } else if (product.stock === 0) {
        throw new BadRequestException({
          statusCode: 400,
          detail: `The product is already sold out.`,
        });
      }

      if (!flashSale || flashSale.status !== 'active') {
        throw new BadRequestException({
          statusCode: 400,
          detail: 'There are no flash sales running at the moment.',
        });
      }

      const data = {
        ...dto,
        amount: product.amount,
      };

      await this.productRepository.update({
        stock: product.stock - 1,
      });

      const newPayment = await this.paymentRepository.create(data);

      return newPayment;
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'code' in e && e.code === '23505') {
        throw new BadRequestException({
          statusCode: 400,
          detail: 'A purchase has already been made by this email.',
        });
      } else {
        throw e;
      }
    }
  }
}
