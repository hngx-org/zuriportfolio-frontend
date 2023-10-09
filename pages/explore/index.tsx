import React from 'react';
import Explore from '@modules/portfolio/component/explorePage';
import MainLayout from '../../components/Layout/MainLayout';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <div className="mt-24">
        <Explore />
      </div>
    </MainLayout>
  );
}

export default dashboard;
