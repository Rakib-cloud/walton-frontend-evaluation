import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.waltonplaza.com.bd",
      },
      {
        protocol: "https",
        hostname: "waltonbd.com",
      },
    ],
  },
};

export default nextConfig;
