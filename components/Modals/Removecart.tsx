import React, { MouseEvent, useState } from 'react';
import Image from 'next/image';
import group from '../../public/assets/removecart/Group.png';
import trash from '../../public/assets/removecart/delete.svg';

interface RemoveCartProps {
  closeModal: () => void;
  onRemoveItem: (productId: string) => void; // Make onRemoveItem optional
  productId: string;
}

const RemoveCart: React.FC<RemoveCartProps> = ({ closeModal, onRemoveItem, productId }) => {
  // const [modalOpen, setModalOpen] = useState(true);

  // if (modalOpen) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
      <div
        id="modal"
        className="bg-white-100 p-4 rounded-lg w-[90%] md:w-[50%] lg:w-[35%] h-415 text-center animate-slideIn"
      >
        <svg
          onClick={closeModal}
          className="ml-auto mr-1 mt-1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ cursor: 'pointer' }}
        >
          <path
            d="M18 6.5L6 18.5M6 6.5L18 18.5"
            stroke="#667085"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div>
          <div className="flex justify-center">
            <Image src={group} alt="checked" width={100} height={100} />
          </div>
          {/* Modal content */}
          <h2 className="text-[18px] font-bold pt-2 text-[#101828]">Remove from Cart</h2>
          <p className="text-[#475467] text-[14px] font-normal mt-4 mb-2">
            Are you sure you want to remove this item from your cart?
          </p>
        </div>
        {/* Buttons */}
        <div className="flex flex-row items-between justify-between mt-5">
          <button className="px-6 py-3 border rounded-md flex items-center gap-2" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <g id="vuesax/outline/heart">
                <g id="vuesax/outline/heart_2">
                  <g id="heart">
                    <path
                      id="Vector"
                      d="M7.99998 14.9336C7.79331 14.9336 7.59331 14.9069 7.42665 14.8469C4.87998 13.9736 0.833313 10.8736 0.833313 6.29356C0.833313 3.96023 2.71998 2.06689 5.03998 2.06689C6.16665 2.06689 7.21998 2.50689 7.99998 3.29356C8.77998 2.50689 9.83331 2.06689 10.96 2.06689C13.28 2.06689 15.1666 3.96689 15.1666 6.29356C15.1666 10.8802 11.12 13.9736 8.57331 14.8469C8.40665 14.9069 8.20665 14.9336 7.99998 14.9336ZM5.03998 3.06689C3.27331 3.06689 1.83331 4.51356 1.83331 6.29356C1.83331 10.8469 6.21331 13.3802 7.75331 13.9069C7.87331 13.9469 8.13331 13.9469 8.25331 13.9069C9.78665 13.3802 14.1733 10.8536 14.1733 6.29356C14.1733 4.51356 12.7333 3.06689 10.9666 3.06689C9.95331 3.06689 9.01331 3.54023 8.40665 4.36023C8.21998 4.61356 7.79331 4.61356 7.60665 4.36023C6.98665 3.53356 6.05331 3.06689 5.03998 3.06689Z"
                      fill="#001F23"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className="text-[#001F23]">Save for Later</span>
          </button>
          <button
            className="px-6 py-3 bg-[#DE3730] text-[#FFFFFF] text-[14px] flex items-center gap-2 rounded-md"
            onClick={() => {
              onRemoveItem(productId);
            }}
          >
            {/* Remove Item icon */}
            <Image src={trash} alt="checked" width={20} height={20} />
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
  // }
  // return null;
};

export default RemoveCart;
