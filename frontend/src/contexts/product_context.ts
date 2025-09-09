import { createContext } from 'react'

type ProductType = {
  id: number;
  name: string;
  amount: string;
  image_url: string;
  stock: number;
}

type ProductContextType = {
  fetchStatus: string;
  getProduct: () => Promise<ProductType>;
  product: ProductType | null;
}

const ProductContext = createContext<ProductContextType>({
  fetchStatus: 'loading',
  getProduct: async () => {
    throw new Error('getProduct not implemented');
  },
  product: null,
});

export default ProductContext
