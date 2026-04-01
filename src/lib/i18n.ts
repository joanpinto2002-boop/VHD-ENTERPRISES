export const locales = ['en', 'nl', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// URL slug mapping per locale — preserves all existing URLs exactly
export const slugMap: Record<string, Record<Locale, string>> = {
  home: {
    en: '',
    nl: 'home',
    es: 'inicio',
  },
  advisory: {
    en: 'purchase-asistant',
    nl: 'aankoopbegeleiding-spanje',
    es: 'asesor-en-compra-de-casa-en-espana',
  },
  insights: {
    en: 'buying-a-property-in-spain',
    nl: 'woning-kopen-in-spanje',
    es: 'como-comprar-una-casa-en-espana',
  },
  about: {
    en: 'real-estate-agent-in-spain',
    nl: 'makelaar-in-spanje',
    es: 'agencia-inmobiliaria-en-espana',
  },
  contact: {
    en: 'real-estate-agent-in-barcelona-costa-brava',
    nl: 'makelaar-in-barcelona-en-aan-de-costa-brava',
    es: 'agente-inmobiliario-en-barcelona-y-costa-brava',
  },
  portfolio: {
    en: 'luxury-houses-in-spain',
    nl: 'luxe-woningen-in-spanje',
    es: 'encontrar-casa-en-barcelona-o-costa-brava',
  },
  'full-service': {
    en: 'real-estate-service-in-spain',
    nl: 'onroerend-goed-diensten-in-spanje',
    es: 'servicios-inmobiliarios-en-espana',
  },
  investment: {
    en: 'spanish-property-investment',
    nl: 'vastgoed-management-in-spanje',
    es: 'inversiones-inmobiliarias-en-espana',
  },
  market: {
    en: 'spanish-property-market',
    nl: 'spaanse-onroerend-goed-markt',
    es: 'servicios',
  },
  privacy: {
    en: 'privacy',
    nl: 'privacy',
    es: 'privacidad',
  },
  legal: {
    en: 'legal',
    nl: 'legal',
    es: 'aviso-legal',
  },
  cookies: {
    en: 'cookies',
    nl: 'cookies',
    es: 'cookies',
  },
  // ─── Blog posts ───
  'blog-sitges': {
    en: 'sitges-south-of-barcelona',
    nl: 'sitges-dicht-bij-barcelona-maar-niet-in-de-drukte',
    es: 'sitges-al-sur-de-barcelona',
  },
  'blog-process': {
    en: 'purchasing-a-property-in-spain-ins-outs-of-the-process',
    nl: 'aandachtspunten-bij-de-aankoop-van-een-woning-in-spanje',
    es: 'proceso-de-compra-en-espana',
  },
  'blog-barcelona': {
    en: 'ten-reasons-why-buy-a-property-in-barcelona-in-the-best-investment',
    nl: '8-redenen-om-nu-een-appartement-in-barcelona-te-kopen',
    es: 'razones-para-comprar-en-barcelona',
  },
  'blog-foreigners': {
    en: 'where-do-foreigners-buy-property-in-spain',
    nl: 'waar-kopen-buitenlanders-vastgoed-in-spanje',
    es: 'donde-compran-los-extranjeros-en-espana',
  },
  'blog-demand': {
    en: 'is-foreign-demand-for-spanish-holiday-homes-sustainable',
    nl: 'is-buitenlandse-vraag-naar-vakantiewoningen-duurzaam',
    es: 'demanda-extranjera-viviendas-vacacionales-espana',
  },
  'blog-brexit': {
    en: 'brexit-and-the-consequences-for-the-spanish-market',
    nl: 'brexit-wat-zijn-de-gevolgen-voor-spanje',
    es: 'brexit-y-consecuencias-mercado-espanol',
  },
  // ─── Projects / Case studies ───
  'project-sitges-villa': {
    en: 'project/spectacular-villa-of-265m2-close-to-sitges',
    nl: 'project/prachtige-villa-van-265m2-dichtbij-sitges',
    es: 'project/casa-espectacular-cerca-de-sitges',
  },
  'project-girona': {
    en: 'project/property-for-sale-girona',
    nl: 'project/woningen-te-koop-in-girona',
    es: 'project/apartamentos-en-venta-en-el-girona-golf-club-house',
  },
  'project-calonge': {
    en: 'project/villa-in-calonge-costa-brava-with-swimming-pool-on-private-plot-of-680m2',
    nl: 'project/villa-in-calonge-costa-brava-met-prive-zwembad',
    es: 'project/casa-en-venta-en-costa-brava-calonges-con-piscina',
  },
  'project-barcelona': {
    en: 'project/property-for-sale-in-barcelona-city-centre',
    nl: 'project/woningen-te-koop-in-het-centrum-van-barcelona',
    es: 'project/piso-en-venta-de-100m2-en-el-centro-de-barcelona',
  },
  'project-costa-brava-1': {
    en: 'project/property-in-costa-brava',
    nl: 'project/property-in-costa-brava',
    es: 'project/propiedad-en-costa-brava',
  },
  'project-costa-brava-2': {
    en: 'project/property-costa-brava',
    nl: 'project/woningen-costa-brava',
    es: 'project/villa-en-venta-en-costa-brava-con-piscina',
  },
};

// Reverse lookup: given a slug, find the page key and locale
export function resolveSlug(slug: string): { page: string; locale: Locale } | null {
  for (const [page, slugs] of Object.entries(slugMap)) {
    for (const [locale, localeSlug] of Object.entries(slugs)) {
      if (localeSlug === slug) {
        return { page, locale: locale as Locale };
      }
    }
  }
  return null;
}

// Get the URL for a page in a specific locale
export function getLocalizedPath(page: string, locale: Locale): string {
  const slug = slugMap[page]?.[locale];
  if (slug === undefined) return '/';

  const prefix = locale === 'en' ? '' : `/${locale}`;
  return slug === '' ? prefix || '/' : `${prefix}/${slug}`;
}

// Get alternate URLs for hreflang tags
export function getAlternates(page: string): Record<Locale | 'x-default', string> {
  const base = 'https://vdhenterprises.com';
  return {
    en: `${base}${getLocalizedPath(page, 'en')}`,
    nl: `${base}${getLocalizedPath(page, 'nl')}`,
    es: `${base}${getLocalizedPath(page, 'es')}`,
    'x-default': `${base}${getLocalizedPath(page, 'en')}`,
  };
}
