import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import group from '../../public/assets/removecart/Group.png';
import trash from '../../public/assets/removecart/delete.svg';

interface RemoveCartProps {
  onClose: () => void;
}

const RemoveCart: FunctionComponent<RemoveCartProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter backdrop-opacity-50">
      <div className="bg-white w-[90%] max-w-[400px] px-5 py-8 h-auto rounded-lg shadow-lg relative text-center">
        {/* Close button */}
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-current"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="flex justify-center">
          <Image src={group} alt="checked" width={200} height={200} />
        </div>

        {/* Modal content */}
        <h2 className="text-[22px] font-bold pt-4 text-[#101828]">Remove from Cart</h2>
        <p className="text-[#475467] text-[16px] font-normal">
          Are you sure you want to remove this item from your cart?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="px-6 py-3 border rounded-md flex items-center gap-2" onClick={onClose}>
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
            className="px-6 py-3 bg-[#DE3730] text-[#FFFFFF] text-[16px] flex items-center gap-2 rounded-md"
            onClick={onClose}
          >
            {/* Remove Item icon */}
            <Image src={trash} alt="checked" width={20} height={20} />
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveCart;
