import React from 'react';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import withAuth from '../helpers/withAuth';
import MainLayout from '../components/Layout/MainLayout';

function dashboard() {
  return (
    <MainLayout activePage="dashboard" showTopbar={true} showDashboardSidebar={false}>
      <NavDashBoard />
    </MainLayout>
  );
}

export default withAuth(dashboard);
