import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
      {
        source: '/resume',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
