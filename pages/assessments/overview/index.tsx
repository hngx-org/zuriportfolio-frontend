import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '../../../modules/assessment/component/banner';
import { OverviewItem } from '../../../modules/assessment/component/overviewItem';
import { ChangeAnswerModal } from '@modules/assessment/component/changeAnswerModal';
import { ConfirmSubmitModal } from '@modules/assessment/component/confirmSubmitModal';
import { SuccessFeedbackModal } from '@modules/assessment/component/successFeedbackModal';
import Button from '@ui/Button';
import { DATA, QuestionType } from '@modules/assessment/mock-data';
import { fetchUserAssessmentSession, submitFinalAssessment } from '../../../http/userTakenAssessment';
import withAuth from '../../../helpers/withAuth';

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

  const [result, setResult] = useState<QuestionArrays>();

  const router = useRouter();

  const { data } = router.query;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessConfirm, setShowSuccessConfirm] = useState(false);

  useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
    handleGetSession();
  }, []);

  const handleGetSession = async () => {
    const token = tokenRef.current;
    try {
      const res = await fetchUserAssessmentSession(token as string, data as string);
      setResult(res);
    } catch (error) {
      console.log('catch error', error);
    }
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

    try {
      if (token) {
        await submitFinalAssessment({
          assessment_id: data,
          token,
        }).then((res) => {
          setShowConfirm(false);
          setShowSuccessConfirm(true);
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      {/* modals */}

      <ConfirmSubmitModal showModal={showConfirm} setShowModal={setShowConfirm} onConfirmFn={handleOnSubmit} />
      <SuccessFeedbackModal showModal={showSuccessConfirm} setShowModal={setShowSuccessConfirm} />

      <main className="w-full">
        {/* top banner component */}
        <AssessmentBanner
          title="Assessment Overview"
          subtitle="An overview of all answers."
          bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
        />

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
    </MainLayout>
  );
}

export default withAuth(AssessmentOverview);
