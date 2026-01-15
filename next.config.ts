import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
  allowedDevOrigins: ['https://blwg5vz3-6501.inc1.devtunnels.ms', 'http://localhost:6501', 'https://blwg5vz3-6500.inc1.devtunnels.ms/', 'http://localhost:6500'],

};

export default nextConfig;