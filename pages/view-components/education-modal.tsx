import React from 'react';
import EducationSection from '@modules/portfolio/component/education-modal';

function education() {
  return (
    <EducationSection
      isShowOpen={false}
      handleShowOpen={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
}

export default education;
