/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    domains: [
      "localhost",
      "urbansports-backend.s3.amazonaws.com",
      "cdn.sportmonks.com",
    ],
  },
};

module.exports = nextConfig;
