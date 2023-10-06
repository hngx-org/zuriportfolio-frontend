import Landing from '@modules/portfolio/component/landing-page';
import MainLayout from '../../components/Layout/MainLayout';

const portfolio = () => {
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <Landing />
    </MainLayout>
  );
};

export default portfolio;
