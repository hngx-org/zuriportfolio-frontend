import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/explore/SearchAndFilter';
import ExplorePage from '@modules/explore/explorePage';
import ExploreQuery from '../../modules/explore/hooks/exploreQuery';
import ParamsProvider from '@modules/explore/hooks/exploreParam';

function Explore() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <ParamsProvider>
        <ExploreQuery>
          <ExplorePage />
        </ExploreQuery>
      </ParamsProvider>
    </MainLayout>
  );
}

export default Explore;
