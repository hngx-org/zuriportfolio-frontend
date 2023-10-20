import Guestsignupform from '@modules/auth/component/guestsignupform';
import React from 'react';
import Head from 'next/head';

const GuestSignupPage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />

        {/* SEO Stuff start */}
        <title>Reset Email - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Reset your email to complete signup for your Zuri Portfolio."
        />
        <meta name="keywords" content="Zuri, Portfolio, Reset Email" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        {/* <meta key="metaimage" itemProp="image" name="image" content="screen image is supposed to be here" /> */}

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Reset your email to complete signup for your Zuri Portfolio."
        />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/guest-signup-form" />
        {/* <meta key="twitter:card" name="twitter:card" content="summary_large_image" /> */}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta property="og:description" content="Reset your email to complete signup for your Zuri Portfolio." />
        {/* <meta property="og:image" content="https://i.imgur.com/3JjV8Dx.jpg" /> */}

        {/* SEO Stuff end */}
      </Head>
      <div>
        <Guestsignupform />
      </div>
    </>
  );
};

export default GuestSignupPage;
