import React from 'react';

import ApiStatusPage from '@modules/super-admin/components/api-status/ApiStatusPage';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';

interface Props {}

const index = () => {
  return (
    <div>
      <SuperAdminNavbar />
      <ApiStatusPage />
    </div>
  );
};

export default index;
