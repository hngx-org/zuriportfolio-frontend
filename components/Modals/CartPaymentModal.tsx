import React, { useEffect } from 'react';
import Image from 'next/image';
import checkedPayment from '../../public/assets/images/check1.png';

import failedPayment from '../../public/assets/images/cancel.png';

import { STAGING_URL } from '../../http/checkout';

const CartPaymentsuccessModal = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${STAGING_URL}/marketplace/cart`;
    }, 5000);
  });

const closeModal = () => {
  window.location.href = `${STAGING_URL}/marketplace/cart`;
}
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="relative py-6 rounded text-center w-[340px] ">
      <div className='bg-[#fff] flex items-center p-1 rounded-[50%] w-[25px] h-[25px] absolute top-[-15px] right-0 cursor-pointer' onClick={closeModal} role='button'>
          <svg
            onClick={closeModal}
            className='pointer'
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ cursor: 'pointer' }}
          >
            <path
              d="M18 6.5L6 18.5M6 6.5L18 18.5"
              stroke="#EF4C45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="bg-white-100 z-10 p-5 h-[170px] relative rounded-md shadow-md">

          <div className="flex justify-center absolute top-[-30px] left-0 right-0 mx-auto">
            <Image width={80} height={80} src={checkedPayment} alt="checked" />
          </div>
          <h3 className="text-md text-[#30c77f] w-min-[40px] mx-auto font-bold mt-[80px]">Payment Successful!</h3>
          <span className="rounded  text-sm h-9 py-3 px-5">Redirecting to Cart...</span>
        </div>

        <div className="w-[310px] bg-[#30c77f] h-[40px] absolute left-[25px] bottom-[17px] rounded-lg z-0"></div>
      </div>
    </div>
  );
};

export default CartPaymentsuccessModal;

export const CartPaymentFailureModal = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${STAGING_URL}/marketplace/cart`;
    }, 5000);
  });
  const closeModal = () => {
    window.location.href = `${STAGING_URL}/marketplace/cart`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="relative py-6 rounded text-center min-w-[340px] ">
        <div className='bg-[#fff] flex items-center p-1 rounded-[50%] w-[25px] h-[25px] absolute top-[-15px] right-0 cursor-pointer' onClick={closeModal} role='button'>
          <svg
            onClick={closeModal}
            className='pointer'
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ cursor: 'pointer' }}
          >
            <path
              d="M18 6.5L6 18.5M6 6.5L18 18.5"
              stroke="#EF4C45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      
        <div className="bg-white-100 z-10 p-5 min-h-[170px] relative rounded-md shadow-md">
          <div className="flex justify-center absolute top-[-30px] left-0 right-0 mx-auto">
            <Image width={80} height={80} src={failedPayment} alt="checked" />
          </div>
          <h3 className="text-md text-[#EF4C45] w-min-[40px] mx-auto font-bold mt-[80px]">Payment Failed!</h3>
          <p className="text-sm text-[#DF2209]">You were not charged for this transaction</p>
          <span className="rounded text-sm h-9 py-3 px-5">Redirecting to Cart...</span>
        </div>

        <div className="w-[310px] bg-[#EF4C45] h-[40px] absolute left-[25px] bottom-[17px] rounded-lg z-0"></div>
      </div>
    </div>
  );

};

