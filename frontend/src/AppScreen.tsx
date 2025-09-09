import NoSaleScreen from './components/no_sale_screen/NoSaleScreen';
import PaymentScreen from './components/payment_screen/PaymentScreen';
import useFlashSales from './hooks/useFlashSales';
import useProducts from './hooks/useProducts';

import './AppScreen.css';

const AppScreen = () => {
  const { latestFlashSale } = useFlashSales();
  const { product } = useProducts();

  return (
    <main className="app-screen">
      {product && latestFlashSale && (latestFlashSale.status === 'active' && product.stock > 0) ? (
        <PaymentScreen />
      ) : (
        <NoSaleScreen />
      )}
    </main>
  )
}

export default AppScreen;