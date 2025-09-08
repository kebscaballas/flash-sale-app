import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { dump, load } from 'js-yaml';
import ProductEntity from 'src/entities/product_entity';

type ProductType = {
  id: number;
  amount: string;
  name: string;
  stock: number;
};

type EditableKeys = 'amount' | 'name' | 'stock';

type UpdateProductDataType = Partial<Pick<ProductType, EditableKeys>>;

type ProductYamlType = {
  product: ProductType;
};

@Injectable()
export class ProductRepository {
  private readonly filePath = path.resolve(__dirname, '../../lib/product.yml');

  async read() {
    const file = await fs.readFile(this.filePath, 'utf8');

    const { product } = load(file) as ProductYamlType;

    return new ProductEntity(
      product.id,
      product.amount,
      product.name,
      product.stock,
    );
  }

  async update(data: UpdateProductDataType) {
    const file = await fs.readFile(this.filePath, 'utf8');

    const { product } = load(file) as ProductYamlType;

    const updatedProductData: ProductType = { ...product, ...data };

    const newYamlString = dump(
      { product: updatedProductData },
      { lineWidth: 120, noRefs: true },
    );

    await fs.writeFile(this.filePath, newYamlString, 'utf8');
  }
}
