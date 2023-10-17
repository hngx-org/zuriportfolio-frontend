import { Dispatch, FC, SetStateAction, useState } from 'react';

import Modal from '@ui/Modal';
import { Question, QuestionArrays } from '../../../pages/assessments/overview';
import { fetchUserAssessmentSession, submitAssessment } from '../../../http/userTakenAssessment';

export interface ChangeAnswerModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  question?: Question;
  token: string | null;
  assessment_id: string | string[] | undefined;
  setResult: Dispatch<SetStateAction<QuestionArrays | undefined>>;
}

export const ChangeAnswerModal: FC<ChangeAnswerModalProps> = ({
  showModal,
  setShowModal,
  question,
  token,
  assessment_id,
  setResult,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(question?.user_selected_answer);
  const [isChanging, setIsChanging] = useState(false);

  const handleOnChange = async (question_id?: number, user_answer_id?: number, answer_text?: string) => {
    console.log(question_id, user_answer_id, answer_text);
    try {
      if (token && assessment_id && selectedOption && question_id && user_answer_id && answer_text) {
        setIsChanging(true);
        await submitAssessment({
          assessment_id: assessment_id,
          question_id,
          user_answer_id,
          answer_text,
          token,
        }).then((res) => {
          // after the user successfully submits we need to get the updated answers from the session endpoint before closing the modal. A loading indicator on the button would be ideal
          handleGetSession().then((res) => {
            setIsChanging(false);
            setShowModal(false);
          });
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const handleGetSession = async () => {
    try {
      const res = await fetchUserAssessmentSession(token as string, assessment_id as string);
      setResult(res);
    } catch (error) {
      console.log('catch error', error);
    }
  };

  return (
    <Modal isOpen={showModal} closeModal={() => setShowModal(false)} isCloseIconPresent={false}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-manropeL text-base text-[#2E3130]">{question?.question_text}</p>

          <p className="font-manropeL text-sm text-[#004FC4]">Pick only one correct answer</p>
        </div>

        <div className="flex flex-col gap-5">
          {question?.options.map((option: any, index: number) => (
            <div key={index} className="flex items-center gap-5 ">
              <input
                type="radio"
                id={`${option}`}
                name={question?.question_id.toString()}
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              <label className="text-xs text-gray-700 " htmlFor={`${option}`}>
                {option}
              </label>
            </div>
          ))}

          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => setShowModal(false)}
              className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009444] rounded-xl bg-white text-[#009444] text-base"
            >
              Cancel
            </button>

            <button
              onClick={() => handleOnChange(question?.question_id, question?.answer_id, selectedOption)}
              className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009444] rounded-xl bg-[#009444] text-white-100 text-base"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
