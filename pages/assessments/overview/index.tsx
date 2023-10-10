import { useState } from 'react';

import MainLayout from '../../../components/Layout/MainLayout';
import { AssessmentBanner } from '../../../modules/assessment/component/banner';
import { OverviewItem } from '../../../modules/assessment/component/overviewItem';
import { ChangeAnswerModal } from '@modules/assessment/component/changeAnswerModal';
import { ConfirmSubmitModal } from '@modules/assessment/component/confirmSubmitModal';
import { SuccessFeedbackModal } from '@modules/assessment/component/successFeedbackModal';
import Button from '@ui/Button';
import { DATA, QuestionType } from '@modules/assessment/mock-data';

function AssessmentOverview() {
  const [questions, setQuestions] = useState(DATA.questions);

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType>();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessConfirm, setShowSuccessConfirm] = useState(false);

  const handleOnChangeClick = (question: QuestionType) => {
    setSelectedQuestion(question);
    setShow(true);
  };

  return (
    <MainLayout activePage="" showTopbar showFooter showDashboardSidebar={false}>
      {/* modals */}
      <ChangeAnswerModal
        questions={questions}
        setQuestions={setQuestions}
        showModal={show}
        setShowModal={setShow}
        selectedQuestion={selectedQuestion}
      />
      <ConfirmSubmitModal
        showModal={showConfirm}
        setShowModal={setShowConfirm}
        onConfirmFn={() => setShowSuccessConfirm(true)}
      />
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
            {questions.map((question, index) => (
              <OverviewItem
                onChangeFn={() => handleOnChangeClick(question)}
                questionNumber={`${index + 1}`}
                key={question.id}
                answer={question.selectedOption.answer}
                question={question.question}
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

export default AssessmentOverview;
