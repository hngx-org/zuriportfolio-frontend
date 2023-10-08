import MainLayout from '../../components/Layout/MainLayout';
import LandingPageFilled from '../../modules/portfolio/component/landingpage-filled';
import React from 'react';

const LandingFilled = () => {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} showFooter={true} activePage={'portfolio'}>
      <LandingPageFilled />
    </MainLayout>
  );
};

export default LandingFilled;
