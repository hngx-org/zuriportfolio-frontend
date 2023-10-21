import React, { useEffect, useState } from 'react';
import CartPaymentsuccessModal, { CartPaymentFailureModal } from '../../components/Modals/CartPaymentModal';
import { confirmTransaction } from '../../http/checkout';
import Head from 'next/head';


export default function Successful() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function confirmTransactionStatus() {
      const query = new URLSearchParams(window.location.search);
      const token = localStorage.getItem('zpt') as string;
      const payment_gateway = localStorage.getItem('gateway') as string;
      const queryKey = payment_gateway == 'paystack' ? 'trxref' : 'tx_ref';
      const txn_ref = query.get(queryKey) as string;
      const confirmResponse = await confirmTransaction({ token, txn_ref, payment_gateway });
      setSuccess(confirmResponse);
      setIsLoading(false);
    }
    confirmTransactionStatus();
  });
  return (
    <>
      <Head>
        <title>Marketplace | Payment Status</title>
        <meta property="og:title" content="Marketplace | Payment Status" key="title" />
        <link rel="icon" href="/assets/zuriLogo.svg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zuri Marketplace" />

        <meta key="metaname" itemProp="name" name="title" content="Zuri Marketplace" />
        <meta key="metadescription" itemProp="description" name="description" content="Transaction Confirmation" />
        <meta name="keywords" content="Zuri, marketplace, cart, transaction" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <meta name="language" content="English" />

        <meta key="twitter:title" name="twitter:title" content="Zuri Marketplace" />
        <meta key="twitter:description" name="twitter:description" content="Zuri marketplace cart" />

        <meta property="og:url" content="https://staging.zuri.team/marketplace/cart" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Zuri Marketplace" />
        <meta property="og:description" content="Confirming Transaction" />
      </Head>
      {!isLoading &&
        (success ? (
          <CartPaymentsuccessModal></CartPaymentsuccessModal>
        ) : (
          <CartPaymentFailureModal></CartPaymentFailureModal>
        ))}
    </>
  );

}
