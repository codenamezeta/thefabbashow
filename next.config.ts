import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
      },
    ],
  },
  allowedDevOrigins: ['https://cdn.sanity.io', '192.168.86.29'],
}
export default nextConfig
