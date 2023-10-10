import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';

import ProductDetailsDescription from '../modules/marketplace/productDetailsDescription';

function Home() {
  return <MainLayout activePage="home" showDashboardSidebar showTopbar></MainLayout>;
}

export default Home;
