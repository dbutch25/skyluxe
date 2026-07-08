import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent DNS prefetch leaking visited URLs
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for 1 year (enable after confirming HTTPS works)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Google Analytics + Plausible
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://plausible.io",
      // Styles: self + inline (Tailwind) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs + Cloudinary + Google avatars
      "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://api.qrserver.com",
      // Media: self + Cloudinary videos
      "media-src 'self' https://res.cloudinary.com",
      // API connections
      "connect-src 'self' https://accelerate.prisma-data.net https://plausible.io",
      // Frames: YouTube embeds + Google Maps
      "frame-src https://www.youtube.com https://www.google.com",
      // Block object/embed tags
      "object-src 'none'",
      // Only load resources over HTTPS
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/extension-accelerate"],
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        // QR code generation for 2FA setup
        protocol: "https",
        hostname: "api.qrserver.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
