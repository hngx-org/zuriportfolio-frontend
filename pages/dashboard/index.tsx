import React from 'react';
// import withAuth from '../helpers/withAuth';
import MainLayout from '../../components/Layout/MainLayout';
import ShopOwnerDashboard from '@modules/dashboard/component/dashboard';
import withAuth from '../../helpers/withAuth';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={true} activePage="dashboard">
      <div className="px-[25px] md:px-[50px] lg:px-[75px] xl:px-[101px] min-h-[100vh]">
        <ShopOwnerDashboard />
      </div>
    </MainLayout>
  );
}

// uncomment after auth is implemented
export default withAuth(dashboard);
// export default dashboard;
