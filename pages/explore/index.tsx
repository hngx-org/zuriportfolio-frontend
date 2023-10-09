import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/portfolio/component/SearchAndFilter/SearchAndFilter';
import Explore from '@modules/portfolio/component/explorePage';

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
