import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import NavDashBoard from '@modules/dashboard/component/Navbar';
import PromotionHistory from '@modules/dashboard/component/promotion/PromotionHistory/PromotionHistory';

const Promotions: React.FC = () => {
  return (
    <MainLayout activePage="" showTopbar showDashboardSidebar={false}>
      <div className="flex flex-col justify-center mx-auto">
        <div className="ml-[-40px]">
          <NavDashBoard active="promotions" />
        </div>
        <div className="flex flex-col justify-center mx-auto">
          <PromotionHistory />
        </div>
      </div>
    </MainLayout>
  );
};

export default Promotions;
