import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import Modal from '@ui/Modal';
import Image, { StaticImageData } from 'next/image';

type Props = {
  score: string | null;
  badge: StaticImageData;
  badgeName: string;
};

function FeedbackModal({ isOpen, onClose, score, badge, badgeName }: { isOpen: boolean; onClose: () => void } & Props) {
  //State for handling the dropdown icon
  const [isDdOpen, setIsDdOpen] = useState(false);
  //State for handling selected value
  const [selectedValue, setSelectedValue] = useState('');

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
        <div className="bg-brand-green-focused text-white-100 flex justify-between items-center pl-7 pr-4 rounded-2xl text">
          <p className=" text-sm font-normal text-white-100">Download</p>
          <Select onOpenChange={() => setIsDdOpen(!isDdOpen)} onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger
              rightIcon={
                isDdOpen ? (
                  <ArrowUp2 />
                ) : selectedValue.length === 0 ? (
                  <ArrowDown2 />
                ) : (
                  <span className="text-white-100 lowercase">{selectedValue}</span>
                )
              }
              className={`outline-none border-none`}
            ></SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="JPG">JPG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Modal>
  );
}
export default FeedbackModal;
