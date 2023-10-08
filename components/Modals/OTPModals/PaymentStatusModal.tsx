import React, { useState } from 'react';
import { PaymentStatusModalProps } from '../../../@types';

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    modalOpen && (
      <div
        // className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
        className='flex justify-center items-center'
        onClick={() => setModalOpen(false)}
      >
        {children}
      </div>
    )
  );
};

export default PaymentStatusModal;