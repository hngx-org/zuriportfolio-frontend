// components/SEO.tsx
import Head from 'next/head';
import React from 'react';
import { SEOProps } from '../@types';

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Head>
  );
};

export default SEO;
