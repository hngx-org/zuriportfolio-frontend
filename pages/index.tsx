import MainLayout from '../components/Layout/MainLayout';

import Banner from '@modules/home/banner/banner';
import SectionProducts from '@modules/home/products/sectionProducts';
import SectionOne from '@modules/home/sections/first/sectionOne';
import SectionFive from '@modules/home/sections/five/sectionFive';
import SectionFour from '@modules/home/sections/fourth/sectionFour';
import SectionTwo from '@modules/home/sections/second/sectionTwo';
import SectionThree from '@modules/home/sections/third/sectionThree';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/screen.jpg" />

        {/* SEO Stuff start */}
        <title>Home - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Collate" />

        <meta key="metaname" itemProp="name" name="title" content="Collate" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Join Talents using Zuri Portfolio to increase audience for things digital - Your Portfolio. Your shop!"
        />
        <meta name="keywords" content="zuri, portfolio, shop" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        <meta key="metaimage" itemProp="image" name="image" content="/images/screen.jpg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Collate" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Join Talents using Zuri Portfolio to increase audience for things digital - Your Portfolio. Your shop!"
        />
        <meta key="twitter:image" name="twitter:image" content="https://i.imgur.com/3JjV8Dx.jpg" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Collate" />
        <meta
          property="og:description"
          content="Join Talents using Zuri Portfolio to increase audience for things digital - Your Portfolio. Your shop!"
        />
        <meta property="og:image" content="https://i.imgur.com/3JjV8Dx.jpg" />

        {/* SEO Stuff end */}
      </Head>

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

export default Home;
