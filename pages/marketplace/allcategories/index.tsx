import AllCategoriesPage from '../../../modules/marketplace/AllCategories/AllCategoriesPage';
import MainLayout from '../../../components/Layout/MainLayout';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default function Categories() {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
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
      <div className="max-w-[1240px] mx-auto">
        <Breadcrumbs />
      </div>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <AllCategoriesPage />
        </div>
      </div>
    </MainLayout>
  );
}
