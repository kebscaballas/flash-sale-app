import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProductContext from '../contexts/product_context';
import ApiClient from '../lib/api_client';

type ProductProviderProps = {
  children: React.ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [product, setProduct] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const apiClient = useMemo(() => new ApiClient(), []);

  const getProduct = useCallback(async () => {
    try {
      setFetchStatus('loading');

      const response = await apiClient.get(`/api/products`);

      setProduct(response);
      setFetchStatus('success');

      return response;
    } catch (e: unknown) {
      setFetchStatus('error')

      throw e;
    }
  }, [apiClient]);

  useEffect(() => {
    if (!product) {
      const initializeProduct = async () => {
        const response = await getProduct();

        setProduct(response)
      }
      
      initializeProduct();
    }
  }, [product, getProduct])

  return <ProductContext.Provider value={{ fetchStatus, getProduct, product, }}>
    {children}
  </ProductContext.Provider>
};

export default ProductProvider;