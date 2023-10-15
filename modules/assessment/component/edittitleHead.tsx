import React, { useState, ChangeEvent } from 'react';
import { Edit } from 'iconsax-react';


type EditheadProps = {
   assessment: {
    title: string;
    createdAt: Date;
    duration_minutes: number;
    questions: {
        answers: {}[];
        question_no: number;
        question_text: string;
        question_type: string;
    }[];
    updatedAt: Date;
  }
  onInputChange?: (value: string) => void;
};


const Edithead: React.FC<EditheadProps> = ({ assessment, onInputChange }) => {
  console.log(assessment)

  const [disable, setDisable] = useState(true);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange && onInputChange(newValue);
  };



  return (
    <div className="border-[1px] border-[#DFE3E6] rounded-t-[20px]">
      <div className="bg-[#BF8443] p-2 rounded-t-[20px]"></div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-[20px]">
          <input
            type="text"
            id="input_assessment"
            className="outline-none border-none bg-transparent placeholder-black focus:placeholder-transparent focus:border-transparent focus:ring-transparent"
            placeholder={assessment.title}
            disabled={disable}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input_assessment">
            <Edit className="w-[25px] cursor-pointer" onClick={() => setDisable(false)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Edithead;
