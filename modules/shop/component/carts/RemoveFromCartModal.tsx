import { CloseCircle } from 'iconsax-react';
import React from 'react';

interface RemoveFromCartModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveFromCartModal: React.FC<RemoveFromCartModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed  inset-0  z-50  flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-20"></div>

      <div className="bg-custom-color38 shadow shadow-white-400 rounded-md p-6 w-full max-w-md relative">
        <>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 cursor-pointer">
            <CloseCircle size="20" color="#000" />
          </button>
          <div className="py-8">
            <p className="text-center text-xl font-manropeB mb-4">
              Are you sure you want to Remove the Product from Your Cart?{' '}
            </p>
            <div className="flex justify-center py-3 mt-4">
              <button
                className="bg-none text-brand-success-primary hover:bg-brand-green-hover cursor-pointer hover:text-white-100 border-brand-success-primary border px-8 py-2 rounded-lg mr-2"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="  bg-brand-red-primary cursor-pointer hover:bg-brand-red-hover text-white-100 px-8 text-sm py-2 rounded-lg"
                onClick={onConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default RemoveFromCartModal;
