import { Dispatch, FC, SetStateAction, useState } from 'react';

import Modal from '@ui/Modal';
import { QuestionType } from '../mock-data';

export interface ChangeAnswerModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectedQuestion?: QuestionType;
  questions: {
    id: number;
    question: string;
    options: {
      id: number;
      answer: string;
    }[];
    selectedOption: {
      id: number;
      answer: string;
    };
  }[];
  setQuestions: Dispatch<
    SetStateAction<
      {
        id: number;
        question: string;
        options: {
          id: number;
          answer: string;
        }[];
        selectedOption: {
          id: number;
          answer: string;
        };
      }[]
    >
  >;
}

export const ChangeAnswerModal: FC<ChangeAnswerModalProps> = ({
  showModal,
  setShowModal,
  selectedQuestion,
  questions,
  setQuestions,
}) => {
  const newData = [...questions];
  function selectOption(questionId: number, optionId: number): void {

    const question = newData.find((q) => q.id === questionId);

    if (question) {
      const selectedOption = question.options.find((o) => o.id === optionId);

      if (selectedOption) {
        question.selectedOption = selectedOption;
        setQuestions(newData); // Update the state with the modified data
      }else  {
        console.error(`Option with ID ${optionId} not found for Question ${questionId}.`);
      }
    } else {
      console.error(`Question with ID ${questionId} not found.`);
    }
  }
  const handleChange = () => {
    setQuestions(newData)
    setShowModal(false);
  }

  return (
    <Modal isOpen={showModal} closeModal={() => setShowModal(false)} isCloseIconPresent={false}>
      {selectedQuestion && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-manropeL text-base text-[#2E3130]">{selectedQuestion.question}</p>

            <p className="font-manropeL text-sm text-[#004FC4]">Pick only one correct answer</p>
          </div>

          <div className="flex flex-col gap-5">
            <form className="flex gap-5 flex-col">
              {selectedQuestion?.options.map((item) => (
                <div key={item.id} className="flex items-center gap-5 w-full">
                  <input
                    type="radio"
                    id={`${item.id}`}
                    name="options"
                    value={item.answer}
                    className="w-6 h-6 accent-[#009254]"
                    checked={selectedQuestion.selectedOption.id === item.id}
                    onChange={() => selectOption(selectedQuestion.id, item.id)}
                  />
                  <label className="text-sm font-manropeL text-[#5B5F5E]  flex-1" htmlFor="option3">
                    {item.answer}
                  </label>
                </div>
              ))}
            </form>

            <div className="w-full flex justify-between items-center">
              <button
                onClick={() => setShowModal(false)}
                className="lg:px-[55px] md:px-[45px] px-[35px] py-[12px] border border-[#009444] rounded-xl bg-white text-[#009444] text-base"
              >
                Cancel
              </button>

              <button
                onClick={handleChange} 
                className="lg:px-[55phx] md:px-[45px] px-[35px] py-[12px] border border-[#009444] rounded-xl bg-[#009444] text-white-100 text-base">
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
