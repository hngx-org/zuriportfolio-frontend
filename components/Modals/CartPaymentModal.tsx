import React, { useEffect } from 'react';
import Image from 'next/image';
import checkedPayment from '../../public/assets/images/check-1.png';

const CartPaymentModal = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = 'https://zuriportfolio-frontend-pw1h.vercel.app/marketplace/cart';
    }, 5000);
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white-100 py-6 rounded text-center w-72">
        <div className="flex justify-center">
          <Image src={checkedPayment} alt="checked" />
        </div>
        <h3 className="text-sm w-min-[40px] mx-auto font-bold my-4">Payment Successful!</h3>
        <button className="bg-green-700 rounded text-white-100 text-sm h-9 px-3">Redirecting to Cart...</button>
      </div>
    </div>
  );
};

export default CartPaymentModal;
