/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blog-ome.local",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
