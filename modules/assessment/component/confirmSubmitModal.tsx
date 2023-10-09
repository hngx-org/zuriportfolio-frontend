import { Dispatch, FC, SetStateAction } from 'react';

import Modal from '@ui/Modal';

export interface ConfirmSubmitModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onConfirmFn: () => void;
}

export const ConfirmSubmitModal: FC<ConfirmSubmitModalProps> = ({ showModal, setShowModal, onConfirmFn }) => {
  const handleOnConfirm = () => {
    setShowModal(false);
    onConfirmFn();
  };

  return (
    <Modal isOpen={showModal} closeModal={() => setShowModal(false)} isCloseIconPresent={false}>
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <p className="text-[#191C1D] font-manropeL text-base font-semibold text-center">
          Are you certain you want to submit now?
        </p>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowModal(false)}
            className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009254] rounded-xl bg-[#F9F9F9] text-[#009254] text-base"
          >
            Hold on
          </button>

          <button
            onClick={handleOnConfirm}
            className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009254] rounded-xl bg-[#009254] text-white-100 text-base"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};
