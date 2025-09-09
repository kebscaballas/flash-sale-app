import { useContext } from 'react';
import ProductContext from '../contexts/product_context';

const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error('useProducts must be used within a ProductContext.');

  return context;
};

export default useProducts;
