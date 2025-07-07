/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/suc-khoe",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminsuckhoe.ome.edu.vn",
        pathname: "/**"
      }
    ]
  }
};

module.exports = nextConfig;
