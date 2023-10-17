import MainLayout from '../components/Layout/MainLayout';

import Banner from '@modules/home/banner/banner';
import SectionOne from '@modules/home/sections/first/sectionOne';
import SectionTwo from '@modules/home/sections/second/sectionTwo';
import SectionThree from '@modules/home/sections/second/sectionThree';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar={false} showTopbar includeMarginTop={false}>
      <Banner />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </MainLayout>
  );
}

export default Home;
