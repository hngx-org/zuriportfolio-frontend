import Wishlist from '../../modules/marketplace/wishlist';
import {withUserAuth} from '../../helpers/withAuth';
import Head from 'next/head';

const WishlistPage = () => {
  return (
    <>
     <Head>
     <link rel="icon" href="/assets/zuriLogo.svg" />
    <title>Zuri Portfolio - Wishlist</title>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />
    <meta itemProp="name" content="Zuri Portfolio - Wishlist" />
    <meta itemProp="description" content="Explore and manage your wishlist on Zuri Portfolio." />
    <meta name="keywords" content="Zuri, portfolio, wishlist" />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />

    {/* Twitter Meta Tags  */}
    <meta name="twitter:title" content="Zuri Portfolio - Wishlist" />
    <meta name="twitter:description" content="Explore and manage your wishlist on Zuri Portfolio." />

    {/* Facebook Meta Tags */}
    <meta property="og:url" content="https://staging.zuri.team/marketplace/wishlist" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Zuri Portfolio - Wishlist" />
    <meta property="og:description" content="Explore and manage your wishlist on Zuri Portfolio." />
 
     </Head>
      <Wishlist />
    </>
  );
};

export default withUserAuth(WishlistPage);
