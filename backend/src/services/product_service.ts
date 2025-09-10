import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product_repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async get() {
    return await this.productRepository.read();
  }
}
