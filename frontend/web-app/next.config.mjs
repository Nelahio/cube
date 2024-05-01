/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.shopify.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.dior.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.guerlain.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
