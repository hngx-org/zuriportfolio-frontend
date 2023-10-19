import Landing from '@modules/portfolio/component/landing/landing-page';
import MainLayout from '../../components/Layout/MainLayout';
import { PortfolioCtxProvider } from '../../context/PortfolioLandingContext';
import { WorkExperienceModalContextProvider } from '@modules/portfolio/context/work-experience-modal-context';
import withAuth from '../../helpers/withAuth';
import { EducationModalContextProvider } from '@modules/portfolio/context/education-context';

const Portfolio = () => {
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
