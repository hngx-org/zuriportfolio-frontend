import React, { useState } from 'react';
import Button from '@ui/Button';
import Image from 'next/image';

interface ChangeAnswerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAnswer: string) => void;
  currentAnswer: string;
}

const ChangeAnswerModal: React.FC<ChangeAnswerProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAnswer,
}) => {
  const question = 'What is the primary goal of a "landing page" in digital marketing?';
  const options = ['To provide customer support', 'To showcase the company\'s history', 'To collect visitor information or encourage a specific action', 'To display a blog'];
  const questnumber = 2;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      onSave(selectedOption);
    }
    onClose();
  };

  return (
    <div className='w-[50%] m-auto items-center font-manropeB justify-center bg-white-100 rounded-[16px] p-4 gap-3 flex flex-col'>
      <div className="question justify-start text-left w-full text-[1.1em]  text-[#2E3130] items-start"> <span className="">{questnumber}.</span> {question}</div>
      <p className="text-[#004FC4] w-full justify-start items-start">Pick only one correct answer</p>
      {options.map((option) => (
        <div key={option} className=' text-[#5B5F5E] justify-end w-full text-[0.9em] items-start p-2 flex flex-col align-baseline'>
          <label className='cursor-pointer flex w-fit gap-2' onClick={() => handleOptionClick(option)}>
            <div className=" flex w-fit">
              <Image
                src={`${selectedOption === option ? '/assets/checkedradiocheckbox.svg' : '/assets/uncheckedradiocheckbox.svg'}`}
                alt={option}
                width={20}
                height={20}
              />
            </div>
            {option}
          </label>
        </div>
      ))}
      <div className="flex w-full justify-between gap-16">
        <button onClick={onClose} className=' rounded-[16px] py-2 items-center justify-center  bg-white-100 w-[20%] flex text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled border-solid border-[1px] px-8 border-brand-green-primary'>Cancel</button>
        <button onClick={handleSave} className=' rounded-[16px] py-2 text-white-100 items-center justify-center  bg-brand-green-primary w-[20%] flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed px-8 '>Change</button>
      </div>
    </div>
  );
};

export default ChangeAnswerModal;
