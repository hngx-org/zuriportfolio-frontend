import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import group from './Group.png';

interface RemoveCartProps {
  onClose: () => void;
}

const RemoveCart: FunctionComponent<RemoveCartProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md backdrop-filter backdrop-opacity-50">
      <div className="bg-white w-96 h-auto p-6 rounded-lg shadow-lg relative text-center">
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
        <Image src={group} alt="group" />
        {/* Modal content */}
        <h2 className="text-xl font-semibold mb-4">Remove from Cart</h2>
        <p className="text-gray-900 mb-4">Are you sure you want to remove this item from your cart?</p>

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="px-4 py-2 text-white bg-white rounded-lg border-black border" onClick={onClose}>
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
            Save for Later
          </button>
          <button
            className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current inline mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 3a1 1 0 00-1 1v11a1 1 0 001 1h1v1a2 2 0 002 2h8a2 2 0 002-2v-1h1a1 1 0 001-1V4a1 1 0 00-1-1H5zm1 2h8a1 1 0 011 1v8H5V6a1 1 0 011-1zm7 10a1 1 0 100 2 1 1 0 000-2zm-7 0a1 1 0 100 2 1 1 0 000-2zm3-5a1 1 0 112 0 1 1 0 01-2 0z"
                clipRule="evenodd"
              />
            </svg>
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveCart;
