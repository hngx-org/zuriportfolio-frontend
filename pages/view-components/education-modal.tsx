// pages/education.js

import React from 'react';
import { EducationProvider } from '../../modules/portfolio/component/Education/EducationContext'; // Import your EducationProvider
import EducationSection from '../../modules/portfolio/component/Education/education-modal'; // Import your EducationSection component

function EducationPage() {
  return (
    <EducationProvider>
      <EducationSection />
    </EducationProvider>
  );
}

export default EducationPage;
