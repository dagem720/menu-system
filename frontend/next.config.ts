import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all paths under /api
        destination: "http://188.245.43.115:3005/api/:path*", // Forward to the backend server
      },
    ];
  },
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
     
    });
    return config;
  },
};

export default nextConfig;
