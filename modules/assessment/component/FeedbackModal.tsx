import { SelectInput } from '@ui/Input';
import Modal from '@ui/Modal';
import Image, { StaticImageData } from 'next/image';

type Props = {
  score: string | null;
  badge: StaticImageData;
  badgeName: string;
};

function FeedbackModal({ isOpen, onClose, score, badge, badgeName }: { isOpen: boolean; onClose: () => void } & Props) {
  return (
    <Modal closeOnOverlayClick={true} isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm">
      <div className=" bg-white-100 px-4 py-7 sm:py-9 flex flex-col items-center justify-center gap-[25px] font-manropeB">
        <p className="font-bold text-2xl sm:text-[32px] text-brand-green-focused">Congratulations!</p>
        <Image src={badge} alt="badge" width={198} height={215} className="mb-[17px]" />
        <p className="font-semibold text-[28px]">
          {badgeName}
          <span className="text-4xl">✌️</span>
        </p>
        <p className="text-sm text-center block w-full sm:max-w-[399px] font-ppReg">
          You just unlocked the Expert Badge as you have scored {score} points or above by completing this assessment.
        </p>
        <div className="bg-brand-green-focused text-white-100 w-[163px] flex justify-between items-center pl-4 rounded-2xl text">
          <p className=" text-sm font-normal text-white-100">Download</p>
          <SelectInput
            inputSize={'md'}
            options={[
              { label: 'PDF', value: 'pdf' },
              { label: 'PNG', value: 'png' },
            ]}
            disabled={false}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            caretColor="#fff"
            className="outline-none border-none text-white-100"
            optionColor="text-black"
          />
        </div>
      </div>
    </Modal>
  );
}
export default FeedbackModal;
