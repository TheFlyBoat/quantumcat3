
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
<<<<<<< HEAD
  output: 'export',
=======
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' ,
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};
export default nextConfig;
