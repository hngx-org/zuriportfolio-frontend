import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import CategoriesNav from '../modules/marketplace/component/CategoriesNav/CategoriesNav';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <CategoriesNav />
    </MainLayout>
  );
}

export default Home;
