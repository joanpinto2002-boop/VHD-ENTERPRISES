import { type Locale, getAlternates } from './i18n';

const BASE_URL = 'https://vdhenterprises.com';

/** Organization + LocalBusiness + RealEstateAgent schema for the site */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'RealEstateAgent'],
        '@id': `${BASE_URL}/#organization`,
        name: 'VDH Enterprises',
        legalName: 'Van den Hout Enterprises S.L.',
        url: BASE_URL,
        logo: `${BASE_URL}/wp-content/uploads/2017/02/about-Paul-vdh.jpg`,
        description:
          'Independent property advisory for international buyers in Barcelona, Costa Brava & Spain. Personal guidance since 1995.',
        foundingDate: '1995',
        founder: {
          '@type': 'Person',
          name: 'Paul van den Hout',
          jobTitle: 'Founder & Property Advisor',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Barcelona',
          addressRegion: 'Catalonia',
          addressCountry: 'ES',
        },
        telephone: '+34609321308',
        areaServed: [
          { '@type': 'City', name: 'Barcelona' },
          { '@type': 'Place', name: 'Costa Brava' },
          { '@type': 'Country', name: 'Spain' },
        ],
        knowsLanguage: ['en', 'nl', 'es', 'de', 'fr'],
        sameAs: [],
        priceRange: '€€€',
      },
    ],
  };
}

/** Article schema for blog posts */
export function getArticleJsonLd(opts: {
  page: string;
  locale: Locale;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  const alternates = getAlternates(opts.page);
  const url = alternates[opts.locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      '@type': 'Person',
      name: 'Paul van den Hout',
      url: `${BASE_URL}/real-estate-agent-in-spain`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VDH Enterprises',
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(opts.image ? { image: opts.image } : {}),
    inLanguage: opts.locale === 'en' ? 'en-US' : opts.locale === 'nl' ? 'nl-NL' : 'es-ES',
  };
}

/** BreadcrumbList schema */
export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
