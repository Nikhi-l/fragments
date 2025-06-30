/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcMinify: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

export default nextConfig