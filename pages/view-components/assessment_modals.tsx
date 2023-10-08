import React, { useState } from 'react';

import ChangeAnswerModal from '@modules/assessment/modals/ChangeAnswer';
import Button from '@ui/Button';
import ConfirmSubmission from '@modules/assessment/modals/ConfirmSubmission';
import SubmissionSuccess from '@modules/assessment/modals/SubmissionSuccess';
import OutOfTime from '@modules/assessment/modals/OutOfTime';

const ViewModals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isOutOftimeOpen, setIsOutOftimeOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsConfirmationOpen(false);
    setIsSuccessOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
    setIsModalOpen(false);
    setIsSuccessOpen(false);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleSave = (newAnswer: string) => {
    console.log(`New Answer: ${newAnswer}`);
    closeModal();
    openConfirmation();
  };

  const handleConfirmSubmission = () => {
    setIsSuccessOpen(true);
    closeConfirmation();
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
  };

  const handlesubmissionsuccess = () => {
    setIsSuccessOpen(!isSuccessOpen);
    closeConfirmation();
    closeModal();
  };

  const handleRetake = () => {
    setIsOutOftimeOpen(!isOutOftimeOpen);
    closeConfirmation();
    closeModal();
    setIsSuccessOpen(false);
  };

  return (
    <div className="bg-white-300 min-h-screen w-full flex flex-col">
     
      <div className="flex gap-3 mb-4 w-full">
        <button 
        className='rounded-[16px] p-2 text-white-100 items-center justify-center bg-brand-green-primary w-fit flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed'
        onClick={openModal}>Test Change Answer</button>
        <button 
        className='rounded-[16px] p-2 text-white-100 items-center justify-center bg-brand-green-primary w-fit flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed'
        onClick={openConfirmation}>Test confirm submission</button>
        <button 
        className='rounded-[16px] p-2 text-white-100 items-center justify-center bg-brand-green-primary w-fit flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed'
        onClick={handlesubmissionsuccess}>Test Submission Success</button>
        <button 
        className='rounded-[16px] p-2 text-white-100 items-center justify-center bg-brand-green-primary w-fit flex hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed'
        onClick={handleRetake}>Test OutOftime</button>
      </div>
      {isModalOpen && (
        <ChangeAnswerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          currentAnswer={'To provide customer support'}
        />
      )}
      {isConfirmationOpen && <ConfirmSubmission onCancel={closeConfirmation} onConfirm={handleConfirmSubmission} />}
      {isSuccessOpen && <SubmissionSuccess onClose={handleSuccessClose} />}
      {isOutOftimeOpen && <OutOfTime onClose={handleRetake} onRetake={handleRetake} />}
    </div>
  );
};

export default ViewModals;
