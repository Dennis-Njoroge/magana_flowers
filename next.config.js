/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //basePath: '/claims',
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
