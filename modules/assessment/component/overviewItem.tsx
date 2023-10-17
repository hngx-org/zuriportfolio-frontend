import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Question, QuestionArrays } from '../../../pages/assessments/overview';
import { ChangeAnswerModal } from '@modules/assessment/component/changeAnswerModal';

export interface OverviewItemProps {
  data?: Question;
  token: string | null;
  assessment_id: string | string[] | undefined;
  setResult: Dispatch<SetStateAction<QuestionArrays | undefined>>;
}

export const OverviewItem: FC<OverviewItemProps> = ({ data, token, assessment_id, setResult }) => {
  const [show, setShow] = useState(false);
  console.log('test', data);
  console.log('test', assessment_id);

  return (
    <>
      <ChangeAnswerModal
        showModal={show}
        setShowModal={setShow}
        question={data}
        token={token}
        assessment_id={assessment_id}
        setResult={setResult}
      />

      <div className="w-full py-4 md:py-6 lg:py-8 px-2 md:px-4 lg:px-6 flex flex-col gap-2 md:gap-4 lg:gap-6 border border-[#DFE3E6] bg-white-100 rounded-md md:rounded-xl lg:rounded-2xl">
        {/* question */}
        <div className="w-full flex flex-col gap-2 md:gap-3 lg:gap-4">
          <p className="font-manropeL font-semibold text-[18px] md:text-[20px] lg:text-[22px] text-[#1A1C1B]">
            Question {data?.question_no}
          </p>

          <p className="font-manropeL text-[12px] md:text-[14px] lg:text-[16px] text-[#536066]">
            {data?.question_text}
          </p>
        </div>

        {/* answer */}
        <div className="w-full flex flex-col gap-2 md:gap-3 lg:gap-4 bg-[#FEF8F4] rounded-md md:rounded-xl lg:rounded-2xl p-2 md:p-3 lg:p-4">
          <div className="w-full flex items-center justify-between">
            <p className="font-manropeL font-semibold text-[18px] md:text-[20px] lg:text-[22px] text-[#1A1C1B]">
              Answer
            </p>

            <button
              onClick={() => setShow(true)}
              className="px-2 md:px-3 lg:px-4 py-1 md:py-2 lg:py-3 flex items-center justify-center text-[#009444] border border-[#009444] text-xs md:text-sm rounded-md md:rounded-xl lg:rounded-2xl"
            >
              Change
            </button>
          </div>

          <div className="flex-1">
            <p className="font-manropeL text-[12px] md:text-[14px] lg:text-[16px] text-[#253237]">
              {data?.user_selected_answer ? data?.user_selected_answer : 'No answer selected'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
