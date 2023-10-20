import Head from 'next/head';

const SuperAdminVendProdHeader = () => {
  return (
    <Head>
      <title>Vendor Products</title>
      <meta
        name="description"
        content="Explore a world of talents, create your personalized portfolio, and sell your digital products in your very own shop. Your dreams, your creations, your success – all in one place. Start your journey today."
      />
      <meta name="title" property="og:title" content="Vendor Products" />
      <meta name="type" property="og:type" content="website" />

      <meta
        property="og:description"
        content="Explore a world of talents, create your personalized portfolio, and sell your digital products in your very own shop. Your dreams, your creations, your success – all in one place. Start your journey today."
      />
      <meta name="author" content="ZuriPortfolio" />
      <meta property="og:site_name" content="ZuriPortfolio" />

      {/* Twitter tags */}
      <meta name="twitter:card" content="Vendor Products" />
      <meta name="twitter:title" content="Vendor Products" />
      <meta
        name="twitter:description"
        content="Explore a world of talents, create your personalized portfolio, and sell your digital products in your very own shop. Your dreams, your creations, your success – all in one place. Start your journey today."
      />
      <meta name="twitter:site" content="@hnginternship" />
      <meta name="twitter:creator" content="@hnginternship" />
    </Head>
  );
};

export default SuperAdminVendProdHeader;
