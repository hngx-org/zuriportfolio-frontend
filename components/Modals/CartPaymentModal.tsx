import React, { useState } from 'react';
import Image from 'next/image';
import checkedPayment from '../../public/assets/images/check 1.png';

const CartPaymentModal = () => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    modalOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
        onClick={() => setModalOpen(false)}
      >
        <div className="bg-white-100 py-6 rounded text-center w-72">
          <div className="flex justify-center">
            <Image src={checkedPayment} alt="checked" />
          </div>
          <h3 className="text-sm w-20 mx-auto font-bold my-4">Payment Successful!</h3>
          <button
            className="bg-green-700 rounded text-white-100 text-sm w-1/2 h-9 px-3"
            onClick={() => setModalOpen(false)}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  );
};

export default CartPaymentModal;
