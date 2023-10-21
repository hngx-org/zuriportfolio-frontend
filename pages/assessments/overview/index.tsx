import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '../../../modules/assessment/component/banner';
import { OverviewItem } from '../../../modules/assessment/component/overviewItem';
import { ChangeAnswerModal } from '@modules/assessment/component/changeAnswerModal';
import { ConfirmSubmitModal } from '@modules/assessment/component/confirmSubmitModal';
import { SuccessFeedbackModal } from '@modules/assessment/component/successFeedbackModal';
import Button from '@ui/Button';
import { fetchUserAssessmentSession, submitFinalAssessment } from '../../../http/userTakenAssessment';
import { CountdownTimer } from '@modules/assessment/CountdownTimer';
import OutOfTime from '@modules/assessment/modals/OutOfTime';
import { TimerStart } from 'iconsax-react';
import { withUserAuth } from '../../../helpers/withAuth';
import Head from 'next/head';
import Loader from '@ui/Loader';

export interface Question {
  answer_id: number;
  options: string[];
  question_id: number;
  question_no: number;
  question_text: string;
  question_type: string;
  user_selected_answer: string;
}

export interface QuestionArrays {
  answered_questions: Question[];
  unanswered_questions: Question[];
}

function AssessmentOverview() {
  const tokenRef = useRef<string | null>(null);
  const minuteRef = useRef<string | null>(null);

  const [isTimeOut, setIsTimeOut] = React.useState<boolean>(false);

  const [result, setResult] = useState<QuestionArrays>();

  const router = useRouter();

  const { data } = router.query;

  const [minute, setMinute] = React.useState<number | null>(null);
  const [second, setSecond] = React.useState<number | null>(null);
  const [duration, setDuration] = React.useState<number | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessConfirm, setShowSuccessConfirm] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [badgeEarn, setBadgeEarn] = React.useState<string | null>(null);
  const [timeUp, setTimeUp] = React.useState<boolean>(false);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

  useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
    handleGetSession();
  }, []);

  useEffect(() => {
    if (timeUp || isSubmit) {
      localStorage.removeItem('minute');
      localStorage.removeItem('second');
    }
    if (timeUp) {
      setIsTimeOut(true);
    }
  }, [timeUp, isSubmit]);
  useEffect(() => {
    const setTimeFunction = () => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const minuteString = localStorage.getItem('minute');
        minuteRef.current = minuteString;
        const secondString = localStorage.getItem('second');
        const minuteInt = minuteString !== null ? parseInt(minuteString, 10) : null;
        const secondInt = secondString !== null ? parseInt(secondString, 10) : 0;
        setMinute(minuteInt);
        setSecond(secondInt);
      } else {
        throw new Error('localStorage is not available on the server-side.');
      }
    };
    setTimeFunction();
  }, [duration, minute, second]);

  const handleGetSession = async () => {
    const token = tokenRef.current;
    try {
      const res = await fetchUserAssessmentSession(token as string, data as string);
      setResult(res);
      if (!res) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      } else {
        setResult(res);
        setIsLoading(false);
      }
    } catch (error) {}
  };

  function sortQuestionsByQuestionNo(input: QuestionArrays | undefined): Question[] {
    if (!input) return [];
    // Concatenate the 'answered_questions' and 'unanswered_questions' arrays
    const allQuestions = input.answered_questions.concat(input.unanswered_questions);

    // Sort the combined array based on 'question_no'
    return allQuestions.sort((a, b) => a.question_no - b.question_no);
  }

  const handleOnSubmit = async () => {
    const token = tokenRef.current;
    const minute = minuteRef.current;

    try {
      if (token && minute) {
        await submitFinalAssessment({
          assessment_id: data,
          token,
          minutes: minute,
        }).then((res) => {
          setShowConfirm(false);
          setShowSuccessConfirm(true);
          setBadgeEarn(res?.badge_id);
          setIsSubmit(true);
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Assessment | Overview</title>
        <meta name="description" content="Zuri Portfolio Assessment Overview" />
        <link rel="icon" href="./public/assets/zuriLogo.svg" />
      </Head>
      {isTimeOut && (
        <OutOfTime
          onClose={() => router.push('/assessments/dashboard')}
          message="Your time has elapsed!"
          btn1={true}
          btn2={false}
        />
      )}
      <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
        {/* modals */}

        <ConfirmSubmitModal showModal={showConfirm} setShowModal={setShowConfirm} onConfirmFn={handleOnSubmit} />
        <SuccessFeedbackModal showModal={showSuccessConfirm} setShowModal={setShowSuccessConfirm} badgeID={badgeEarn} />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <main className="w-full">
            {/* top banner component */}
            <AssessmentBanner
              title="Assessment Overview"
              subtitle="An overview of all answers."
              bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
            />
            <div className="w-full md:max-w-full px-4 max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
              <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary mt-5">
                <p className="text-white-100 text-2xl font-bold">
                  {(minute !== null || undefined) && (second !== null || undefined) ? (
                    <CountdownTimer action={() => setTimeUp(true)} minutes={minute} seconds={second} />
                  ) : (
                    <span>- - : - -</span>
                  )}
                </p>
                <span>
                  <TimerStart color="#fff" />
                </span>
              </div>
            </div>
            <div className="w-full max-w-[1240px] mx-auto flex flex-col px-4">
              <div className="w-full py-6 md:py-9 lg:py-12 flex flex-col gap-6 md:gap-8 lg:gap-10">
                {sortQuestionsByQuestionNo(result)?.map((item) => (
                  <OverviewItem
                    key={item?.question_id}
                    data={item}
                    token={tokenRef?.current}
                    assessment_id={data}
                    setResult={setResult}
                  />
                ))}
              </div>

              <div className="w-full flex items-center justify-center py-14 md:py-16 lg:py-20">
                <Button onClick={() => setShowConfirm(true)} className="w-full max-w-[349px]" size="lg">
                  Submit
                </Button>
              </div>
            </div>
          </main>
        )}
      </MainLayout>
    </>
  );
}

export default withUserAuth(AssessmentOverview);
