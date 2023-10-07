import PromotionHistory from '@modules/dashboard/component/promotion/PromotionHistory/PromotionHistory';
import MainLayout from '../../../components/Layout/MainLayout';

const Promotions: React.FC = () => {
  return (
    <>
      <MainLayout activePage="promotions" showDashboardSidebar={true} showTopbar={true}>
        <div className="w-full md:w-[80%] ml-[0%] md:ml-[10%] items-center flex justify-center">
          <PromotionHistory />
        </div>
      </MainLayout>
    </>
  );
};

export default Promotions;
