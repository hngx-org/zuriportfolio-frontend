import WorkExperienceModalSection from '@modules/portfolio/component/work-experience-modal';
import React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import Button from '@ui/Button';

const WorkExperienceModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <WorkExperienceModalContextProvider>
      <WorkExperienceModalSection isOpen={isOpen} onClose={onClose} />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Button onClick={onOpen} className="rounded-md">
          Open Modal
        </Button>
      </div>
    </WorkExperienceModalContextProvider>
  );
};

export default WorkExperienceModal;
