import MainLayout from '../../../components/Layout/MainLayout';
import PromotionHistory from '@modules/dashboard/component/promotion/PromotionHistory/PromotionHistory';
import withAuth from '../../../helpers/withAuth';
import Head from 'next/head';

const Promotions: React.FC = () => {
  return (
    <>
      <MainLayout activePage="promotions" showDashboardSidebar={true} showTopbar={true}>
        <Head>
          <title>Promotions</title>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Prmotions" />

          <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
          <meta key="metadescription" itemProp="description" name="description" content="View all promotions" />
          <meta name="keywords" content="Zuri, portfolio, prmotion, discount, product, dashboard" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <div className="w-full">
          <PromotionHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default withAuth(Promotions);
