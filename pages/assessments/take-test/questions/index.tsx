import React, { useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../../../../components/Layout/MainLayout';
import { TimerStart } from 'iconsax-react';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { DATA } from '@modules/assessment/mock-data';
import Link from 'next/link';
import Button from '@ui/Button';
import { CountdownTimer } from '@modules/assessment/CountdownTimer';
import OutOfTime from '@modules/assessment/modals/OutOfTime';
import { useRouter } from 'next/router';

const Questions: React.FC = () => {
  const [isTimeOut, setIsTimeOut] = React.useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const router = useRouter();
  useEffect(() => {
    const assessmentData = localStorage.getItem('assessmentData')
    const storedAssessmentData = assessmentData ? JSON.parse(assessmentData) : null
  
    // console.log('Hellllooooooooooo>>>>>>>>>>>>>>>>>>>',storedAssessmentData)
    if(assessmentData){
      console.log('data message', assessmentData)
      setSelectedAnswers(assessmentData)
      // console.log('first data',data[0]?.message)
    }
  },[])
  // console.log('questions', data[0])

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answer
    }))
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
        <AssessmentBanner
          title="Assessment test"
          subtitle="You are currently writing the  user persona quiz"
          bannerImageSrc="/assets/images/banner/assm_1.svg"
        />
        <div className="w-full md:max-w-xl max-w-xs mt-8 mb-16 mx-auto font-manropeL flex flex-col items-stretch justify-between gap-y-8">
          <div className="w-full lg:max-w-lg md:max-w-full sm:mx-w-xs rounded-lg flex  items-center justify-between  py-4 px-8 bg-brand-green-primary">
            <span className="text-white-100 text-2xl font-bold">
              <CountdownTimer action={() => setIsTimeOut(true)} minutes={2} seconds={0} />
            </span>
            <span>
              <TimerStart color="#fff" />
            </span>
          </div>
          <form action="#">
            <ul className="overscroll md:max-w-xl max-w-xs flex flex-col  w-full gap-y-4 overflow-y-scroll max-h-screen h-full">
              {assessmentData.map((question, index) => (
                <li key={index} className="w-full md:max-w-lg py-8 px-4 border border-slate-100 rounded-lg">
                  <h1 className="text-xl text-brand-green-primary text-center font-bold mb-4">
                    Question {DATA.questions.indexOf(question) + 1} of {DATA.questions.length}
                  </h1>
                  <p className="text-sm pl-4">{question.question}</p>
                  <span className="text-blue-100 text-xs pl-4 ">Pick only one correct answer</span>
                  <div className="mt-4 flex gap-4 flex-col">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-5 ">
                        <input type="radio" 
                          id={`${option.answer}`} 
                          name={question.question} 
                          value={option.answer} 
                          onClick={() => handleAnswerSelect(question.id, option.answer)}
                        />
                        <label className="text-xs text-gray-700 " htmlFor={`${option.answer}`}>
                          {option.answer}
                        </label>
                      </div>
                    ))}
                  </div>
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
          </form>
        </div>
      </MainLayout>
    </>
  );
};
export default Questions;
