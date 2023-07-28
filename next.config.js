/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    CHIMERA_API_KEY: process.env.CHIMERA_API_KEY,
  },
}

module.exports = nextConfig
