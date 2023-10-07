import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import CategoriesPage from '@modules/marketplace/component/categories/CategoriesPage';

const categories = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <CategoriesPage />
        </div>
      </div>
    </MainLayout>
  );
};

export default categories;
