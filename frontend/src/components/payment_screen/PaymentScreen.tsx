import type { ChangeEvent, FocusEvent } from 'react';
import { useCallback, useState } from 'react';
import usePayments from '../../hooks/usePayments';
import useProducts from '../../hooks/useProducts';
import useFlashSales from '../../hooks/useFlashSales';

import './PaymentScreen.css';
import SuccessfulPaymentOverlay from './SuccessfulPaymentOverlay';

const PaymentScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [showSuccessfulPaymentOverlay, setShowSuccessfulPaymentOverlay] = useState(false);

  const { payment, createPayment, getPaymentByEmail } = usePayments();
  const { getLatestFlashSale, fetchStatus: flashSaleFetchStatus } = useFlashSales();
  const { getProduct, product, fetchStatus: productFetchStatus } = useProducts();

  const clearError = () => {
    setError(null);
  };

  const onPurchase = async () => {
    try {
      clearError();
      setCreatingPayment(true);

      if (!product) {
        throw new Error('Product data not available.');
      }

      const payload = {
        email: email === '' ? undefined : email,
        product_id: product.id,
      };

      await createPayment(payload);

      setShowSuccessfulPaymentOverlay(true);
    } catch (e: unknown) {
      if (e && typeof e === 'object') {
        if ('detail' in e) {
          const error = e as { detail: string };

          setError(error.detail);
        } else if ('errors' in e) {
          const { errors } = e as { errors: { detail: string }[]};

          setError(errors[0].detail)
        }
      } else {
        console.log(e);
      }

      await Promise.all([
        getProduct(),
        getLatestFlashSale()
      ]);
    } finally {
      setCreatingPayment(false);
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onEmailBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;

    const response = await getPaymentByEmail(email);

    if (Array.isArray(response) && response.length > 0) {
      setError('You have already purchased this product.');
    } else {
      setError(null)
    }
  }

  const onCloseOverlay = useCallback(async () => {
    setShowSuccessfulPaymentOverlay(false);
    setEmail('')

    await Promise.all([
      getProduct(),
      getLatestFlashSale()
    ]);
  }, [getLatestFlashSale, getProduct])

  const paymentExists = Array.isArray(payment) && payment.length > 0

  const formattedAmount = product?.amount ?
    Intl.NumberFormat('en-PH').format(parseFloat(product.amount)) :
    '';

  return (
    <>
      <div className="payment-screen">
        {productFetchStatus === 'loading' && !product && (
          <p>Loading...</p>
        )}
        {(
          productFetchStatus === 'error' ||
          flashSaleFetchStatus === 'error'
        ) && (
          <>
            <p className="error-smiley">X(</p>
            <p className="unexpected-error">Something went wrong. Please try again later.</p>
          </>
        )}
        {productFetchStatus !== 'error' && product && (
          <div>      
            <div className="product-section">
              <img className="product-image" src={product.image_url} />
              <p className="product-name">{product.name}</p>
              <p className="product-amount">₱ {formattedAmount}</p>
              {product.stock <= 10 && (
                <p className="product-low-stock-alert">
                  <span style={{ fontWeight: 600 }}>{product.stock} left.</span> {' '}
                  Order yours before it's too late!
                </p>
              )}
            </div>
            <div className="payment-section">
              <div className="payment-form">
                <p className="payment-lead-in">Buy it now!</p>
                <div className="payment-field">
                  <label>E-mail</label>
                  <input
                    disabled={creatingPayment}
                    value={email}
                    onBlur={onEmailBlur}
                    onChange={onEmailChange}
                    type="text"
                  />
                  {error && (
                    <p className="field-error">{error}</p>
                  )}
                </div>
                <button
                  className="payment-submit-button"
                  disabled={creatingPayment || paymentExists}
                  onClick={onPurchase}
                >
                    Purchase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuccessfulPaymentOverlay && <SuccessfulPaymentOverlay onClose={onCloseOverlay} />}
    </>
  );
}

export default PaymentScreen;