import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80],
  },
  async redirects() {
    return [
      {
        source: '/example',
        destination: '/',
        permanent: true,
      },
      {
        source: '/example/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
