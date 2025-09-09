import qs from 'qs';
import { useState } from 'react';

type PaymentType = {
  id: number;
  amount: string;
  email: string;
  product_id: number;
}

const usePayments = () => {
  const [payment, setPayment] = useState<PaymentType[] | null>(null);
  const [fetchStatus, setFetchStatus] = useState('loading');

  const getPaymentByEmail = async (email: string) => {
    try {
      setFetchStatus(('loading'));

      const queryParams = qs.stringify({ email }, {
        addQueryPrefix: true,
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments${queryParams}`, {
        method: 'GET'
      })

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setFetchStatus('success');
      setPayment(data)

      return data;
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

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      setFetchStatus('success');

      return data;
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