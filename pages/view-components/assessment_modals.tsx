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
    <div className="bg-white-300 pb-8 min-h-screen">
      <div className="flex gap-3 mb-4">
        <Button onClick={openModal}>Test Change Answer</Button>
        <Button onClick={openConfirmation}>Test confirm submission</Button>
        <Button onClick={handlesubmissionsuccess}>Test Submission Success</Button>
        <Button onClick={handleRetake}>Test OutOftime</Button>
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
