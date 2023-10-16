import AllCategoriesPage from '../../../modules/marketplace/AllCategories/AllCategoriesPage';
import MainLayout from '../../../components/Layout/MainLayout';
import CategoriesNav from '@modules/marketplace/component/CategoriesNav/CategoriesNav';
import CategoryLayout from '@modules/marketplace/component/layout/category-layout';

export default function Categories() {
  return (
    <CategoryLayout>
      {/* <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}> */}
      <div className="max-w-[1240px] mx-auto"></div>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <AllCategoriesPage />
        </div>
      </div>
      {/* </MainLayout> */}
    </CategoryLayout>
  );
}
