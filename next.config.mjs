/**
 * Next.js configuration for VibeCode Arena
 * Uses App Router (default in latest Next), TypeScript and Tailwind
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ["images.unsplash.com"]
  }
};

export default nextConfig;
