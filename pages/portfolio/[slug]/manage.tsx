import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import Landing from '@modules/portfolio/component/landing/landing-page';
import { EducationModalContextProvider } from '@modules/portfolio/context/education-context';
import MainLayout from '../../../components/Layout/MainLayout';
import { PortfolioCtxProvider } from '../../../context/PortfolioLandingContext';
import withAuth from '../../../helpers/withAuth';

const Portfolio = () => {
  const queryClient = new QueryClient();
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <QueryClientProvider client={queryClient}>
        <PortfolioCtxProvider>
          <WorkExperienceModalContextProvider>
            <EducationModalContextProvider>
              <Landing />
            </EducationModalContextProvider>
          </WorkExperienceModalContextProvider>
        </PortfolioCtxProvider>
      </QueryClientProvider>
    </MainLayout>
  );
};

export default withAuth(Portfolio);
