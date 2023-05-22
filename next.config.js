/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
