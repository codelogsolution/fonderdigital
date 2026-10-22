import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev indicator in development.
  devIndicators: false,
  // Silence Turbopack root inference (workspace parent contains a lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fonderdigital.com" }],
        destination: "https://www.fonderdigital.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

