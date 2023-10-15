import Landing from '@modules/portfolio/component/landing/landing-page';
import MainLayout from '../../components/Layout/MainLayout';
import { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import withAuth from '../../helpers/withAuth';

const Portfolio = () => {
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <PortfolioCtxProvider>
        <WorkExperienceModalContextProvider>
          <Landing />
        </WorkExperienceModalContextProvider>
      </PortfolioCtxProvider>
    </MainLayout>
  );
};

export default Portfolio;
