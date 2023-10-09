import React, { useState } from 'react';
import Head from 'next/head';
import MainLayout from '../../../../components/Layout/MainLayout';
import { Timer1 } from 'iconsax-react';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { DATA } from '@modules/assessment/mock-data';
import Link from 'next/link';
import Button from '@ui/Button';

const Questions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Head>
        <style>
          {`
        
        .overscroll::-webkit-scrollbar{
          width: 7px;
          height: 10px;
          background: #eee;
      }
      .overscroll::-webkit-scrollbar-thumb{
          background: #009254;
          border-radius: 5px;
      }
        `}
        </style>
      </Head>
      <MainLayout activePage={'questions'} showTopbar showFooter showDashboardSidebar={false}>
        <AssessmentBanner
          title="Assessment test"
          subtitle="You are currently writing the  user persona quiz"
          bannerImageSrc="/assets/images/banner/assm_1.svg"
        />
        <div className="w-full md:max-w-xl max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
          <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary">
            <span className="text-white-100 text-2xl font-bold">05:00</span>
            <span>
              <Timer1 color="#fff" />
            </span>
          </div>
          <ul className="overscroll md:max-w-xl max-w-xs flex flex-col  w-full gap-y-4 overflow-y-scroll max-h-screen h-full">
            {DATA.questions.map((question, index) => (
              <li key={index} className="w-full md:max-w-lg py-8 px-4 border border-slate-100 rounded-lg">
                <h1 className="text-xl text-brand-green-primary text-center font-bold mb-4">
                  Question {DATA.questions.indexOf(question) + 1} of {DATA.questions.length}
                </h1>
                <p className="text-sm pl-4">{question.question}</p>
                <span className="text-blue-100 text-xs pl-4 ">Pick only one correct answer</span>
                <form className="mt-4 flex gap-4 flex-col">
                  <div className="flex items-center gap-5 ">
                    <input
                      type="radio"
                      name="options"
                      value={question.options[0].answer}
                      checked={selectedOption === question.options[0].answer}
                      onChange={handleChange}
                    />
                    <label className="text-xs text-gray-700 " htmlFor="option1">
                      {question.question}
                    </label>
                  </div>

                  <div className="flex items-center gap-5 ">
                    <input
                      type="radio"
                      name="options"
                      value={question.options[1].answer}
                      checked={selectedOption === question.options[1].answer}
                      onChange={handleChange}
                    />
                    <label className="text-xs text-gray-700 " htmlFor="option1">
                      {question.question}
                    </label>
                  </div>
                  <div className="flex items-center gap-5 ">
                    <input
                      type="radio"
                      name="options"
                      value={question.options[2].answer}
                      checked={selectedOption === question.options[2].answer}
                      onChange={handleChange}
                    />
                    <label className="text-xs text-gray-700 " htmlFor="option1">
                      {question.question}
                    </label>
                  </div>
                  <div className="flex items-center gap-5 ">
                    <input
                      type="radio"
                      name="options"
                      value={question.options[3].answer}
                      checked={selectedOption === question.options[3].answer}
                      onChange={handleChange}
                    />
                    <label className="text-xs text-gray-700 " htmlFor="option1">
                      {question.question}
                    </label>
                  </div>
                </form>
              </li>
            ))}
          </ul>
          <Link href="/assessments/overview">
            <Button
              intent={'primary'}
              size={'md'}
              isLoading={false}
              spinnerColor="#000"
              className="px-5 py-0 md:py-2 md:px-10 text-sm md:text-base font-manropeL"
            >
              Submit
            </Button>
          </Link>
        </div>
      </MainLayout>
    </>
  );
};
export default Questions;
