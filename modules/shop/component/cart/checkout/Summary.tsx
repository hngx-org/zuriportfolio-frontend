import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CartSumaryProp, PriceData, SummaryProps } from '../../../../../@types';
import PaymentInformationModal from './PaymentInformationModal';
import TempUser from './../../../../../components/Modals/TempUser';
import useDisclosure from '../../../../../hooks/useDisclosure';
import isAuthenticated from '../../../../../helpers/isAuthenticated';
import CartPaymentModal from '../../../../../components/Modals/CartPaymentModal';

const Summary = ({ prices, summary, token }: SummaryProps & { token: string; summary: CartSumaryProp }) => {
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

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCheckoutClick = () => {
    setModalOpen(true);
  };

  return (
    <section className="flex lg:pl-10 lg:pr-0 py-8 lg:w-full md:w-1/2">
      <div className="cart-summary_wrapper flex flex-col w-[350px] space-y-6 lg:w-full md:w-full">
        <div className="cart-summary__header border border-[#EBEEEF] rounded-md shadow-sm ">
          <h1 className="font-bold capitalize text-xl px-4 py-4 ">cart summary</h1>
          <hr className="border-b-1 border-[#EBEEEF]" />
          <div className="cart-summary__details cart-summary__header border border-[#EBEEEF] rounded-md px-6 py-8 shadow-sm">
            <div className="cart-summary__prices flex flex-col space-y-3">
              <div className="sum flex justify-between">
                <p className="font-bold">Subtotal</p>
                <span className="text-gray-200">₦ {summary.subtotal ? summary.subtotal.toFixed(2) : ''}</span>
              </div>

              <div className="sum flex justify-between">
                <p className="font-bold">Promo</p>
                <span className="text-green-500 transition-all duration-300">-₦ {summary.discount}</span>
              </div>

              <div className="sum flex justify-between">
                <p className="font-bold">Vat</p>
                <span className="text-brand-red-primary transition-all duration-300">
                  +₦ {summary.VAT ? summary.VAT.toFixed(2) : ''}
                </span>
              </div>
            </div>

            <hr className="border-b-5 border-[#EBEEEF] my-4 mx-3" />

            <div className="cart-total">
              <div className="sum flex justify-between">
                <p className="font-bold">Total:</p>
                <span className="font-bold text-xl transition-all duration-300">
                  ₦ {summary.total ? summary.total.toFixed(2) : ''}
                </span>
              </div>
            </div>

            <div>
              <button
                className='bg-brand-green-primary w-full text-white-100 checkout-btn py-3 px-10 rounded-md cursor-pointer my-4 hover:bg-green-300 hover:shadow-lg hover:font-bold focus:bg-brand-green-focu transition-all duration-300"'
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
            {token.length > 0 && modalOpen ? (
              <PaymentInformationModal token={token} orderTotal={summary.total} closeModal={closeModal} />
            ) : (
              <TempUser isOpen={modalOpen} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
