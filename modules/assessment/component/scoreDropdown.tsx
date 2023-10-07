import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

interface ScoreDropdownProps {
  item: string; // Specify the type for the 'item' prop
}

const ScoreDropdown = (props: { item: string }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation(); // Prevent click event propagation
    handleModalToggle();
  };

  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeModal();
        }
      };

      window.addEventListener('click', handleOutsideClick);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center mt-4 w-full">
      <p className="sm:w-[112px] text-base font-manropeL mb-1">{props.item}</p>
      <div className="flex gap-5">
        <div className="relative border border-[#BFC8CC] border-solid rounded-xl flex items-center pl-[79px] pr-[16px] py-1">
          <input type="text" name="score" id="score" value={selectedOption} className="outline-none w-full" readOnly />
          <Image
            src="/assets/arrow-down.svg"
            alt="arrow down icon"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleIconClick}
          />
          {isOpen && (
            <div
              ref={modalRef}
              className="overflow-hidden text-[10px] z-50 absolute right-0 bottom-[-112px] w-[74px] h-28 flex justify-evenly flex-col items-center rounded-lg bg-[#F9F9F9] border border-solid border-[#A8ACAB]"
            >
              <div
                className={`hover:bg-[#CAEAD4] cursor-pointer h-full w-full flex justify-center items-center ${
                  selectedOption === '0% - 49%' ? 'bg-[#CAEAD4]' : ''
                }`}
                onClick={() => handleOptionSelect('0% - 49%')}
              >
                0% - 49%
              </div>
              <div
                className={`hover:bg-[#CAEAD4] cursor-pointer h-full w-full flex justify-center items-center ${
                  selectedOption === '50% - 79%' ? 'bg-[#CAEAD4]' : ''
                }`}
                onClick={() => handleOptionSelect('50% - 79%')}
              >
                50% - 79%
              </div>
              <div
                className={`hover.bg-[#CAEAD4] cursor-pointer h-full w-full flex justify-center items-center ${
                  selectedOption === '80% - 100%' ? 'bg-[#CAEAD4]' : ''
                }`}
                onClick={() => handleOptionSelect('80% - 100%')}
              >
                80% - 100%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreDropdown;
