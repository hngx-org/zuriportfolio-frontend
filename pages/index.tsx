import MainLayout from '../components/Layout/MainLayout';

import Banner from '@modules/home/banner/banner';
import SectionProducts from '@modules/home/products/sectionProducts';
import SectionOne from '@modules/home/sections/first/sectionOne';
import SectionFive from '@modules/home/sections/five/sectionFive';
import SectionFour from '@modules/home/sections/fourth/sectionFour';
import SectionTwo from '@modules/home/sections/second/sectionTwo';
import SectionThree from '@modules/home/sections/third/sectionThree';
import withoutAuth from '../helpers/withoutAuth';
import SEO from '../components/SEO';

function Home() {
  return (
    <>
      <SEO
        title="Zuri Portfolio"
        description="Discover and procure goods for personal use. At Zuriportfolio, you will find a curated selection of premium products tailored to your specific requirements, designed to surpass your expectations."
        image="/assets/explore/home.png"
        url="https://staging.zuri.team"
      />
      <MainLayout activePage="home" showDashboardSidebar={false} showTopbar includeMarginTop={false}>
        <Banner />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionProducts />
      </MainLayout>
    </>
  );
}

export default withoutAuth(Home);
