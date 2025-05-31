/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.secilstore.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'maestro-api-dev.secil.biz',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
