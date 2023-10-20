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
<<<<<<< HEAD
      <QueryClientProvider client={queryClient}>
        <PortfolioCtxProvider>
          <WorkExperienceModalContextProvider>
            <EducationModalContextProvider>
              <Landing />
            </EducationModalContextProvider>
          </WorkExperienceModalContextProvider>
        </PortfolioCtxProvider>
      </QueryClientProvider>
=======
      <PortfolioCtxProvider>
        <WorkExperienceModalContextProvider>
          <EducationModalContextProvider>
            <Landing />
          </EducationModalContextProvider>
        </WorkExperienceModalContextProvider>
      </PortfolioCtxProvider>
>>>>>>> 3930ec7fdb40448f227a12c00888cc06a4e04c94
    </MainLayout>
  );
};

export default withAuth(Portfolio);
