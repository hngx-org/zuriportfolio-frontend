import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Image from 'next/image';
import badge from "../../public/assets/images/CATAYST.png";
import peaceIcon from "../../public/assets/images/peace-icon.png";
import { Select, SelectContent, SelectItem, SelectTrigger } from '@ui/SelectInput';

function BadgeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  const [isShown, setIsShown] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [selection, setSelection] = useState<null | string>(null);

  const toggleSelection = () => {
    setIsShown((prev) => !prev);
  };

  const handleSelect = (event: React.MouseEvent) => {
    setHasSelected(true);
    setIsShown(prev => !prev);
    setSelection(event.currentTarget.textContent);
  }

  return (
    <Modal isOpen={isOpen} closeModal={onClose} closeOnOverlayClick isCloseIconPresent={false}>

        <div className="bg-white rounded-lg pt-[110px] min-h-auto mx-auto flex flex-col gap-[22px] items-center">
          <h4 className="text-green-600 font-manropeB text-[32px] ">Congratulations!</h4>

          <Image src={badge} alt="user badge" className="w-40" priority />

          <div className="flex gap-2 items-center">
            <h4 className="font-manropeB text-[28px] text-xl">Expert Badge</h4>
            <Image src={peaceIcon} alt="Peace icon" className='w-[43px] h-[43px]' />
          </div>
          <p className="font-manrope text-[14px] text-center w-[288px] md:w-[399px]">
            You just unlocked the Expert Badge as you have scored 90 points or
            above by completing this assessment.
          </p>
          
          <Select>
            <SelectTrigger className='relative z-50 min-w-[8rem] overflow-hidden rounded-md w-[120px] bg-green-400 font-manropeB text-[14px] text-white-100 relative z-50 border-none'>
              <span>Download</span>
            </SelectTrigger>
            <SelectContent className='bg-green-400 border-none'>
              <SelectItem value='pdf' onClick={handleSelect}>PDF</SelectItem>
              <SelectItem value='jpg' onClick={handleSelect}>JPG</SelectItem>
              <SelectItem value='png' onClick={handleSelect}>PNG</SelectItem>
            </SelectContent>
          </Select>
        </div> 
    </Modal>
  );
}

export default BadgeModal;