/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'placekitten.com',
      'dummyimage.com',
      'picsum.photos',
      'images.unsplash.com',
      'ugc.futurelearn.com',
      'themeforest.img.customer.envatousercontent.com',
    ],
  },
};

module.exports = nextConfig;
