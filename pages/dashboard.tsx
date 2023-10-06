import React from 'react';
// import withAuth from '../helpers/withAuth';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import ShopOwnerDashboard from '../modules/dashboard/component/ShopOwnerDashboard';

function dashboard() {
  return (
    <div className="px-[50.5px] md:px-[101px] min-h-[100svh]">
      <NavDashBoard active="dashboard" />
      <ShopOwnerDashboard />
    </div>
  );
}

// uncomment after auth is implemented
// export default withAuth(dashboard);
export default dashboard;