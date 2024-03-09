/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ["next-tweet"],
  images: {
    loader: "default",
    // unoptimized: true,
    domains: [
      "localhost",
      "urbansports-backend.s3.amazonaws.com",
      "cdn.sportmonks.com",
      "pbs.twimg.com",
      "abs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
