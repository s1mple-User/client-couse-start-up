/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'media.graphassets.com',
      'localhost',
      'server-course-production-bfe4.up.railway.app', 
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
