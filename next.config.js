/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Short links: /s/:code -> PostProGo's short-link redirector.
        // 307 (not 301/308) so these can be repointed later without
        // browsers/CDNs caching the redirect permanently. This domain must
        // match lib/postProGo.js's POSTPROGO_BASE_URL — kept in sync by
        // hand since Next.js loads this file via plain Node require before
        // the app's module graph exists, so it can't import that constant.
        source: "/s/:code",
        destination: "https://www.postprogo.com/s/gmd/:code",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
