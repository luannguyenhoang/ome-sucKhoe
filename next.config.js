/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminsuckhoe.ome.edu.vn",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
