import EducationSection from '@modules/portfolio/component/education-modal';
import React from 'react';

const Education = () => {
  return (
    <EducationSection
      isOpen={false}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default Education;
