import React, { useState } from 'react';
import Image from 'next/image';
import group from '../../public/assets/removecart/Group.png';
import trash from '../../public/assets/removecart/delete.svg';

interface RemoveCartProps {
  closeModal: () => void;
}

const RemoveCart: React.FC<RemoveCartProps> = ({ closeModal }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const closeModalInternal = () => {
    setModalOpen(false);
    closeModal(); // Call the parent's closeModal function
  };

  if (modalOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
        <div className="bg-white-100 p-12 rounded-lg w-sm text-center">
          <svg
            onClick={closeModalInternal}
            className="ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            style={{ cursor: 'pointer' }}
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

          <div>
            <div className="flex justify-center">
              <Image src={group} alt="checked" width={200} height={200} />
            </div>
            {/* Modal content */}
            <h2 className="text-[22px] font-bold pt-4 text-[#101828]">Remove from Cart</h2>
            <p className="text-[#475467] text-[16px] font-normal mt-4 mb-4">
              Are you sure you want to remove this item from your cart?
            </p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="px-6 py-3 border rounded-md flex items-center gap-2 mt-4">
              {/* Save for Later icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                {/* ... SVG paths ... */}
              </svg>
              <span className="text-[#001F23]">Save for Later</span>
            </button>

            <button
              className="px-6 py-3 bg-[#DE3730] text-[#FFFFFF] text-[16px] flex items-center gap-2 rounded-md mt-4"
              onClick={closeModalInternal}
            >
              {/* Remove Item icon */}
              <Image src={trash} alt="checked" width={20} height={20} />
              Remove Item
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default RemoveCart;
