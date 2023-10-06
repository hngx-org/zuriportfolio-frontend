import React, { useState } from 'react';
import Image from 'next/image';

const PaymentInformationModal = () => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
        <div className="bg-white-100 p-12 rounded-lg w-sm   ">
          <svg
            onClick={() => setModalOpen(false)}
            className="ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M15.8127 25.2465L15.8066 25.2526L15.8007 25.2589C15.6772 25.3913 15.485 25.4668 15.2829 25.4668C15.0917 25.4668 14.9045 25.3978 14.7532 25.2465C14.4651 24.9585 14.4651 24.4751 14.7532 24.187L24.1865 14.7537C24.4746 14.4656 24.958 14.4656 25.2461 14.7537C25.5341 15.0417 25.5341 15.5251 25.2461 15.8132L15.8127 25.2465Z"
              fill="#292D32"
              stroke="#120B48"
            />
            <path
              d="M24.7163 25.4668C24.5251 25.4668 24.3378 25.3978 24.1865 25.2465L14.7532 15.8132C14.4651 15.5251 14.4651 15.0417 14.7532 14.7537C15.0412 14.4656 15.5247 14.4656 15.8127 14.7537L25.2461 24.187C25.5341 24.4751 25.5341 24.9585 25.2461 25.2465C25.0948 25.3978 24.9075 25.4668 24.7163 25.4668Z"
              fill="#292D32"
              stroke="#120B48"
            />
          </svg>

          <h1 className="text-lg font-semibold mb-6 font-manropeB">Choose Payment Modal</h1>
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-600">Order Summary</label>
            <div className="flex items-center space-x-2">
              <span className="text-[#00894C] font-semibold">See Details</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#00894C]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7.293 4.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L11.586 11H4a1 1 0 010-2h7.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              className="w-full py-2 pr-10 pl-4 border  border-[#E1E3E2] rounded-lg"
              placeholder="Order details"
              readOnly
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-[#00894C] font-semibold">1245777</span>
            </div>
          </div>

          <div className="relative w-full">
            <h3 className="mt-4 mb-2">Select payment method</h3>
            <div className="flex items-center justify-between w-full border rounded-lg p-2 mb-4 border-[#E1E3E2]">
              <label className="inline-flex items-center flex-grow">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-[#1A1C1B] border-[#E1E3E2]"
                  name="paymentMethod"
                  value="paystack"
                />
                <span className="ml-2 text-[#1A1C1B]">Pay with USSD or BanK Transfer</span>
              </label>
              <Image src="/assets/bank.png" alt="bank" width={18} height={18} />
            </div>

            <div className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-2 mb-4">
              <label className="inline-flex items-center flex-grow">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-[#1A1C1B] border-[#E1E3E2]"
                  name="paymentMethod"
                  value="paystack"
                />
                <span className="ml-2 text-[#1A1C1B]">Pay with Card</span>
              </label>
              <Image src="/assets/visa.png" alt="visa" width={24} height={24} className="mr-2" />
              <Image src="/assets/MasterCard.png" alt="mastercard" width={24} height={24} />
            </div>
            <div className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-2 mb-4">
              <label className="inline-flex items-center flex-grow">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-[#1A1C1B]"
                  name="paymentMethod"
                  value="paystack"
                />
                <span className="ml-2 text-[#1A1C1B]">Pay with strill</span>
              </label>
              <Image src="/assets/Skrill.png" alt="mastercard" width={24} height={24} />
            </div>
            <div className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-2 mb-4">
              <label className="inline-flex items-center flex-grow">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600 "
                  name="paymentMethod"
                  value="paystack"
                />
                <span className="ml-2">Pay with Paystack </span>
              </label>
              <Image src="/assets/paystack.png" alt="paystack" width={64} height={64} />
            </div>
            <div className="flex items-center justify-between w-full border rounded-lg p-2 mb-4 border-[#E1E3E2]">
              <label className="inline-flex items-center flex-grow">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600 "
                  name="paymentMethod"
                  value="paystack"
                />
                <span className="ml-2">Pay with Flutterwave</span>
              </label>
              <Image src="/assets/futterwave.png" alt="mastercard" width={76} height={76} />
            </div>
          </div>

          <button className=" py-2 px-4 w-full rounded-md hover:bg-green-600 bg-green-700 rounded text-white-100 ">
            Continue
          </button>
          <p className="text-center text-sm mt-4">
            This is an encrypted payment, your details are 100% secured and safe
          </p>
        </div>
      </div>
    )
  );
};

export default PaymentInformationModal;
