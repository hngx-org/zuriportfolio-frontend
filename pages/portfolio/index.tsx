import Landing from '@modules/portfolio/component/landing/landing-page';
import MainLayout from '../../components/Layout/MainLayout';
import { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';

const Portfolio = () => {
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <PortfolioCtxProvider>
        <Landing />
      </PortfolioCtxProvider>
    </MainLayout>
  );
};

export default Portfolio;
