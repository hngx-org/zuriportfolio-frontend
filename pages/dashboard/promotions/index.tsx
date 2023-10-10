import MainLayout from '../../../components/Layout/MainLayout';
import PromotionHistory from '@modules/dashboard/component/promotion/PromotionHistory/PromotionHistory';

const Promotions: React.FC = () => {
  return (
    <>
      <MainLayout activePage="promotions" showDashboardSidebar={true} showTopbar={true}>
        <div className="w-full">
          <PromotionHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default Promotions;
