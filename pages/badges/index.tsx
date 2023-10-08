import React from 'react';
import Badges from '@modules/portfolio/component/Badges/Badges';
import MainLayout from '../../components/Layout/MainLayout';
import BadgesHeader from '@modules/portfolio/component/Badges/BadgesHeader';

const badges = () => {
  return (
    <MainLayout activePage="assessments" showTopbar showFooter showDashboardSidebar={false}>
      <BadgesHeader />
      <Badges />
    </MainLayout>
  );
};

export default badges;
