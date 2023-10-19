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
        </Head>
        <div className="w-full">
          <PromotionHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default withAuth(Promotions);
