import React from 'react';
// import withAuth from '../helpers/withAuth';
import NavDashBoard from '../../modules/dashboard/component/Navbar';
import ShopOwnerDashboard from '../../modules/dashboard/component/ShopOwnerDashboard';
import MainLayout from '../../components/Layout/MainLayout';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={true} activePage="dashboard">
      <div className="px-[50.5px] md:px-[101px] min-h-[100svh]">
        <ShopOwnerDashboard />
      </div>
    </MainLayout>
  );
}

// uncomment after auth is implemented
// export default withAuth(dashboard);
export default dashboard;
