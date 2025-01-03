/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@losaweb/ui, @losaweb/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
}

export default nextConfig
