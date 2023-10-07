import React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import AllOTPModal from '../../components/Modals/OTPModals/AllOTPModal';

const ViewOTP = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        className="flex w-[360px] px-[24px] py-[16px] flex-col 
    justify-center items-center gap-[10px] rounded-[10px] bg-[#006F37] 
    text-[#FFF] text-center text-[16px] not-italic font-bold leading-[24px]"
        onClick={onOpen}
      >
        View OTP Modal
      </button>

      <AllOTPModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ViewOTP;
