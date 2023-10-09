import WorkExperienceModalSection from '@modules/portfolio/component/work-experience-modal';
import React from 'react';
import useDisclosure from '../../hooks/useDisclosure';

const WorkExperienceModal = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <div>
      <WorkExperienceModalSection isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default WorkExperienceModal;
