/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pixabay.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
