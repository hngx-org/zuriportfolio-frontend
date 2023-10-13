import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/explore/SearchAndFilter';
import ExplorePage from '@modules/explore/explorePage2';
import ExploreQuery from '../../modules/explore/hooks/exploreQuery';

function Explore() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <ExploreQuery>
        <ExplorePage />
      </ExploreQuery>
    </MainLayout>
  );
}

export default Explore;
