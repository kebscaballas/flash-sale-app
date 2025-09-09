import React, { useEffect, useState } from 'react';
import FlashSaleContext, { type FlashSaleType } from '../contexts/flash_sale_context';

type FlashSaleProviderProps = {
  children: React.ReactNode;
};

const FlashSaleProvider = ({ children }: FlashSaleProviderProps) => {
  const [latestFlashSale, setLatestFlashSale] = useState<FlashSaleType | null>(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const getLatestFlashSale = async () => {
    try {
      setFetchStatus('loading');

      const response = await fetch(`http://localhost:3000/api/flash_sales/nearest`, {
        method: 'GET',
      })

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setFetchStatus('success');

      return data;
    } catch {
      setFetchStatus('error');
    }
  };

  useEffect(() => {
    if (!latestFlashSale) {
      const initializeLatestFlashSale = async () => {
        const response = await getLatestFlashSale();

        setLatestFlashSale(response)
      }
      
      initializeLatestFlashSale();
    }
  }, [latestFlashSale])

  return <FlashSaleContext.Provider value={{ fetchStatus, getLatestFlashSale, latestFlashSale }}>
    {children}
  </FlashSaleContext.Provider>
};

export default FlashSaleProvider;