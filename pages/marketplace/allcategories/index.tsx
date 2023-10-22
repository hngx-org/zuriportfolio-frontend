import AllCategoriesPage from '../../../modules/marketplace/AllCategories/AllCategoriesPage';
import CategoryLayout from '@modules/marketplace/component/layout/category-layout';
import Head from 'next/head';

export default function Categories() {
  return (
    <CategoryLayout>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>Zuri All Catgories Products</title>
        <meta
          name="description"
          content={`Select a wide range of Zuri category products.We offer the best affordable products`}
        />
      </Head>
      <div className="max-w-[1240px] mx-auto"></div>
      <div className="py-6 px-4 overflow-hidden w-full lg:max-w-[1350px] mx-auto">
        <div className="max-w-[1240px] mx-auto">
          <AllCategoriesPage />
        </div>
      </div>
    </CategoryLayout>
  );
}
