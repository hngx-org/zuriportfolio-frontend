import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/explore/SearchAndFilter';
import Explore from '@modules/explore/explorePage';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <div>
        <SearchAndFilter />
        <Explore />
      </div>
    </MainLayout>
  );
}

export default dashboard;
