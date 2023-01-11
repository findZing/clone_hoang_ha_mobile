/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    serverUrl: 'http://localhost:5000/'
  },
  images: {
    domains: ['cdn.hoanghamobile.com','hoanghamobile.com'],
  },
}

module.exports = nextConfig
