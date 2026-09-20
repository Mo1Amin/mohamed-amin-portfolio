import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Linting runs as its own step (`npm run lint`) so the build stays fast and focused.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
