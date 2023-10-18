import Layouts from '@modules/super-admin/analytics-layout/Layouts';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import React from 'react';
import { withAdminAuth } from '../../../helpers/withAuth';

const AnalyticsAndReportingLayouts = () => {
  return (
    <div>
      <SuperAdminNavbar />
      <Layouts />
    </div>
  );
};

export default withAdminAuth(AnalyticsAndReportingLayouts);
