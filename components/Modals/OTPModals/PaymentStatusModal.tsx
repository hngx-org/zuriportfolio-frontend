import React, { useState } from 'react';
import { PaymentStatusModalProps } from '../../../@types';

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    modalOpen && (
      <div
        className='flex justify-center items-center'
        onClick={() => setModalOpen(false)}
      >
        {children}
      </div>
    )
  );
};
export default PaymentStatusModal;