import Head from 'next/head';
import Layouts from '@modules/super-admin/analytics-layout/Layouts';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import React from 'react';
import { withAdminAuth } from '../../../helpers/withAuth';

const AnalyticsAndReportingLayouts = () => {
  return (
    <div>
      <Head>
        <title>Analytics and Reporting main page</title>
        <meta name="description" content="Analytics and reporting for zuriportfolio, marketplace, shops, etc." />
        <meta name="keywords" content="analytics, reporting, data analysis, metrics, statistics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/zuriLogo.svg"/>
      </Head>
      <SuperAdminNavbar />
      <Layouts />
    </div>
  );
};

export default withAdminAuth(AnalyticsAndReportingLayouts);
