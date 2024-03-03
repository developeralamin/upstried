import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TipsApi from '../../api/books/request';
import { MONTHLY } from '../../config/constants';
import CopyRight from '../footer/Copyright';
import styles from '../package/Package.module.scss';

interface PaymentProps {
  payments: any;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

const PaymentForm: React.FC<PaymentProps> = ({ payments }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      const { token } = await stripe.createToken(
        elements.getElement(CardElement)
      );
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement('card'),
        type: 'card',
      });
      setLoading(true);
      const response = await TipsApi.payments(
        {
          stripeToken: token.id,
          paymentMethod: paymentMethod.paymentMethod.id,
        },
        payments
      );
      if (!response.data.success) {
        setLoading(false);
        return alert('Payment unsuccessful!');
      }
      const clientSecret = response.data.client_secret;

      const { error } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        setLoading(false);
        return alert('Payment unsuccessful!');
      }

      setLoading(false);
      alert('Payment Successful! Subscription active.');
      router.push({ pathname: '/' });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('Payment failed! ');
    }
  };

  return (
    <div className={styles.MaxContainer}>
      <div className={styles.PackageHeadContent}>
        <h1>Payment</h1>
      </div>

      <div className={styles.PackageContainer}>
        <div className={styles.columns}>
          <div className={styles.PaymentCardOptions}>
            <h3>Payment options</h3>
            <div className={styles.PaymentOption}>
              <p>Credit Card</p>
              <img src="/payment/master-card.png" />
              <img src="/payment/visa.png" />
              <img src="/payment/express.png" />
            </div>
            <CardElement />
          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.OrderSection}>
            <div className={styles.OrderHead}>
              <h4>Your Order</h4>
            </div>
            <div className={styles.Premium}>
              <div className={styles.premiumData}>
                <span>1 year upstride premium</span>
                <span className={styles.amount}>
                  {payments === MONTHLY ? '$4' : '$39'}
                </span>
              </div>
              <p>Have a discount code</p>
            </div>
            <div className={styles.Total}>
              <h4>Total</h4>
              <div className={styles.TrialMsg}>
                <h4>{payments === MONTHLY ? '$4' : '$39'}</h4>
                <p>Billed after free trial</p>
              </div>
            </div>
            <div className={styles.OrderDetails}>
              <span>You’ll start with a 7-day free trial</span>
              <p>
                You can cancel at any time during your trial and you won’t be
                charged
              </p>
              <Button
                loading={loading}
                className={styles.PayNow}
                onClick={createSubscription}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.PaymentFooter}>
        <CopyRight />
      </div>
    </div>
  );
};

const Payment: React.FC<PaymentProps> = ({ payments }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm payments={payments} />
    </Elements>
  );
};

export default Payment;
