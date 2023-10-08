import AllCategoriesPage from '../../../modules/marketplace/AllCategories/AllCategoriesPage';
import MainLayout from '../../../components/Layout/MainLayout';

export default function Categories() {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="py-6 px-4 overflow-hidden w-full">
        <div className="max-w-[1240px] mx-auto">
          <AllCategoriesPage />
        </div>
      </div>
    </MainLayout>
  );
}
