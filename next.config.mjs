/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    // Desabilitar cache para desenvolvimento
    minimumCacheTTL: 0,
  },
};

export default nextConfig;

