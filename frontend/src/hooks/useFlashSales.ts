import { useContext } from 'react';
import FlashSaleContext from '../contexts/flash_sale_context';

const useFlashSales = () => {
  const context = useContext(FlashSaleContext);

  if (!context) throw new Error('useFlashSales must be used within a FlashSaleContext.');

  return context;
};

export default useFlashSales;
