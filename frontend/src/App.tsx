import AppScreen from './AppScreen'
import FlashSaleProvider from './providers/flash_sale_provider'
import ProductProvider from './providers/product_provider'

function App() {
  return (
    <FlashSaleProvider>
      <ProductProvider>
        <AppScreen />
      </ProductProvider>
    </FlashSaleProvider>
  )
}

export default App
