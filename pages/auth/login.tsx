import React from 'react';
import LoginForm from '../../modules/auth/component/Login/LoginForm';
import withoutAuth from '../../helpers/withoutAuth';
import Head from 'next/head';

function Login() {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/zuriLogo.svg" />

        <title>Login - Zuri Portfolio</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Portfolio" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta
          key="metadescription"
          itemProp="description"
          name="description"
          content="Login to your Zuri Portfolio account."
        />
        <meta name="keywords" content="Zuri, portfolio, login" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        <meta key="metaimage" itemProp="image" name="image" content="screen image is supposed to be here" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta key="twitter:description" name="twitter:description" content="Login to your Zuri Portfolio account." />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/login" />

        {/* this is supposed to be the summary card */}
        {/* <meta key="twitter:card" name="twitter:card" content={zuriLogo} /> */}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team/auth/login" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta property="og:description" content="Login to your Zuri Portfolio account." />
        {/* <meta property="og:image" content="/assets/test.png" /> */}
      </Head>
      <div>
        <LoginForm />
      </div>
    </>
  );
}

export default withoutAuth(Login);
