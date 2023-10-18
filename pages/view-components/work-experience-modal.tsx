import WorkExperienceModalSection from '@modules/portfolio/component/work-experience-modal';
import React from 'react';
import useDisclosure from '../../hooks/useDisclosure';
import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import CustomSectionModal from '@modules/portfolio/component/custom-section-modal';

const WorkExperienceModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <WorkExperienceModalContextProvider>
      {/* <WorkExperienceModalSection isOpen={isOpen} onClose={onClose} /> */}
      <CustomSectionModal />
      <button onClick={onOpen}>Open bobo</button>
    </WorkExperienceModalContextProvider>
  );
};

export default WorkExperienceModal;
