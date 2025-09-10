import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product_service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async list() {
    const response = await this.productService.get();

    return response;
  }
}
