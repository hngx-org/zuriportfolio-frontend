import React, { useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import RedirectModal from './RedirectModal';
import InputOTPModal from './InputOTPModal';

interface OTPModal {
  isOpen: boolean;
  onClose: () => void;
}

const AllOTPModal = ({ isOpen, onClose }: OTPModal) => {
  const [openOTP, setOpenOTP] = useState(false);

  useEffect(() => {
    setOpenOTP(false);
  }, []);
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm">
      {openOTP ? (
        <>
          <InputOTPModal onClose={onClose} />
        </>
      ) : (
        <>
          <RedirectModal setOpenOTP={() => setOpenOTP(true)} />
        </>
      )}
    </Modal>
  );
};

export default AllOTPModal;
