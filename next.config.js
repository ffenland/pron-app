/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search.pstatic.net",
        pathname: "/common/**",
      },
    ],
  },
};

module.exports = nextConfig;
