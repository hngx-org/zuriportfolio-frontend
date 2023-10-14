import React from 'react';
// import withAuth from '../../helpers/withAuth';
import MainLayout from '../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import { Activity } from '@modules/dashboard/component/dashboard/activity';

function activity() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={true} activePage="dashboard">
      <div className="w-full">
        <main className="max-w-[1240px] mx-auto lg:px-10 px-4">
          <Container>
            <Activity isPage={true} />
          </Container>
        </main>
      </div>
    </MainLayout>
  );
}

// uncomment after auth is implemented
// export default withAuth(activity);
export default activity;
