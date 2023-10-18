import ForgotPassword from '@modules/auth/component/ForgotPassword/ForgotPassword';
import React from 'react';
import Head from 'next/head';

const ForgotPasswordPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />
        {/* SEO Stuff start */}
        <title>Forgot Password - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />
        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Enter your registered email below to receive reset instructions."
        />
        <meta name="keywords" content="Zuri marketplace, Forgot Password" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        {/* Uncomment and set the actual image path if you have a specific image for your login page. */}
        {/* <meta key="metaimage" itemProp="image" name="image" content="/images/screen.jpg" */}
        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Enter your registered email below to receive reset instructions."
        />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/forgot-password" />
        {/* Uncomment if you have a specific image for Twitter sharing */}
        {/* <meta key="twitter:card" name="twitter:card" content="summary_large_image" */}
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team/auth/forgot-password" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta property="og:description" content="Enter your registered email below to receive reset instructions." />
        <meta property="og:image" content="https://i.imgur.com/3JjV8Dx.jpg" />
        {/* SEO Stuff end */}
      </Head>
      <div>
        <ForgotPassword />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
