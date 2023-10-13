import MainLayout from '../../../../components/Layout/MainLayout';
import Breadcrumbs from './BreadCrumbs';
import { categoryMenus } from './data/category-data';
import CategoriesNav from '../CategoriesNav/CategoriesNav';

interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
}

const CategoryLayout = ({ children, ...props }: LayoutProps) => {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <CategoriesNav navItems={categoryMenus} />
      <div className="max-w-[1240px] mx-auto px-5 md:px-0 -z-30">
        <div className="my-4 md:my-6 lg:my-8">
          <Breadcrumbs />
        </div>
      </div>
      <section {...props}>{children}</section>
    </MainLayout>
  );
};

export default CategoryLayout;
