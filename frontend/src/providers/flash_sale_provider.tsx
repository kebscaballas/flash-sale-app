import ApiClient from '../lib/api_client';
import FlashSaleContext, { type FlashSaleType } from '../contexts/flash_sale_context';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type FlashSaleProviderProps = {
  children: React.ReactNode;
};

const FlashSaleProvider = ({ children }: FlashSaleProviderProps) => {
  const [latestFlashSale, setLatestFlashSale] = useState<FlashSaleType | null>(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const apiClient = useMemo(() => new ApiClient(), []);

  const getLatestFlashSale = useCallback(async () => {
    try {
      setFetchStatus('loading');

      const response = await apiClient.get(`/api/flash_sales/nearest`);

      setFetchStatus('success');

      return response;
    } catch {
      setFetchStatus('error');
    }
  }, [apiClient]);

  useEffect(() => {
    if (!latestFlashSale) {
      const initializeLatestFlashSale = async () => {
        const response = await getLatestFlashSale();

        setLatestFlashSale(response)
      }
      
      initializeLatestFlashSale();
    }
  }, [latestFlashSale, getLatestFlashSale])

  return <FlashSaleContext.Provider value={{ fetchStatus, getLatestFlashSale, latestFlashSale }}>
    {children}
  </FlashSaleContext.Provider>
};

export default FlashSaleProvider;