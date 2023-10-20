import MainLayout from '../../components/Layout/MainLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import Landing from '@modules/portfolio/component/landing/landing-page';
import withAuth from '../../helpers/withAuth';
import { EducationModalContextProvider } from '@modules/portfolio/context/education-context';

const Portfolio = () => {
  const queryClient = new QueryClient();
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <PortfolioCtxProvider>
        <WorkExperienceModalContextProvider>
          <EducationModalContextProvider>
            <Landing />
          </EducationModalContextProvider>
        </WorkExperienceModalContextProvider>
      </PortfolioCtxProvider>
    </MainLayout>
  );
};

export default withAuth(Portfolio);
