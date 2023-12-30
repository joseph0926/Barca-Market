import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { FaCog, FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ISellerGig } from '@/features/gigs/interfaces/gig.interface';
import { IResponse } from '@/shared/interfaces/shared.interface';
import { saveToLocalStorage, showErrorToast } from '@/shared/utils/utils.service';

import { IOffer } from '@/features/order/interfaces/order.interface';
import { useCreateOrderIntentMutation } from '@/features/order/services/order.service';
import CheckoutForm from '@/features/order/components/checkout-form/CheckoutForm';

const Checkout: FC = (): ReactElement => {
  const stripePromise = useMemo(() => loadStripe(import.meta.env.VITE_STRIPE_KEY), []);
  const [clientSecret, setClientSecret] = useState<string>('');
  const { gigId } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const { state }: { state: ISellerGig } = useLocation();
  const [offer] = useState<IOffer>(JSON.parse(`${searchParams.get('offer')}`));
  const serviceFee: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  const [createOrderIntent] = useCreateOrderIntentMutation();

  const createBuyerOrderIntent = async (): Promise<void> => {
    try {
      const response: IResponse = await createOrderIntent(offer.price).unwrap();
      setClientSecret(`${response.clientSecret}`);
      saveToLocalStorage('paymentIntentId', JSON.stringify(`${response.paymentIntentId}`));
    } catch (error) {
      showErrorToast('Error with checkout.');
    }
  };

  useEffect(() => {
    createBuyerOrderIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = { clientSecret } as StripeElementsOptions;

  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
          <div className="border-grey border">
            <div className="mb-3 px-4 pb-4 pt-3 text-xl font-medium">
              <span>Payment</span>
            </div>
            {clientSecret && (
              <Elements options={options} key={clientSecret} stripe={stripePromise}>
                <CheckoutForm gigId={`${gigId}`} offer={offer} />
              </Elements>
            )}
            {/* <!-- CheckoutForm --> */}
          </div>
        </div>

        <div className="w-full p-4 lg:w-1/3">
          <div className="border-grey mb-8 border">
            <div className="mb-2 flex flex-col border-b px-4 pb-4 pt-3 md:flex-row">
              <img className="h-11 w-20 object-cover" src={state.coverImage} alt="Gig Cover Image" />
              <h4 className="mt-2 text-sm font-bold text-[#161c2d] md:mt-0 md:pl-4">{state.title}</h4>
            </div>
            <ul className="mb-0 list-none">
              <li className="border-grey flex border-b px-4 pb-3 pt-1">
                <div className="text-sm font-normal">{state.description}</div>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">
                  <FaRegClock className="self-center" /> Expected delivery time
                </div>
                <span className="text-sm">
                  {offer.deliveryInDays} day{offer.deliveryInDays > 1 ? 's' : ''}
                </span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">
                  <FaRegMoneyBillAlt className="self-center" /> Price
                </div>
                <span className="text-sm">${offer.price}</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">
                  <FaCog className="self-center" /> Service fee
                </div>
                <span className="text-sm">${serviceFee.toFixed(2)}</span>
              </li>
              <div className="border-grey border-b" />
              <li className="flex justify-between px-4 py-4">
                <div className="flex gap-2 text-sm font-semibold md:text-base">
                  <FaCog className="self-center" /> Total
                </div>
                <span className="text-sm font-semibold md:text-base">${offer.price + serviceFee}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
