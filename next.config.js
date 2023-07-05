/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["gogocdn.net"],
  },
  head: {
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  },
};

module.exports = nextConfig;
