/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    // Desabilitar cache para desenvolvimento
    minimumCacheTTL: 0,
  },
  env: {
    // Expõe o commit hash do Vercel para o cliente (seguro - apenas hash público)
    NEXT_PUBLIC_COMMIT_HASH: process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_COMMIT_HASH || '',
  },
};

export default nextConfig;

