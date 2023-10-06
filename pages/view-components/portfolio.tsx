import MainLayout from '../../components/Layout/MainLayout';
import Landing from '../../modules/portfolio/component/LandingPage';

import React from 'react';

const Portfolio = () => {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} showFooter={true} activePage={'portfolio'}>
      <Landing />
    </MainLayout>
  );
};

export default Portfolio;
