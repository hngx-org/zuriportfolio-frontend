import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';

import ProductDetailsDescription from '../modules/marketplace/productDetailsDescription';
import Banner from '@modules/home/banner/banner';
import SectionOne from '@modules/home/sections/first/sectionOne';
import SectionTwo from '@modules/home/sections/second/sectionTwo';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar includeMarginTop={false}>
      <Banner />
      <SectionOne />
      <SectionTwo />
    </MainLayout>
  );
}

export default Home;
