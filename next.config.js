/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    RESAS_API_KEY: process.env.RESAS_API_KEY,
  },
};

module.exports = nextConfig;
