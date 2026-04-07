import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdhenterprises.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // ═══════════════════════════════════════════════════════
      // CRITICAL — Broken internal links (pre-existing 404s)
      // ═══════════════════════════════════════════════════════
      { source: '/contact', destination: '/real-estate-agent-in-barcelona-costa-brava', permanent: true },
      { source: '/contact/', destination: '/real-estate-agent-in-barcelona-costa-brava', permanent: true },
      { source: '/blog', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/blog/', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/best-properties', destination: '/luxury-houses-in-spain', permanent: true },
      { source: '/best-properties/', destination: '/luxury-houses-in-spain', permanent: true },
      { source: '/nl/blog', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/blog/', destination: '/nl/woning-kopen-in-spanje', permanent: true },

      // ═══════════════════════════════════════════════════════
      // NL locale — consolidation redirects
      // ═══════════════════════════════════════════════════════
      { source: '/nl/woningen-te-koop-in-spanje', destination: '/nl/luxe-woningen-in-spanje', permanent: true },

      // ═══════════════════════════════════════════════════════
      // ES locale — consolidation redirects
      // ═══════════════════════════════════════════════════════
      { source: '/es/propiedades-en-venta-en-espana', destination: '/es/encontrar-casa-en-barcelona-o-costa-brava', permanent: true },

      // ═══════════════════════════════════════════════════════
      // WordPress artifacts — consolidation
      // ═══════════════════════════════════════════════════════
      { source: '/project', destination: '/luxury-houses-in-spain', permanent: true },
      { source: '/project/', destination: '/luxury-houses-in-spain', permanent: true },

      { source: '/author/paul', destination: '/real-estate-agent-in-spain', permanent: true },
      { source: '/author/paul/', destination: '/real-estate-agent-in-spain', permanent: true },
      { source: '/nl/author/paul', destination: '/nl/makelaar-in-spanje', permanent: true },



      // ═══════════════════════════════════════════════════════
      // NL-only blog posts (no EN equivalent) → NL insights hub
      // ═══════════════════════════════════════════════════════
      { source: '/nl/ik-heb-een-prachtig-huis-in-barcelona-gezien-en-hoe-nu-verder', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/ik-heb-een-prachtig-huis-in-barcelona-gezien-en-hoe-nu-verder/', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/nederlanders-kopen-weer-volop-huizen-in-spanje', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/nederlanders-kopen-weer-volop-huizen-in-spanje/', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/8-important-points-purchasing-property-spain', destination: '/nl/woning-kopen-in-spanje', permanent: true },
      { source: '/nl/8-important-points-purchasing-property-spain/', destination: '/nl/woning-kopen-in-spanje', permanent: true },

      // ═══════════════════════════════════════════════════════
      // EN category archives → insights hub
      // ═══════════════════════════════════════════════════════
      { source: '/buying-a-house-in-spain', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/buying-a-house-in-spain/', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/real-estate-in-barcelona', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/real-estate-in-barcelona/', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/real-estate-in-sapin', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/real-estate-in-sapin/', destination: '/buying-a-property-in-spain', permanent: true },

      // ═══════════════════════════════════════════════════════
      // Date archives → insights hub
      // ═══════════════════════════════════════════════════════
      { source: '/2019/:path*', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/2017/:path*', destination: '/buying-a-property-in-spain', permanent: true },
      { source: '/2016/:path*', destination: '/buying-a-property-in-spain', permanent: true },

      // ═══════════════════════════════════════════════════════
      // Consolidation: thin pages → stronger equivalents
      // ═══════════════════════════════════════════════════════
      { source: '/property-to-buy-in-spain', destination: '/luxury-houses-in-spain', permanent: true },
      { source: '/property-to-buy-in-spain/', destination: '/luxury-houses-in-spain', permanent: true },
      { source: '/nl/woningen-te-koop-in-spanje/', destination: '/nl/luxe-woningen-in-spanje', permanent: true },
      { source: '/es/propiedades-en-venta-en-espana/', destination: '/es/encontrar-casa-en-barcelona-o-costa-brava', permanent: true },

      // ═══════════════════════════════════════════════════════
      // WordPress artifacts — feeds, login, comments
      // ═══════════════════════════════════════════════════════
      { source: '/feed', destination: '/', permanent: true },
      { source: '/feed/', destination: '/', permanent: true },
      { source: '/comments/feed', destination: '/', permanent: true },
      { source: '/comments/feed/', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },

      // ═══════════════════════════════════════════════════════
      // Legal pages — old WP paths → new legal pages
      // ═══════════════════════════════════════════════════════
      { source: '/privacy-policy', destination: '/en/privacy', permanent: true },
      { source: '/privacy-policy/', destination: '/en/privacy', permanent: true },
      { source: '/legal-warning', destination: '/en/legal', permanent: true },
      { source: '/legal-warning/', destination: '/en/legal', permanent: true },
      { source: '/cookies-policy', destination: '/en/cookies', permanent: true },
      { source: '/cookies-policy/', destination: '/en/cookies', permanent: true },
      { source: '/nl/privacybeleid', destination: '/nl/privacy', permanent: true },
      { source: '/nl/privacybeleid/', destination: '/nl/privacy', permanent: true },
      { source: '/nl/juridische-kennisgeving', destination: '/nl/legal', permanent: true },
      { source: '/nl/juridische-kennisgeving/', destination: '/nl/legal', permanent: true },
      { source: '/nl/cookiebeleid', destination: '/nl/cookies', permanent: true },
      { source: '/nl/cookiebeleid/', destination: '/nl/cookies', permanent: true },
    ];
  },
};

export default nextConfig;
