import Head from 'next/head';
import MainLayout from '../../../components/Layout/MainLayout';
import withAuth from '../../../helpers/withAuth';

import OrderHistory from '../../../modules/dashboard/component/order/OrderHistory/OrderHistory';

const Orders: React.FC = () => {
  return (
    <>
      <MainLayout activePage="orders" showDashboardSidebar={true} showTopbar={true}>
        <Head>
          <title>Orders</title>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="View orders" />

          <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
          <meta
            key="metadescription"
            itemProp="description"
            name="description"
            content="View all orders in your shop"
          />
          <meta name="keywords" content="Zuri, portfolio, add, dashboard , product, orders" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <div className="w-full">
          <OrderHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default withAuth(Orders);
