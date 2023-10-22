import React from 'react';
import DraftPage from '../../../modules/assessment/draftPage';
import Header from '@modules/assessment/component/Header';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import Footer from '../../../components/Footer';
import { AssessmentBanner } from '@modules/assessment/component/banner';
import { withAdminAuth } from '../../../helpers/withAuth';

const Draft = () => {
  return (
    <div>
      <SuperAdminNavbar />
      <AssessmentBanner
        title="Draft"
        subtitle="All incomplete assessments, saved, to be worked on later."
        bannerImageSrc="/assets/images/banner/assessmentOverview.svg"
      />
      <DraftPage />
      <Footer />
    </div>
  );
};

export default withAdminAuth(Draft);
