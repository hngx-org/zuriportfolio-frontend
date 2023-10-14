import MainLayout from '../../../../components/Layout/MainLayout';
import Breadcrumbs from './BreadCrumbs';
import { navItems } from './data/category-data';
import CategoriesNav from '../CategoriesNav/CategoriesNav';
import useCategoryNav from '@modules/marketplace/hooks/useCategoryNav';
import jwtDecode from 'jwt-decode';
import { isUserAuthenticated } from '@modules/marketplace/hooks/useAuthHelper';

interface LayoutProps extends React.ComponentPropsWithRef<'section'> {
  children: React.ReactNode;
}

type categories = object[];

const CategoryLayout = ({ children, ...props }: LayoutProps) => {
  const { categories, loading } = useCategoryNav();
  // const token = isUserAuthenticated()
  // console.log(token);
  console.log(categories);

  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      {/* <CategoriesNav navItems={navItems as categories} /> */}
      <CategoriesNav navItems={categories} />
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
