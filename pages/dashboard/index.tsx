import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import ShopOwnerDashboard from '@modules/dashboard/component/dashboard';
import Container from '@modules/auth/component/Container/Container';
import { withUserAuth } from '../../helpers/withAuth';
import Head from 'next/head';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={true} activePage="dashboard">
      <Head>
        <title>Customer Dashboard</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Customer Dashboard" />
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <meta key="metaname" itemProp="name" name="title" content="Customer Dashboard" />
        <meta key="metadescription" itemProp="description" name="description" content="Customer Dashboard" />
        <meta name="keywords" content="Zuri, portfolio, add, product, dashboard" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
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
export default withUserAuth(dashboard);
