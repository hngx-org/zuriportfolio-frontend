import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';

import ProductDetailsDescription from '../modules/marketplace/productDetailsDescription';
import Landing from '@modules/portfolio/component/landing-page';

function Home() {
  return <MainLayout activePage="home" showDashboardSidebar showTopbar></MainLayout>;
}

export default Home;
