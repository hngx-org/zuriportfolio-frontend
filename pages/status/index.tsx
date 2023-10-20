import React from 'react';

import ApiStatusPage from '@modules/super-admin/components/ApiStatusPage';

import MainLayout from '../../components/Layout/MainLayout';

interface Props {}

const index = () => {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="api-statuses">
      <ApiStatusPage />
    </MainLayout>
  );
};

export default index;
