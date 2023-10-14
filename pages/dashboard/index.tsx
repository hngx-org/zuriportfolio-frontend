import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ShopOwnerDashboard from '@modules/dashboard/component/dashboard';
import Container from '@modules/auth/component/Container/Container';
import withAuth from '../../helpers/withAuth';
// import withAuth from '../../helpers/withAuth';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={true} activePage="dashboard">
      <div className="w-full">
        <main className="max-w-[1240px] mx-auto md:px-10 px-4">
          <Container>
            <ShopOwnerDashboard />
          </Container>
        </main>
      </div>
    </MainLayout>
  );
}

// uncomment after auth is implemented
export default withAuth(dashboard);
