import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // localhost sem porta
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/**',
      },

      // suas portas locais
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },

      // domínio de produção
      {
        protocol: 'https',
        hostname: 'theblog.otaviomiranda.com.br',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
