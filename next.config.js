/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: [
    "@ionic/react",
    "@ionic/core",
    "@stencil/core",
    "ionicons",
    "next-tweet",
  ],
  images: {
    loader: "default",
    unoptimized: true,
    domains: [
      "localhost",
      "urbansports-backend.s3.amazonaws.com",
      "cdn.sportmonks.com",
      "pbs.twimg.com",
      "abs.twimg.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx$/,
      use: [
        {
          loader: "webpack-preprocessor-loader",
          options: {
            params: {
              isWeb: process.env.NEXT_PUBLIC_IS_WEB,
            },
          },
        },
      ],
    });

    return config;
  },

  // Experimental only for android and ios native app

  // experimental: {
  //   images: {
  //     unoptimized: true,
  //   },
  // },
};

module.exports = nextConfig;
