import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://backend:8080/query',
      },
    ];
  },
};

export default nextConfig;
