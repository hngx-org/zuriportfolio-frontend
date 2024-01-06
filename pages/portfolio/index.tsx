import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SEO from '../explore/ExploreSEO';
import Portfolio from '@modules/portfolio/portfolio';
import ExploreQuery from '../../modules/explore/hooks/exploreQuery';
import ParamsProvider from '@modules/explore/hooks/exploreParam';

function Explore() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="portfolio">
      <SEO
        title="Zuri Portfolio - Portfolio"
        description="Find the best Talent for your next Project! On Zuriportfolio, you can find the best Talent who matches your needs and exceeds your expectations."
        image="/assets/explore/seo-image.png"
        url="/portfolio/"
      />
      <ParamsProvider>
        <ExploreQuery>
          <Portfolio />
        </ExploreQuery>
      </ParamsProvider>
    </MainLayout>
  );
}

export default Explore;
