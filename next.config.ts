import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone / LAN access in `next dev` (styles + JS over Wi‑Fi IP).
  // Update if your PC IP changes (ipconfig → IPv4).
  allowedDevOrigins: ["192.168.1.7"],

  // Increase body size limit for image uploads via Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about-inovo-developers',
        permanent: true,
      },
      {
        source: '/design-consultancy-in-calicut',
        destination: '/',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/our-projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
