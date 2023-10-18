import Wishlist from '../../modules/marketplace/wishlist';
import withUserAuth from '../../helpers/withAuth';
import Head from 'next/head';

const WishlistPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <title>Wishlist - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />
        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio - Wishlist" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Explore and manage your wishlist on Zuri Portfolio."
        />
        <meta name="keywords" content="Zuri, portfolio, wishlist" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta
          key="metaimage"
          itemProp="image"
          name="image"
          content="screen image representing items on your wishlist"
        />
  
          {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio - Wishlist" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Explore and manage your wishlist on Zuri Portfolio."
        />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/marketplace/wishlist" />

        
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team/marketplace/wishlist" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio - Wishlist" />
        <meta
          property="og:description"
          content="Explore and manage your wishlist on Zuri Portfolio."
        />
      </Head>
      <Wishlist />
    </>
  );
};

export default withUserAuth(WishlistPage);
