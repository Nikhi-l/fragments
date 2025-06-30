/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcMinify: true
  },
  images: {
    domains: ['images.pexels.com']
  }
}

export default nextConfig