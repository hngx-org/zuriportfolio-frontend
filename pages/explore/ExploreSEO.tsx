// components/SEO.tsx
import Head from 'next/head';
import React from 'react';
import { ExploreSEOProps } from '../../@types';

const SEO: React.FC<ExploreSEOProps> = ({ title, description, image, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/assets/zuriLogo.svg" />
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Zuri, Zuri portfolio, Zuri explore" />

      {/* content-type, viewport, charSet, content-language, robots */}
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="content-language" content="en" />
      <meta charSet="UTF-8" />

      {/* fb/og */}
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      {/* twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
