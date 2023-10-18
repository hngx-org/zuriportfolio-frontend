import MainLayout from '../../../../components/Layout/MainLayout';
import Breadcrumbs from './BreadCrumbs';
import CategoriesNav from '../CategoriesNav/CategoriesNav';
import useCategoryNav from '@modules/marketplace/hooks/useCategoryNav';


interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
  isBreadcrumb?: boolean;
  pathName?: string;
}


const CategoryLayout = ({ isBreadcrumb = true, children, pathName, ...props }: LayoutProps) => {
  const { categories, loading } = useCategoryNav();

  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <CategoriesNav navItems={categories} isLoading={loading} />
      <div className="max-w-[1240px] mx-auto px-5 md:px-0 -z-30">
        <div className="my-4 md:my-6 lg:my-8">
         {isBreadcrumb ? <Breadcrumbs pathName={pathName} /> : null}
        </div>
      </div>
      <section {...props}>{children}</section>
    </MainLayout>
  );
};

export default CategoryLayout;
