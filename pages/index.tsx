import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import CategoriesNav from '../modules/marketplace/component/CategoriesNav/CategoriesNav';

function Home() {
  const navItems: string[] = [
    'All Categories',
    ' Design & Graphics',
    ' Development & Programming',
    ' Content Creation',
    ' Digital Arts & Media',
    ' Audio & Sound',
    ' Photography',
    ' More...',
  ];

  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <CategoriesNav navItems={navItems} />
    </MainLayout>
  );
}

export default Home;
