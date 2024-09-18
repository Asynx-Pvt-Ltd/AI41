/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        pathname: '/public/**'
      },
      {
        protocol: 'https',
        hostname: 'qualitrix.com',
        port: '',
        pathname: '/wp-content/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.allabtai.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
