'use client';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import MainLayout from '../../../../components/Layout/MainLayout';
import { TimerStart } from 'iconsax-react';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Link from 'next/link';
import Button from '@ui/Button';
import { CountdownTimer } from '@modules/assessment/CountdownTimer';
import OutOfTime from '@modules/assessment/modals/OutOfTime';
import { useRouter } from 'next/router';
import { fetchUserTakenAssessment, getAssessmentDetails, submitAssessment } from '../../../../http/userTakenAssessment';

type AssessmentDetails = {
  id?: string;
  assessment_id: number;
  skill_id: number;
  title?: string;
  description: string;
  duration_minutes: number;
  status: string;
  start_date: Date;
  end_date: Date;
};

const Questions: React.FC = () => {
  const [isTimeOut, setIsTimeOut] = React.useState<boolean>(false);
  const router = useRouter();
  const [storedAssessment, setStoredAssessment] = React.useState<any>([]);
  const [result, setResult] = React.useState<AssessmentDetails>();
  const tokenRef = useRef<string | null>(null);
  const [minute, setMinute] = React.useState<number | null>(null);
  const [second, setSecond] = React.useState<number | null>(null);
  const [duration, setDuration] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
    handleGetStarted();
  }, []);

  useEffect(() => {
    const setTimeFunction = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const minuteString = localStorage.getItem('minute');
        const secondString = localStorage.getItem('second');
        const minuteInt = minuteString !== null ? parseInt(minuteString, 10) : duration;
        const secondInt = secondString !== null ? parseInt(secondString, 10) : 0;
        setMinute(minuteInt);
        setSecond(secondInt);
        console.log(minuteString, secondString);
        console.log('donezo', minute, second, duration);
      } else {
        throw new Error('localStorage is not available on the server-side.');
      }
    };
    setTimeFunction();
  }, [duration, minute, second]);

  const handleGetStarted = async () => {
    const token = tokenRef.current;
    const data = router.query?.data;
    const id = router.query?.id;

    console.log('1', token, data, id);
    try {
      const assessmentsData = await getAssessmentDetails(token as string, data as string);
      const questionData = await fetchUserTakenAssessment(token as string, id as string);
      if (!questionData || !assessmentsData) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }
      setResult(assessmentsData);
      setStoredAssessment(questionData.data.questions);
      setDuration(assessmentsData?.duration_minutes);
      setIsLoading(false);
      console.log('2', assessmentsData);
      console.log('3', questionData.questions);
    } catch (error) {
      console.log('catch error', error);
    }
  };

  const handleUserAnswerClick = async (question_id: number, user_answer_id: number, answer_text: string) => {
    const token = tokenRef.current;
    console.log(question_id, user_answer_id, answer_text, result?.assessment_id);
    try {
      if (token && result?.assessment_id) {
        await submitAssessment({
          assessment_id: result.assessment_id,
          question_id,
          user_answer_id,
          answer_text,
          token,
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <>
      {isTimeOut && (
        <OutOfTime
          onClose={() => router.push('/assessments/dashboard')}
          onRetake={() => {
            router.push('/assessments/take-test/intro');
          }}
        />
      )}
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
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-brand-green-pressed h-16 w-16"></div>
          </div>
        ) : (
          <>
            <AssessmentBanner
              title="Assessment test"
              subtitle="You are currently writing the  user persona quiz"
              bannerImageSrc="/assets/images/banner/assm_1.svg"
            />
            <div className="w-full md:max-w-xl max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
              <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary">
                <span className="text-white-100 text-2xl font-bold">
                  {minute !== null && second !== null ? (
                    <CountdownTimer action={() => setIsTimeOut(true)} minutes={minute} seconds={second} />
                  ) : (
                    '--:--'
                  )}
                </span>
                <span>
                  <TimerStart color="#fff" />
                </span>
              </div>
              <form action="#">
                <ul className="overscroll md:max-w-xl max-w-xs flex flex-col  w-full gap-y-4 overflow-y-scroll max-h-screen h-full mb-4">
                  {storedAssessment.map((question: any, index: number) => (
                    <li key={index} className="w-full md:max-w-lg py-8 px-4 border border-slate-100 rounded-lg">
                      <h1 className="text-xl text-brand-green-primary text-center font-bold mb-4">
                        Question {storedAssessment.indexOf(question) + 1} of {storedAssessment?.length}
                      </h1>
                      <p className="text-sm pl-4">{question[index]?.question_id}</p>
                      <span className="text-blue-100 text-xs pl-4 ">{question.question_text}</span>
                      <div className="mt-4 flex gap-4 flex-col">
                        {question.options.map((option: any, index: number) => (
                          <div key={index} className="flex items-center gap-5 ">
                            <input
                              type="radio"
                              id={`${option[index]}`}
                              name={question.question_id}
                              value={option[index]}
                              onClick={() => handleUserAnswerClick(question.question_id, question.answer_id, option)}
                            />
                            <label className="text-xs text-gray-700 " htmlFor={`${option}`}>
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href={`/assessments/overview?data=${result?.assessment_id}`}>
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
              </form>
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};
export default Questions;
