import React, { useState } from 'react';
import Image from 'next/image';
import group from '../../public/assets/removecart/Group.png';
import trash from '../../public/assets/removecart/delete.svg';

const RemoveCart = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  if (modalOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080] bg-opacity-30">
        <div className="bg-white-100 p-12 rounded-lg w-sm text-center">
          <svg
            onClick={() => setModalOpen(false)}
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
              {' '}
              {/* Added margin-top and margin-bottom */}
              Are you sure you want to remove this item from your cart?
            </p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="px-6 py-3 border rounded-md flex items-center gap-2 mt-4" onClick={closeModal}>
              {/* Save for Later icon */}
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
              className="px-6 py-3 bg-[#DE3730] text-[#FFFFFF] text-[16px] flex items-center gap-2 rounded-md mt-4"
              onClick={closeModal}
            >
              {' '}
              {/* Added margin-top */}
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
