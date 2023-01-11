/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    serverUrl: 'https://commerce-clone-server.onrender.com/'
  },
  images: {
    domains: ['cdn.hoanghamobile.com','hoanghamobile.com'],
  },
}

module.exports = nextConfig
