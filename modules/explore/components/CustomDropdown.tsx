import { ArrowDown2, TickSquare } from 'iconsax-react';
import React, { useState } from 'react';

interface CustomDropdownProps {
  options: string[];
  selectedValue: string;
  onChange: (option: string) => void;
  className?: React.ComponentProps<'div'>['className'];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selectedValue, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full relative">
      <div
        className={`h-12 px-5 py-3 bg-white rounded-2xl border border-stone-300 justify-between items-center gap-2 flex cursor-pointer ${className} ${
          isOpen ? 'bg-white' : ''
        }`}
        onClick={toggleDropdown}
      >
        <div className="text-black text-[0.875rem] font-normal font-manropeEB leading-normal tracking-tight">
          {selectedValue || options[1]}
        </div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative">
            <ArrowDown2 color="#737373" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="list mt-2 bg-white border hover:bg-white-100 max-h-fit overflow-y-auto absolute z-20 w-full bg-white-100 rounded-xl">
          {options.map((option, index) => (
            <div
              key={index}
              className={`label px-4 py-2 cursor-pointer hover:bg-white-200 flex justify-between text-[#737373] font-manropeB ${
                option === selectedValue ? 'bg-[#F8ECE1]' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div>{option}</div>
              {option === selectedValue ? (
                <div>
                  <TickSquare color="#737373" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
