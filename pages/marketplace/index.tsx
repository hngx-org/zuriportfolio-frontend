import LandingPage from '../../modules/marketplace/component/landingpage/landing-page';
import Head from 'next/head';

function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>Zuri MarketPlace</title>
        <meta name="description" content={`Explore a wide range of products in Zuri MarketPlace`} />
      </Head>
      <LandingPage />
    </div>
  );
}

export default Home;
