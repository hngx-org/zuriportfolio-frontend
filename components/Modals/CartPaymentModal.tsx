import React, { useEffect } from 'react';
import Image from 'next/image';
import checkedPayment from '../../public/assets/images/check-1.png';
import { STAGING_URL } from '../../http/checkout';

const CartPaymentModal = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${STAGING_URL}/marketplace/cart`;
    }, 5000);
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white-100 py-6 rounded text-center w-72">
        <div className="flex justify-center">
          <Image src={checkedPayment} alt="checked" />
        </div>
        <h3 className="text-sm w-min-[40px] mx-auto font-bold my-4">Payment Successful!</h3>
        <span className="bg-green-700 rounded text-white-100 text-sm h-9 py-3 px-5">Redirecting to Cart...</span>
      </div>
    </div>
  );
};

export default CartPaymentModal;
