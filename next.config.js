/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'staging.zuri.team', 'zuri.team'],
  },
};

module.exports = nextConfig;
