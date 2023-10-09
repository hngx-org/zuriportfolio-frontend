import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/portfolio/component/SearchAndFilter/SearchAndFilter';
import HomePage from '@modules/portfolio/component/explorePage';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <div>
        <SearchAndFilter />
        <HomePage />
      </div>
    </MainLayout>
  );
}

export default dashboard;
