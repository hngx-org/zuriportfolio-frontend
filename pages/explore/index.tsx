import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import SearchAndFilter from '@modules/portfolio/component/SearchAndFilter/SearchAndFilter';

function dashboard() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <div>
        <SearchAndFilter />
      </div>
    </MainLayout>
  );
}

export default dashboard;
