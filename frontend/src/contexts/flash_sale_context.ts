import { createContext } from 'react'

export type FlashSaleType = {
  id: number;
  created_at: string;
  started_at: string;
  ended_at: string;
  status: string;
}

type FlashSaleContextType = {
  fetchStatus: string;
  getLatestFlashSale: () => Promise<FlashSaleType>;
  latestFlashSale: FlashSaleType | null;
}

const FlashSaleContext = createContext<FlashSaleContextType>({
  fetchStatus: 'loading',
  getLatestFlashSale: async () => {
    throw new Error('getLatestFlashSale not implemented');
  },
  latestFlashSale: null,
});

export default FlashSaleContext
