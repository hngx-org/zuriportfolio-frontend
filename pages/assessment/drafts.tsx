import React from 'react';
import DraftPage from '../../modules/assessment/draftPage';
import Header from '@modules/assessment/component/Header';
import MainLayout from '../../components/Layout/MainLayout';
import { AssessmentBanner } from '@modules/assessment/component/banner';

const Draft = () => {
  return (
    <div>
      <MainLayout activePage="dashboard" showTopbar showFooter showDashboardSidebar={false}>
        <AssessmentBanner
          title="Draft"
          subtitle="All incomplete assessments, saved, to be worked on later."
          bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
        />
        <DraftPage />
      </MainLayout>
    </div>
  );
};

export default Draft;
