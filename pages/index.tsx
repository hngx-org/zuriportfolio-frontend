import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import ProductDetailsDescription from '../modules/marketplace/productDetailsDescription';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <div className="w-full flex items-start justify-start"></div>
    </MainLayout>
  );
}

export default Home;
