import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@losaweb/ui",
    "@losaweb/database",
    "@losaweb/tripay-sdk",
  ],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tripay.co.id",
        port: "",
        pathname: "/upload/payment-icon/**",
        search: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
