import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/explore/SearchAndFilter';
import ExplorePage from '@modules/explore/explorePage';

function Explore() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <div>
        <ExplorePage />
      </div>
    </MainLayout>
  );
}

export default Explore;
