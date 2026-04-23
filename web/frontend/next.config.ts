import type { NextConfig } from "next";

const withSentry = (config: NextConfig): NextConfig => {
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!SENTRY_DSN) {
    return config;
  }

  return {
    ...config,
    // Sentry webpack plugin configuration
    // The @sentry/nextjs SDK automatically instruments when the config files exist
  };
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default withSentry(nextConfig);