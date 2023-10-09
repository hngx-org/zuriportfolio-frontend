import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import CategoriesPage from '@modules/marketplace/component/categories/CategoriesPage';
import Breadcrumbs from '../../../components/Breadcrumbs';

const categories = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="py-6 px-4 overflow-hidden w-full">
         {/* BreadCrum Area */}
      <div className="mt-[1rem] md:mt-[1.5rem] lg:mt-[53px] mb-[] md:mb-[] lg:mb-[32px]">
        <Breadcrumbs />
      </div>
        <div className="max-w-[1240px] mx-auto">
          <CategoriesPage />
        </div>
      </div>
    </MainLayout>
  );
};

export default categories;
