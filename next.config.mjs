/**
 * Next.js configuration for VibeCode Arena
 * Uses App Router (default in latest Next), TypeScript and Tailwind
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  }
};

export default nextConfig;
