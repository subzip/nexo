import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.100.6'],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
