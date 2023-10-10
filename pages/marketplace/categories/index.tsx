import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import CategoriesPage from '@modules/marketplace/component/categories/CategoriesPage';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';

const categories = () => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="max-w-[1240px] mx-auto">
        <CategoriesNav
          navItems={[
            ' Design & Graphics',
            ' Development & Programming',
            ' Content Creation',
            ' Digital Arts & Media',
            ' Audio & Sound',
            ' Photography',
            'Writing & Copywriting',
            'Video & motion',
            'Data & Analytics',
            'Marketing & Advertising',
            'eCommerce & Business',
            'Gaming & Entertainment',
            'Virtual Reality & Augmented Reality',
            'e-Books',
          ]}
        />
      </div>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <CategoriesPage />
        </div>
      </div>
    </MainLayout>
  );
};

export default categories;
