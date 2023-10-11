import { useState } from 'react';
import Landing from '@modules/portfolio/component/landing/landing-page';
import MainLayout from '../../components/Layout/MainLayout';

const Portfolio = () => {
  const [hasData, setHasData] = useState<boolean>(true);
  return (
    <MainLayout showTopbar showDashboardSidebar={false} activePage="portfolio" showFooter>
      <Landing hasData={hasData} setHasData={() => setHasData((prevState: boolean) => !prevState)} />
    </MainLayout>
  );
};

export default Portfolio;
