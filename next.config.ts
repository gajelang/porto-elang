import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",      // Existing domain
      "assets.vercel.com",        // Existing domain
      "upload.wikimedia.org",     // Add this line to allow images from upload.wikimedia.org
    ],
  },
  // Other config options can go here
};

export default nextConfig;