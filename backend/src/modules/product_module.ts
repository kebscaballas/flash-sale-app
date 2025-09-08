import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products_controller';
import { ProductService } from '../services/product_service';
import { ProductRepository } from '../repositories/product_repository';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductsController],
})
export class ProductModule {}
