import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import CategoriesNav from '../components/CategoriesNav/CategoriesNav';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      {/* <p className="text-dark-100">Home Page</p> */}
      <CategoriesNav
        navItems={[
          {
            link: '#',
            text: 'All Categories',
          },
          {
            text: ' Design & Graphics',
          },
          {
            text: ' Development & Programming',
          },
          {
            text: ' Content Creation',
          },
          {
            text: ' Digital Arts & Media',
          },
          {
            text: ' Audio & Sound',
          },
          {
            text: ' Photography',
          },
          {
            text: ' More...',
          },
        ]}
      />
    </MainLayout>
  );
}

export default Home;
