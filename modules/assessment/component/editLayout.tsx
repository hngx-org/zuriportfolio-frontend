import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
const EditLayout = () => {
  const { id } = useParams();
  const [mockArr, setMcokarr] = useState(new Array(5).fill(null));

  const handleDelete = (indexToDelete: number) => {
    const updatedArr = mockArr.filter((item, index) => index !== indexToDelete);
    setMcokarr(updatedArr);
  };

  const handleIncreaseLength = () => {
    if (mockArr.length > 0) {
      const lastElement = mockArr[mockArr.length - 1];
      const updatedArr = [...mockArr, lastElement];
      setMcokarr(updatedArr);
    }
  };
  return (
    <div className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left">
      <div className="font-semibold text-[20px] text-[#1A1C1B]">{`Question ${id}`}</div>
      <div className="flex items-center pt-4 gap-x-4">
        <Input
          className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          type="text"
          name="question"
          placeHolder=""
          intent={'default'}
          size={15}
        />
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.0204 25.94L28.3254 14.975C26.7354 11.255 23.8104 11.105 21.8454 14.645L19.0104 19.76C17.5704 22.355 14.8854 22.58 13.0254 20.255L12.6954 19.835C10.7604 17.405 8.03038 17.705 6.63538 20.48L4.05538 25.655C2.24038 29.255 4.86538 33.5 8.88538 33.5H28.0254C31.9254 33.5 34.5504 29.525 33.0204 25.94Z"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.9551 12.5C13.4404 12.5 15.4551 10.4853 15.4551 8C15.4551 5.51472 13.4404 3.5 10.9551 3.5C8.4698 3.5 6.45508 5.51472 6.45508 8C6.45508 10.4853 8.4698 12.5 10.9551 12.5Z"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className=" text-[20px] font-semibold pt-4 text-[#1A1C1B]">Answers</div>
      {mockArr.map((item, index) => {
        return (
          <div key={index} className="pt-4 flex flex-col gap-y-[10px]">
            <div className=" text-[18px] font-semibold  text-[#1A1C1B]">Option 1</div>
            <div className="flex items-center justify-between gap-x-2">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14.5" r="13.5" stroke="#009254" />
              </svg>
              <Input
                className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                type="text"
                name="opt-1"
                placeHolder=""
                intent={'default'}
                size={15}
              />
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  handleDelete(index);
                }}
                className="cursor-pointer"
              >
                <path
                  d="M13.9069 26.1667C20.3236 26.1667 25.5736 20.9167 25.5736 14.5C25.5736 8.08334 20.3236 2.83334 13.9069 2.83334C7.49023 2.83334 2.24023 8.08334 2.24023 14.5C2.24023 20.9167 7.49023 26.1667 13.9069 26.1667Z"
                  fill="#FF5C5C"
                  stroke="#464646"
                  stroke-width="1.5"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.24023 14.5H18.5736"
                  stroke="#464646"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
      <div className="pt-2">
        <Button
          rightIcon={<Add color="black" />}
          intent={'primary'}
          size={'md'}
          className="bg-[tansparent] text-dark-100 hover:text-dark-100 hover:bg-[transparent]"
        >
          Add Another Option
        </Button>
      </div>
      <div className=" text-[20px] font-semibold  text-[#1A1C1B] pt-3">Choose Correct Answer</div>
      <div className="pt-4 w-full ">
        <Select
          onValueChange={(value) => {
            console.log(value);
          }}
        >
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditLayout;
