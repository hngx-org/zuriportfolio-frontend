'use client';
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import MainLayout from '../../../../components/Layout/MainLayout';
import { TimerStart } from 'iconsax-react';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import Button from '@ui/Button';
import { CountdownTimer } from '@modules/assessment/CountdownTimer';
import OutOfTime from '@modules/assessment/modals/OutOfTime';
import { useRouter } from 'next/router';
import { withUserAuth } from '../../../../helpers/withAuth';
import Loader from '@ui/Loader';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  fetchUserTakenAssessment,
  getAssessmentDetails,
  submitAssessment,
  fetchUserAssessmentSession,
} from '../../../../http/userTakenAssessment';
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

interface Question {
  answer_id: number;
  options: string[];
  question_id: number;
  question_no: number;
  question_text: string;
  question_type: string;
  user_selected_answer: string;
}

interface QuestionArrays {
  answered_questions: Question[];
  unanswered_questions: Question[];
}

const Questions: React.FC = () => {
  const [isTimeOut, setIsTimeOut] = React.useState<boolean>(false);
  const router = useRouter();
  const tokenRef = useRef<string | null>(null);
  const [minute, setMinute] = React.useState<number | null>(null);
  const [second, setSecond] = React.useState<number | null>(null);
  const [duration, setDuration] = React.useState<number | null>(null);
  const queryClient = useQueryClient();
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [storedAssessment, setStoredAssessment] = React.useState<Question[]>([]);
  const [assessmentData, setAssessmentData] = React.useState<AssessmentDetails>();

  React.useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
  }, []);

  const {
    isLoading: newIsLoading,
    isError: newIsError,
    error: newError,
    data: newQuestions,
  } = useQuery(
    ['questionData'],
    () => fetchUserTakenAssessment(tokenRef.current as string, router.query?.data as string),
    { notifyOnChangeProps: ['data', 'error'] },
  );

  const { data: assessment } = useQuery(
    ['assessment'],
    () => getAssessmentDetails(tokenRef.current as string, router.query?.data as string),
    { notifyOnChangeProps: ['data', 'error'] },
  );

  const submitAnswer = useMutation((data: any) => submitAssessment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['questionData']);
    },
    onError: (error) => {
      console.error('Error submitting assessment:', error);
    },
  });

  const {
    data: session,
    isLoading: sessionLoading,
    isError: sessionIsErrorr,
    error: sessionError,
  } = useQuery(['session'], () => fetchUserAssessmentSession(tokenRef.current as string));

  function sortQuestionsByQuestionNo(input: QuestionArrays | undefined): Question[] {
    if (!input) return [];
    // Concatenate the 'answered_questions' and 'unanswered_questions' arrays
    const allQuestions = input.answered_questions?.concat(input.unanswered_questions);

    // Sort the combined array based on 'question_no'
    return allQuestions?.sort((a, b) => a.question_no - b.question_no);
  }
  const handleUserAnswerClick = async (question_id: number, user_answer_id: number, answer_text: string) => {
    const token = tokenRef.current;
    try {
      if (token && assessmentData?.assessment_id) {
        await submitAnswer.mutateAsync({
          assessment_id: assessmentData.assessment_id,
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

  useEffect(() => {
    if (!sessionLoading && !sessionIsErrorr && session?.length !== 0 && !sessionError) {
      const assessmentData = sortQuestionsByQuestionNo(session);
      if (
        session.data?.questions?.length === 0 ||        
        session?.data?.length <= 1 ||
        session?.data?.questions === undefined
      ) {
        setStoredAssessment(newQuestions?.data?.questions);
      } else {
        setStoredAssessment(assessmentData);
      }
      setIsLoading(sessionLoading);
      setIsError(false);
    } else if (!newIsLoading && !newIsError && newQuestions?.data?.questions?.length !== 0 && !newError) {
      setStoredAssessment(newQuestions?.data?.questions);
      setIsLoading(newIsLoading);
      setIsError(newIsError);
    } else {
      setIsError(true);
    }
    setAssessmentData(assessment?.data);
    setDuration(assessmentData?.duration_minutes as number);
    console.log(newIsLoading, newIsError, newQuestions?.data?.questions, newError);
    console.log(sessionLoading, sessionIsErrorr, session, sessionError);
    console.log(assessmentData);
    console.log('stored', storedAssessment);
  }, [
    newQuestions?.data,
    newIsLoading,
    newIsError,
    assessment,
    sessionLoading,
    sessionIsErrorr,
    session,
    sessionError,
    newError,
    assessmentData?.duration_minutes,
    assessmentData,
    storedAssessment,
  ]);
  useEffect(() => {
    const setTimeFunction = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const minuteString = localStorage.getItem('minute');
        const secondString = localStorage.getItem('second');
        const minuteInt = minuteString !== null ? parseInt(minuteString, 10) : duration as number;
        const secondInt = secondString !== null ? parseInt(secondString, 10) : 0;
        setMinute(minuteInt);
        setSecond(secondInt);
        console.log(minuteInt, secondInt);
        console.log(minuteString, secondString);
        console.log('donezo', minute, second, duration);
      } else {
        throw new Error('localStorage is not available on the server-side.');
      }
    };
    const setItemWithExpiry = (key: string, value: any, ttl: number) => {
      const now = new Date();
      const item = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      localStorage.setItem(key, JSON.stringify(item));
    };
    const getItemWithExpiry = (key: string) => {
      const itemStr = localStorage.getItem(key);
      const now = new Date();
      const item = JSON.parse(itemStr as string);
      if (itemStr) {
        if (now.getTime() > item.expiry) {
          console.log('first', now.getTime(), item.expiry);
          localStorage.removeItem('minute');
          localStorage.removeItem('second');
          setItemWithExpiry('duration', duration, 1000 * 60 * 30);
          setTimeFunction();
          return null;
        } else {
          console.log('second');
          setTimeFunction();
        }
        return item.value;
      } else {
        setItemWithExpiry('duration', duration, 1000 * 60 * 10);
        setTimeFunction();
      }
    };
    getItemWithExpiry('duration');
  }, [duration, minute, second]);

  if (newIsError) {
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
          <title>Assessment | Questions</title>
          <meta name="description" content="Zuri Portfolio Assessment Question Page" />
          <link rel="icon" href="/assets/zuriLogo.svg" />
        </Head>
        <MainLayout activePage={'questions'} showTopbar showFooter showDashboardSidebar={false}>
          <AssessmentBanner
            title="Assessment test"
            subtitle="Something went wrong while trying to get your assessment"
            bannerImageSrc="/assets/images/banner/assm_1.svg"
          />
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-7xl font-extrabold text-brand-green-primary text-center">OOPS!</h1>
              <h1 className="text-2xl text-brand-green-primary text-center font-bold mb-4">something went wrong</h1>
            </div>
          </div>
        </MainLayout>
      </>
    );
  } else {
    const pageTitle = `${assessmentData?.title}`;
    const metaDescription = `${assessmentData?.description}`;

    return (
      <>
        {isTimeOut && (
          <OutOfTime
            onClose={() => router.push('/assessments/dashboard')}
            onRetake={() => {
              router.push(`/assessments/take-test/intro?data=${assessmentData?.assessment_id}`);
            }}
            message="You’ve run out of time!"
            btn1={true}
            btn2={true}
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
          <link rel="icon" href="/assets/zuriLogo.svg" />
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription} />
        </Head>
        <MainLayout activePage={'questions'} showTopbar showFooter showDashboardSidebar={false}>
          {newIsLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Loader />
            </div>
          ) : (
            <>
              <AssessmentBanner
                title="Assessment test"
                subtitle={`You are currently writing the ${assessmentData?.title} quiz`}
                bannerImageSrc="/assets/images/banner/assm_1.svg"
              />
              <div className="w-full md:max-w-xl max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
                <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary">
                  <span className="text-white-100 text-2xl font-bold">
                    {minute !== null && minute !== undefined && second !== null && second !== undefined ? (
                      <CountdownTimer action={() => setIsTimeOut(true)} minutes={minute} seconds={second} />
                    ) : (
                      <span>- - : - -</span>
                    )}
                  </span>
                  <span>
                    <TimerStart color="#fff" />
                  </span>
                </div>
                <form action="#">
                  <ul className="overscroll md:max-w-xl max-w-xs flex flex-col  w-full gap-y-4 overflow-y-scroll max-h-screen h-full mb-4">
                    {storedAssessment?.map((question: any, index: number) => (
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
                                id={`${option}`}
                                name={question.question_id}
                                value={option[index]}
                                checked={question.user_selected_answer === option ? true : undefined}
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
                  <div className="mt-5">
                    <Button
                      intent={'primary'}
                      size={'md'}
                      href={`/assessments/overview?data=${assessmentData?.assessment_id}`}
                      isLoading={false}
                      spinnerColor="#000"
                      className="px-5 py-0 md:py-2 md:px-10 text-sm md:text-base font-manropeL"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </MainLayout>
      </>
    );
  }
};
export default withUserAuth(Questions);
