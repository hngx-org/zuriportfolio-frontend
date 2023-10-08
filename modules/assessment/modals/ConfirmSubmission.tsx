import React from 'react';
import Button from '@ui/Button';

interface ConfirmSubmissionProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmSubmission: React.FC<ConfirmSubmissionProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="w-fit m-auto items-center font-manropeB justify-center bg-white-100 rounded-[16px] p-4 gap-3 flex flex-col">
      <div className="flex flex-col gap-8 m-auto text-center">
        <p className="font-manropeEB font-[600] align-middle">Are you certain you want to submit now?</p>
        <div className="flex w-full justify-between gap-12">
          <button
            onClick={onCancel}
            className="rounded-[16px] py-2 items-center justify-center bg-white-100 w-fit flex text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled border-solid border-[1px] px-12 border-brand-green-primary"
          >
            Hold on
          </button>
          <button
            onClick={onConfirm}
            className="rounded-[16px] py-2 text-white-100 items-center justify-center bg-brand-green-primary w-fit px-12 flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSubmission;
