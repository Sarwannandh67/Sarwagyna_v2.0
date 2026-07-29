import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next.js doesn't mis-infer it
  // from stray lockfiles/package.json files higher up the directory tree
  // (which breaks module resolution, e.g. "Can't resolve 'tailwindcss'").
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // Force HTTPS
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://sarwagyna.com/:path*',
        permanent: true,
      },
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sarwagyna.com' }],
        destination: 'https://sarwagyna.com/:path*',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com https://sanity-cdn.com https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",

              "script-src-elem 'self' 'unsafe-inline' https://core.sanity-cdn.com https://sanity-cdn.com https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",

              "connect-src 'self' https://a1119s3a.api.sanity.io wss://a1119s3a.api.sanity.io https://*.api.sanity.io https://*.apicdn.sanity.io https://*.sanity.io wss://*.api.sanity.io wss://*.apicdn.sanity.io wss://*.sanity.io https://core.sanity-cdn.com https://sanity-cdn.com https://hzvhbnohuiodjhndotpb.supabase.co wss://hzvhbnohuiodjhndotpb.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://www.google.com https://google.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://l.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.googleadservices.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",

              "style-src 'self' 'unsafe-inline' https://core.sanity-cdn.com https://sanity-cdn.com https://fonts.googleapis.com",
              "style-src-elem 'self' 'unsafe-inline' https://core.sanity-cdn.com https://sanity-cdn.com https://fonts.googleapis.com",

              "font-src 'self' data: https://fonts.gstatic.com https://core.sanity-cdn.com https://sanity-cdn.com",

              "img-src 'self' data: blob: https: https://www.google-analytics.com",
              "frame-src 'self' https://*.sanity.io https://cal.com https://*.cal.com https://www.google.com https://google.com https://*.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;