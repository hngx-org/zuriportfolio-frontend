import ShopOwnerDashboard from '@modules/dashboard/component/dashboard';
import React from 'react';
// import withAuth from '../helpers/withAuth';
import NavDashBoard from '../modules/dashboard/component/Navbar';

function dashboard() {
  return (
    <div className="px-[25px] md:px-[50px] lg:px-[75px] xl:px-[101px] min-h-[100svh]">
      <NavDashBoard active="dashboard" />
      <ShopOwnerDashboard />
    </div>
  );
}

// uncomment after auth is implemented
// export default withAuth(dashboard);
export default dashboard;
