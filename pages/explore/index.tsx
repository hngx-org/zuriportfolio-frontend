import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SEO from './ExploreSEO';
import SearchAndFilter from '@modules/explore/SearchAndFilter';
import ExplorePage from '@modules/explore/explorePage';
import ExploreQuery from '../../modules/explore/hooks/exploreQuery';
import ParamsProvider from '@modules/explore/hooks/exploreParam';

function Explore() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <SEO
        title="Zuri Portfolio - Explore"
        description="Find the best Talent for your next Project! On Zuriportfolio, you can find the best Talent who matches your needs and exceeds your expectations."
        image="/assets/explore/seo-image.png"
        url="https://staging.zuri.team/explore/"
      />
      <ParamsProvider>
        <ExploreQuery>
          <ExplorePage />
        </ExploreQuery>
      </ParamsProvider>
    </MainLayout>
  );
}

export default Explore;
