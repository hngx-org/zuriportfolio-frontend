import Link from 'next/link';
import MainLayout from '../../components/Layout/MainLayout';
import LandingPage from '../../modules/marketplace/component/landingpage/landing-page';
import Head from 'next/head';

function Home() {
  return (
    <div>
      <Head>
        <title>Marketplace</title>
        <meta property="og:title" content="Marketplace" key="title" />
      </Head>
      <LandingPage />
    </div>
  );
}

export default Home;
