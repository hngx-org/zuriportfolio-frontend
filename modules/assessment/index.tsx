import React, { useState } from 'react';
import FeedbackHeader from './component/FeedbackHeader';
import Feedcard from './component/Feedcard';
import expertBag from '../../public/assets/images/banner/expertBag.png';
import beginner from '../../public/assets/images/banner/bignneerbadge.png';
import intermidiate from '../../public/assets/images/banner/intermediateBadge.png';
import ChangeAnswerModal from './modals/ChangeAnswer';
import Button from '@ui/Button';
import ConfirmSubmission from './modals/ConfirmSubmission';
import SubmissionSuccess from './modals/SubmissionSuccess';
import OutOfTime from './modals/OutOfTime';

const Assesment: React.FC = () => {
  const exepert = {
    score: '90%',
    img: expertBag,
    badgeName: 'expert',
  };
  const midiate = {
    score: '79%',
    img: intermidiate,
    retake: 'Retake',
    badgeName: 'intermediate',
  };
  const beginer = {
    score: '49%',
    img: beginner,
    retake: 'Retake',
    intermediate: 'beginner',
  };

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


  const handlesubmissionsuccess = ()=>{
      setIsSuccessOpen(!isSuccessOpen)
      closeConfirmation();
      closeModal()
  }

  const handleRetake = () => {
    setIsOutOftimeOpen(!isOutOftimeOpen)
    closeConfirmation();
      closeModal()
      setIsSuccessOpen(false);
  };

  return (
    <div className="bg-white-300 pb-8">
      <FeedbackHeader />
      <Feedcard score={exepert.score} badge={exepert.img} badgeName={exepert.badgeName} retake="" />
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
      {isConfirmationOpen && (
        <ConfirmSubmission
          onCancel={closeConfirmation}
          onConfirm={handleConfirmSubmission}
        />
      )}
      {isSuccessOpen && (
        <SubmissionSuccess onClose={handleSuccessClose} />
      )}
      {isOutOftimeOpen && (
        <OutOfTime onClose={handleRetake}  onRetake={handleRetake}  />
      )}
    </div>
  );
};

export default Assesment;
