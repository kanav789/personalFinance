import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
   generateBuildId: async () => {
    // This could be anything, using the latest git hash
    return process.env.GIT_HASH ?? null;
  },
  reactStrictMode: true,
  

};

export default nextConfig;
