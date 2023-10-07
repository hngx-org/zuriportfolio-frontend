import React from 'react';
import Button from '@ui/Button';
type questionTypes = {
  questNo: number;
  question: string;
};
const PreviewQuests = (props: questionTypes) => {
  const { questNo, question } = props;
  return (
    <div className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left">
      <div className=" text-[20px] text-[#009254]">{`Question ${questNo} out of 10`}</div>
      <span className="absolute top-2 right-10 cursor-pointer">Edit</span>
      <div className="pt-4 text-[14px]">{question}</div>
      <p className=" text-blue-100 pt-2">Pick only one correct answer</p>
      <div className="pt-10 flex flex-col gap-3">
        <label className="inline-flex items-center gap-3" htmlFor="opt1">
          <input type="radio" className="form-radio  h-5 w-5 ring-green-500 border-green-500" name="radio" id="opt1" />
          <span className="ml-2 text-[#5B5F5E]">To provide customer support</span>
        </label>
        <label className="inline-flex items-center gap-3" htmlFor="opt-2">
          <input type="radio" className="form-radio  h-5 w-5 ring-green-500 border-green-500" name="radio" id="opt-2" />
          <span className="ml-2 text-[#5B5F5E]">To showcase the company&apos;s history</span>
        </label>
        <label className="inline-flex items-center gap-3" htmlFor="opt-3">
          <input type="radio" className="form-radio  h-5 w-5 ring-green-500 border-green-500" name="radio" id="opt-3" />

          <span className="ml-2 text-[#5B5F5E]">To collect visitor information or encourage a specific action</span>
        </label>
        <label className="inline-flex items-center gap-3" htmlFor="opt-l">
          <input type="radio" id="opt-l" className="form-radio  h-5 w-5 ring-green-500 border-green-500" name="radio" />
          <span className="ml-2 text-[#5B5F5E]">To display a blog</span>
        </label>
      </div>
      <div className="flex justify-center items-center gap-[10px] pt-3">
        <Button className="p-4 border-2 border-white-100 text-green-500 text-center  bg-white-100 hover:text-white-100 text-sm">
          End Assessmnet
        </Button>
        <button className="py-[5px] px-[30px] w-[150px] text-white-100 text-center bg-green-500 rounded-xl ">
          Next
        </button>
      </div>
    </div>
  );
};

export default PreviewQuests;
