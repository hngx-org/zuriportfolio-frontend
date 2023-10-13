import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '../../../../components/Layout/MainLayout';
import { Timer1 } from 'iconsax-react';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { DATA } from '@modules/assessment/mock-data';
import Link from 'next/link';
import Button from '@ui/Button';
import { CountdownTimer } from '@modules/assessment/CountdownTimer';
import { AssessmentQuestion, useGetAssessment, useStartAssessment } from '../../../../http/userTakingAssements';

type OptionType = {
  id: string;
  value: string;
};

const Questions: React.FC = () => {
  const { query } = useRouter();

  const assessment = useGetAssessment({ assessment_id: query?.id });

  const assessmentQuestions = useStartAssessment({ assessment_id: query?.id });
  const [questions, setQuestions] = useState<AssessmentQuestion[] | null>();
  const [selectedOption, setSelectedOption] = useState<OptionType>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: string) => {
    const data = {
      id: index,
      value: event.target.value,
    };

    console.log(data);

    setSelectedOption(data);
  };

  useEffect(() => {
    if (query?.id) {
      const data = {
        assessment_id: query?.id,
      };

      assessmentQuestions?.mutate(data, {
        onSuccess: (data) => {
          if (data[0].data.length > 0) {
            setQuestions(data[0].data);
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.id]);

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
        {questions && questions?.length > 0 && assessment?.data && (
          <>
            <AssessmentBanner
              title="Assessment test"
              subtitle="You are currently writing the  user persona quiz"
              bannerImageSrc="/assets/images/banner/assm_1.svg"
            />
            <div className="w-full md:max-w-xl max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
              <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary">
                <span className="text-white-100 text-2xl font-bold">
                  <CountdownTimer minutes={assessment?.data?.duration_minutes} seconds={0} />
                </span>
                <span>
                  <Timer1 color="#fff" />
                </span>
              </div>

              <ul className="overscroll md:max-w-xl max-w-xs flex flex-col  w-full gap-y-4 overflow-y-scroll max-h-screen h-full">
                {questions?.map((item, index) => (
                  <li
                    key={item.question_id}
                    className="w-full md:max-w-lg py-8 px-4 border border-slate-100 rounded-lg"
                  >
                    <h1 className="text-xl text-brand-green-primary text-center font-bold mb-4">
                      Question {index + 1} of {questions?.length}
                    </h1>

                    <p className="text-sm pl-4">{item.question_text}</p>

                    <span className="text-blue-100 text-xs pl-4 ">Pick only one correct answer</span>

                    <form className="mt-4 flex gap-4 flex-col">
                      {item.options.map((option, ind) => (
                        <div key={ind} className="flex items-center gap-5 ">
                          <input
                            id={`${item.question_id}-${option}`}
                            type="radio"
                            name="options"
                            value={option}
                            checked={`${item?.question_id}-${selectedOption?.value}` === `${ind}-${option}`}
                            onChange={(e) => handleChange(e, item.question_id)}
                          />
                          <label className="text-xs text-gray-700 " htmlFor={`${item.question_id}-${option}`}>
                            {option}
                          </label>
                        </div>
                      ))}
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
          </>
        )}
      </MainLayout>
    </>
  );
};
export default Questions;
