'use client';
import Code2FA from '../../modules/auth/Code2FA';
import UI2FA from '../../modules/auth/UI2FA';
import React from 'react';
import AuthLayout from '@modules/auth/component/AuthLayout';
import Head from 'next/head';

function _2FA() {
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
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />
        <meta key="metaimage" itemProp="image" name="image" content="screen image is supposed to be here" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta key="twitter:title" name="twitter:title" content="Zuri Portfolio" />
        <meta key="twitter:description" name="twitter:description" content="Login to your Zuri Portfolio account." />
        <meta key="twitter:image" name="twitter:image" content="https://staging.zuri.team/auth/2fa" />

        {/* this is supposed to be the summary card */}
        {/* <meta key="twitter:card" name="twitter:card" content={zuriLogo} /> */}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://staging.zuri.team/auth/2fa" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Portfolio" />
        <meta property="og:description" content="Login to your Zuri Portfolio account." />
        {/* <meta property="og:image" content="/assets/test.png" /> */}
      </Head>
      <AuthLayout isTopRightBlobShown isBottomLeftPadlockShown={false}>
        <section className="grid font-manropeEB overflow-hidden overflow-y-hidden ">
          <UI2FA />
          <div className="flex items-center flex-col gap-11 py-24 lg:pt-3">
            <Code2FA />
          </div>
        </section>
      </AuthLayout>
    </>
  );
}
export default _2FA;
