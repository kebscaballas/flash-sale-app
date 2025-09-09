import qs from 'qs';
import { useState } from 'react';
import ApiClient from '../lib/api_client';

type PaymentType = {
  id: number;
  amount: string;
  email: string;
  product_id: number;
}

const usePayments = () => {
  const [payment, setPayment] = useState<PaymentType[] | null>(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const apiClient = new ApiClient();

  const getPaymentByEmail = async (email: string) => {
    try {
      setFetchStatus(('loading'));

      const queryParams = qs.stringify({ email }, {
        addQueryPrefix: true,
      });

      const response = await apiClient.get(`/api/payments${queryParams}`)

      setFetchStatus('success');
      setPayment(response)

      return response;
    } catch {
      setFetchStatus('error');
      setPayment(null)
    }
  };

  const createPayment = async (payload: {
    email?: string;
    product_id: number;
  }) => {
    try {
      setFetchStatus('loading');

      const response = await apiClient.post(`/api/payments`, payload);

      setFetchStatus('success');

      return response;
    } catch (e: unknown) {
      setFetchStatus('error');

      throw e;
    }
  };

  return {
    createPayment,
    fetchStatus,
    getPaymentByEmail,
    payment
  };
};

export default usePayments;