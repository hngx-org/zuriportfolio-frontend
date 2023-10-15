/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'staging.zuri.team', 'zuri.team', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
