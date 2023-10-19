import React, { useState } from 'react';
import Head from 'next/head';
import VerificationLinkSent from '../../modules/auth/verificationLinkSent';
import ChangeEmailAddress from '../../modules/auth/changeEmailAddress';

function Verification() {
  const [showChangePasswordPage, setShowChangePasswordPage] = useState<boolean>(false);

  const handleClick = () => {
    setShowChangePasswordPage((prev) => !prev);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />

        {/* SEO Stuff start */}
        <title>Verification Email - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Verification email sent to your inbox to complete signup for your Zuri Portfolio."
        />
        <meta name="keywords" content="Zuri, Portfolio, Verification Email" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        {/* <meta key="metaimage" itemProp="image" name="image" content="screen image is supposed to be here" /> */}

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Verification email sent to your inbox to complete signup for your Zuri Portfolio."
        />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/verification" />
        {/* <meta key="twitter:card" name="twitter:card" content="summary_large_image" /> */}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta
          property="og:description"
          content="Verification email sent to your inbox to complete signup for your Zuri Portfolio."
        />
        {/* <meta property="og:image" content="https://i.imgur.com/3JjV8Dx.jpg" /> */}

        {/* SEO Stuff end */}
      </Head>
      <div>{!showChangePasswordPage ? <VerificationLinkSent handleClick={handleClick} /> : <ChangeEmailAddress />}</div>
    </>
  );
}

export default Verification;
