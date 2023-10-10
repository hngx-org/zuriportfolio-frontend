import Landing from '@modules/portfolio/component/landing-page';
import MainLayout from '../../components/Layout/MainLayout';
import { useState } from 'react';
import LandingPageFilled from '@modules/portfolio/component/landingpage-filled';

const Portfolio = () => {
  const [hasData, setHasData] = useState<boolean>(false);
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      {!hasData ? (
        <Landing hasData={hasData} setHasData={() => setHasData((prevState: boolean) => !prevState)} />
      ) : (
        <LandingPageFilled />
      )}
    </MainLayout>
  );
};

export default Portfolio;
