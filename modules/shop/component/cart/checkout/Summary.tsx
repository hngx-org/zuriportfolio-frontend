import Image from 'next/image';
import React, { useState } from 'react';
import { PriceData, SummaryProps } from '../../../../../@types';
import PaymentInformationModal from './PaymentInformationModal';

const Summary: React.FC<SummaryProps> = ({ prices }) => {
  const [couponValue, setCouponValue] = useState<string>('');
  const [couponErrorState, setCouponErrorState] = useState<boolean>(false);
  const [showDiscount, setShowDiscount] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultPrices: PriceData = {
    subtotal: 600,
    discount: 50,
    vat: 50,
    total: 650,
  };

  const displayPrices = prices ?? defaultPrices;

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setShowDiscount(false);
      setInvalid(false);
      return;
    }
    setCouponValue(e.target.value);
  };

  const couponHandler = () => {
    if (couponValue.trim().length === 0) {
      setCouponErrorState(true);
      setShowDiscount(false);
      setInvalid(false);
    }

    if (couponValue.trim() !== '50 SALE') {
      setCouponErrorState(true);
      setInvalid(true);
      if (showDiscount) {
        setShowDiscount(false);
      }
    } else {
      setCouponErrorState(false);
      setShowDiscount(true);
      setInvalid(false);
    }
  };

  const handleCheckoutClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="flex flex-grow px-10 py-8">
      <div className="cart-summary_wrapper flex flex-col space-y-6">
        <div className="cart-summary__header border border-gray-300 rounded-md shadow-sm">
          <h1 className="font-bold capitalize text-xl px-4 py-4 ">cart summary</h1>
          <hr className="border-b-1 border-gray-500" />
          <div className="coupon flex flex-col py-4 px-4">
            <span></span> <span className="text-sm">Have a coupon?</span>
            <div className="coupon w-full py-0 flex items-center">
              <input
                type="text"
                placeholder="50 SALE"
                className={`border border-green-300 my-0 border-r-0 h-[100%] placeholder-green-400 outline-none py-2 px-4  rounded-l-lg ${
                  couponErrorState ? 'border-brand-red-primary' : ''
                }`}
                onFocus={() => {
                  setCouponErrorState(false);
                  setInvalid(false);
                }}
                onChange={onChangeInputHandler}
              />

              <button
                type="submit"
                className={`bg-green-300 text-white-100 py-2 px-6 rounded-r-md capitalize hover:bg-brand-green-primary border-0 focus:bg-brand-green-focus transition-all duration-300 ${
                  couponErrorState ? 'bg-gray-200' : ''
                }`}
                onClick={couponHandler}
              >
                apply
              </button>
            </div>
            {showDiscount ? (
              <div className="discount flex items-center space-x-1">
                <Image src="/assets/check.svg" alt="check-svg" width={10} height={10} />
                <span className="text-sm text-green-300 transition-all duration-300">Hurray! you got a discount!</span>
              </div>
            ) : (
              ''
            )}
            {invalid ? (
              <div className="discount flex items-center space-x-1">
                <Image src="/assets/x.svg" alt="check-svg" width={10} height={10} />

                <span className="text-sm text-brand-red-primary transition-all duration-300">
                  Oh No! The Coupon code you entered is invalid
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="cart-summary__details cart-summary__header border border-gray-300 rounded-md px-6 rounded-lg py-8 shadow-sm">
          <div className="cart-summary__prices flex flex-col space-y-3">
            <div className="sum flex justify-between">
              <p className="font-bold">Subtotal</p>
              <span className="text-gray-200">${displayPrices.subtotal.toFixed(2)}</span>
            </div>
            {showDiscount ? (
              <div className="sum flex justify-between">
                <p className="font-bold">Discount</p>
                <span className="text-green-500 transition-all duration-300">
                  -${displayPrices.discount.toFixed(2)}
                </span>
              </div>
            ) : (
              ''
            )}

            <div className="sum flex justify-between">
              <p className="font-bold">Vat</p>
              <span className="text-brand-red-primary transition-all duration-300">
                +${displayPrices.vat.toFixed(2)}
              </span>
            </div>
          </div>

          <hr className="border-b-5 border-gray-300 my-4 mx-3" />

          <div className="cart-total">
            <div className="sum flex justify-between">
              <p className="font-bold">Total:</p>
              <span className="font-bold text-xl transition-all duration-300">${displayPrices.total.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <button
              className='bg-brand-green-primary w-full text-white-100 checkout-btn py-3 px-10 rounded-md cursor-pointer my-4 hover:bg-brand-green-primary focus:bg-brand-green-focu transition-all duration-300"'
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
          {modalOpen ? <PaymentInformationModal closeModal={closeModal} /> : null}
        </div>
      </div>
    </section>
  );
};

export default Summary;
