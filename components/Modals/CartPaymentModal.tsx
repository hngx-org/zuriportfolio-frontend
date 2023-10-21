import React, { useEffect } from 'react';
import Image from 'next/image';
import checkedPayment from '../../public/assets/images/check1.png';
import { STAGING_URL } from '../../http/checkout';

const CartPaymentModal = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = `${STAGING_URL}/marketplace/cart`;
    }, 5000);
  });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="relative py-6 rounded text-center w-[340px] ">
        <div className='bg-white-100 z-10 p-5 h-[170px] relative rounded-md shadow-md'>
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

export default CartPaymentModal;
