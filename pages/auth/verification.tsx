import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';

function Verification() {
  return (
    <MainLayout showDashboardSidebar={false} showTopbar={true} activePage="verification">
      <div className=" h-[90dvh] w-full"></div>
    </MainLayout>
  );
}

export default Verification;
