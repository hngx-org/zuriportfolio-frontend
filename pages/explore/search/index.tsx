import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import SearchModule from '@modules/explore/searchPage';

export default function Search() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <SearchModule />
    </MainLayout>
  );
}
