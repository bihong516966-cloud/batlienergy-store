import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Vercel's SSR/ISR instead of static export
  // This dramatically reduces deployment size and allows dynamic locale routing
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
