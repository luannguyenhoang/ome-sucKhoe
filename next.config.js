/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adminskome.devlab.info.vn",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
