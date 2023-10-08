import React, { useState } from 'react';
import Button from '@ui/Button';
import Link from 'next/link';
import { questionArr } from './questionsArr';
type questionTypes = {
  questNo: number;
  question: string;
};
const PreviewQuests = (props: questionTypes) => {
  const { questNo, question } = props;
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () => {
    setCurrentSection((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentSection((prevStep) => prevStep - 1);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-y-3 items-center">
        {/* mapping Datas */}
        {questionArr.map((items, index) => {
          return (
            <div
              key={index}
              className={`w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left ${
                index === currentSection ? '' : 'hidden'
              }`}
            >
              <div className=" text-[20px] text-[#009254]">{`Question ${items.id} out of 10`}</div>
              <Link href={`/assessment/preview-edit/${items.id}`} className="absolute top-2 right-10 cursor-pointer">
                Edit
              </Link>

              <div className="pt-4 text-[14px]">{items.question}</div>
              <p className=" text-blue-100 pt-2">{items.tip}</p>

              <div className="pt-10 flex flex-col gap-3">
                <label className="inline-flex items-center gap-3" htmlFor={items.click}>
                  <input
                    type="radio"
                    className="form-radio  h-5 w-5 ring-green-500 border-green-500"
                    name="radio"
                    id={items.click}
                  />
                  <span className="ml-2 text-[#5B5F5E]">{items.options[0]}</span>
                </label>
                <label className="inline-flex items-center gap-3" htmlFor="opt-2">
                  <input
                    type="radio"
                    className="form-radio  h-5 w-5 ring-green-500 border-green-500"
                    name="radio"
                    id="opt-2"
                  />
                  <span className="ml-2 text-[#5B5F5E]">{items.options[1]}</span>
                </label>
                <label className="inline-flex items-center gap-3" htmlFor="opt-3">
                  <input
                    type="radio"
                    className="form-radio  h-5 w-5 ring-green-500 border-green-500"
                    name="radio"
                    id="opt-3"
                  />
                  <span className="ml-2 text-[#5B5F5E]">{items.options[2]}</span>
                </label>
                <label className="inline-flex items-center gap-3" htmlFor="opt-l">
                  <input
                    type="radio"
                    id="opt-l"
                    className="form-radio  h-5 w-5 ring-green-500 border-green-500"
                    name="radio"
                  />
                  <span className="ml-2 text-[#5B5F5E]">{items.options[3]}</span>
                </label>
              </div>
              <div className="flex justify-center items-center gap-[10px] pt-3">
                {items.id < 2 ? null : (
                  <Button
                    className="p-4 border-2 border-white-100 text-green-500 text-center  bg-white-100 hover:text-white-100 text-sm"
                    onClick={handlePrev}
                  >
                    End Assessmnet
                  </Button>
                )}

                {items.id < 10 ? (
                  <button
                    onClick={handleNext}
                    className="py-[5px] px-[30px] w-[150px] text-white-100 text-center bg-green-500 rounded-xl "
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left">
        <div className=" text-[20px] text-[#009254]">{`Question ${questNo} out of 10`}</div>
        <span className="absolute top-2 right-10 cursor-pointer">Edit</span>
        <div className="pt-4 text-[14px]">{question}</div>
        <p className=" text-blue-100 pt-2">Pick only one correct answer</p>
        <div className="pt-10 flex flex-col gap-3">
          <label className="inline-flex items-center gap-3" htmlFor="opt1">
            <input
              type="radio"
              className="form-radio  h-5 w-5 ring-green-500 border-green-500"
              name="radio"
              id="opt1"
            />
            <span className="ml-2 text-[#5B5F5E]">To provide customer support</span>
          </label>
          <label className="inline-flex items-center gap-3" htmlFor="opt-2">
            <input
              type="radio"
              className="form-radio  h-5 w-5 ring-green-500 border-green-500"
              name="radio"
              id="opt-2"
            />
            <span className="ml-2 text-[#5B5F5E]">To showcase the company&apos;s history</span>
          </label>
          <label className="inline-flex items-center gap-3" htmlFor="opt-3">
            <input
              type="radio"
              className="form-radio  h-5 w-5 ring-green-500 border-green-500"
              name="radio"
              id="opt-3"
            />
            <span className="ml-2 text-[#5B5F5E]">To collect visitor information or encourage a specific action</span>
          </label>
          <label className="inline-flex items-center gap-3" htmlFor="opt-l">
            <input
              type="radio"
              id="opt-l"
              className="form-radio  h-5 w-5 ring-green-500 border-green-500"
              name="radio"
            />
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
      </div> */}
    </React.Fragment>
  );
};

export default PreviewQuests;
