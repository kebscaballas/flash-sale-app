import React, { useEffect, useState } from 'react';
import ProductContext from '../contexts/product_context';

type ProductProviderProps = {
  children: React.ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [product, setProduct] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const getProduct = async () => {
    try {
      setFetchStatus('loading');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
        method: 'GET'
      })

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setProduct(data);
      setFetchStatus('success');

      return data;
    } catch (e: unknown) {
      setFetchStatus('error')

      throw e;
    }
  };

  useEffect(() => {
    if (!product) {
      const initializeProduct = async () => {
        const response = await getProduct();

        setProduct(response)
      }
      
      initializeProduct();
    }
  }, [product])

  return <ProductContext.Provider value={{ fetchStatus, getProduct, product, }}>
    {children}
  </ProductContext.Provider>
};

export default ProductProvider;