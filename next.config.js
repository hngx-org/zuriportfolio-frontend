/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placekitten.com', 'dummyimage.com', 'picsum.photos'], // Add the domains you want to allow
  },
};

module.exports = nextConfig;
