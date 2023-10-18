import React from 'react';
import Head from 'next/head';
import ResetPasswordForm from '@modules/auth/component/ResetPassword/ResetPasswordForm';

function ResetPassword() {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />

        <title>Reset Password - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Recover access to your Zuri Portfolio account by resetting your password."
        />
        <meta name="keywords" content="Zuri, portfolio, login, forgot password, reset password" />
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        <meta key="metaimage" itemProp="image" name="image" content="screen image is supposed to be here" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Recover access to your Zuri Portfolio account by resetting your password."
        />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/reset-password" />

        {/* this is supposed to be the summary card */}
        {/* <meta key="twitter:card" name="twitter:card" content={zuriLogo} /> */}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team/auth/reset-password" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta
          property="og:description"
          content="Recover access to your Zuri Portfolio account by resetting your password."
        />
        {/* <meta property="og:image" content="/assets/test.png" /> */}
      </Head>
      <div>
        <ResetPasswordForm />
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;
