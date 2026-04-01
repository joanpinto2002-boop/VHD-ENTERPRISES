import type { Metadata } from 'next';
import { type Locale, getAlternates } from './i18n';

type PageMeta = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

const pageMeta: Record<string, PageMeta> = {
  home: {
    title: {
      en: 'VDH Enterprises — Property Advisory in Spain',
      nl: 'VDH Enterprises — Aankoopbegeleiding Vastgoed in Spanje',
      es: 'VDH Enterprises — Asesoría Inmobiliaria en España',
    },
    description: {
      en: 'Independent property advisory for international buyers in Barcelona, Costa Brava & Spain. Personal guidance since 1995 by Paul van den Hout.',
      nl: 'Onafhankelijke aankoopbegeleiding voor internationale kopers in Barcelona, Costa Brava en Spanje. Persoonlijke begeleiding sinds 1995 door Paul van den Hout.',
      es: 'Asesoría inmobiliaria independiente para compradores internacionales en Barcelona, Costa Brava y España. Orientación personal desde 1995 por Paul van den Hout.',
    },
  },
  advisory: {
    title: {
      en: 'Purchase Assistance in Spain — No Cure No Pay',
      nl: 'Aankoopbegeleiding Spanje — No Cure No Pay',
      es: 'Asesor de Compra en España — No Cure No Pay',
    },
    description: {
      en: 'Independent purchase assistance for buying property in Spain. No cure, no pay. Personal advisory by Paul van den Hout, based in Barcelona since 1995.',
      nl: 'Onafhankelijke aankoopbegeleiding bij het kopen van een woning in Spanje. No cure, no pay. Persoonlijk advies van Paul van den Hout, gevestigd in Barcelona sinds 1995.',
      es: 'Asesoramiento independiente en la compra de propiedades en España. Sin compromiso. Asesoría personal de Paul van den Hout, en Barcelona desde 1995.',
    },
  },
  insights: {
    title: {
      en: 'Buying a Property in Spain — Insights & Guides',
      nl: 'Woning Kopen in Spanje — Inzichten & Gidsen',
      es: 'Comprar una Propiedad en España — Artículos y Guías',
    },
    description: {
      en: 'Expert guides on buying property in Spain: the purchase process, costs & taxes, NIE requirements, and cultural differences. By Paul van den Hout.',
      nl: 'Deskundige gidsen over het kopen van onroerend goed in Spanje: het aankoopproces, kosten en belastingen, NIE-vereisten en culturele verschillen.',
      es: 'Guías expertas sobre la compra de propiedades en España: el proceso de compra, costes e impuestos, requisitos del NIE y diferencias culturales.',
    },
  },
  about: {
    title: {
      en: 'About Paul van den Hout — Real Estate Agent in Spain',
      nl: 'Over Paul van den Hout — Makelaar in Spanje',
      es: 'Sobre Paul van den Hout — Agencia Inmobiliaria en España',
    },
    description: {
      en: 'Meet Paul van den Hout: ESADE-certified property advisor in Spain since 1995. 30+ years of experience guiding international buyers in Barcelona and Costa Brava.',
      nl: 'Maak kennis met Paul van den Hout: ESADE-gecertificeerd vastgoedadviseur in Spanje sinds 1995. Meer dan 30 jaar ervaring met internationale kopers in Barcelona en Costa Brava.',
      es: 'Conozca a Paul van den Hout: asesor inmobiliario certificado por ESADE en España desde 1995. Más de 30 años de experiencia con compradores internacionales en Barcelona y Costa Brava.',
    },
  },
  contact: {
    title: {
      en: 'Contact — Real Estate Agent in Barcelona & Costa Brava',
      nl: 'Contact — Makelaar in Barcelona en aan de Costa Brava',
      es: 'Contacto — Agente Inmobiliario en Barcelona y Costa Brava',
    },
    description: {
      en: 'Contact Paul van den Hout for independent property advisory in Barcelona, Costa Brava & Spain. Phone: (+34) 609 321 308. Free initial consultation.',
      nl: 'Neem contact op met Paul van den Hout voor onafhankelijke aankoopbegeleiding in Barcelona, Costa Brava en Spanje. Telefoon: (+34) 609 321 308.',
      es: 'Contacte con Paul van den Hout para asesoría inmobiliaria independiente en Barcelona, Costa Brava y España. Teléfono: (+34) 609 321 308.',
    },
  },
  portfolio: {
    title: {
      en: 'Luxury Houses in Spain — Portfolio & Projects',
      nl: 'Luxe Woningen in Spanje — Portfolio & Projecten',
      es: 'Casas de Lujo en España — Portfolio y Proyectos',
    },
    description: {
      en: 'Explore our portfolio of completed property projects in Barcelona, Costa Brava and Sitges. From villas to city apartments — advisory projects since 1995.',
      nl: 'Bekijk onze portfolio van afgeronde vastgoedprojecten in Barcelona, Costa Brava en Sitges. Van villa\'s tot stadsappartementen — begeleide projecten sinds 1995.',
      es: 'Explore nuestro portfolio de proyectos inmobiliarios en Barcelona, Costa Brava y Sitges. De villas a apartamentos — proyectos asesorados desde 1995.',
    },
  },
  'full-service': {
    title: {
      en: 'Real Estate Services in Spain — Full Service Support',
      nl: 'Onroerend Goed Diensten in Spanje — Volledige Service',
      es: 'Servicios Inmobiliarios en España — Servicio Completo',
    },
    description: {
      en: 'Comprehensive real estate services in Spain: translation, mortgage assistance, insurance, administration, NIE, relocation and project supervision.',
      nl: 'Uitgebreide vastgoeddiensten in Spanje: vertaling, hypotheekbemiddeling, verzekeringen, administratie, NIE, relocatie en projectbegeleiding.',
      es: 'Servicios inmobiliarios completos en España: traducción, hipotecas, seguros, administración, NIE, reubicación y supervisión de proyectos.',
    },
  },
  investment: {
    title: {
      en: 'Spanish Property Investment — Management & Advisory',
      nl: 'Vastgoed Management in Spanje — Beheer & Advies',
      es: 'Inversiones Inmobiliarias en España — Gestión y Asesoría',
    },
    description: {
      en: 'Property investment management in Spain: project supervision, investment strategy, business support and co-investment advisory by Paul van den Hout.',
      nl: 'Vastgoedmanagement in Spanje: projectbegeleiding, investeringsstrategie, zakelijke ondersteuning en co-investeringsadvies van Paul van den Hout.',
      es: 'Gestión de inversiones inmobiliarias en España: supervisión de proyectos, estrategia de inversión, soporte empresarial y asesoría de coinversión.',
    },
  },
  market: {
    title: {
      en: 'Spanish Property Market — Barcelona, Costa Brava & Sitges',
      nl: 'Spaanse Onroerend Goed Markt — Barcelona, Costa Brava & Sitges',
      es: 'Mercado Inmobiliario Español — Barcelona, Costa Brava y Sitges',
    },
    description: {
      en: 'Expert analysis of the Spanish property market: Barcelona, Costa Brava and Sitges. Market insights from 30+ years of local experience.',
      nl: 'Deskundige analyse van de Spaanse vastgoedmarkt: Barcelona, Costa Brava en Sitges. Marktinzichten uit meer dan 30 jaar lokale ervaring.',
      es: 'Análisis experto del mercado inmobiliario español: Barcelona, Costa Brava y Sitges. Perspectivas de más de 30 años de experiencia local.',
    },
  },
  privacy: {
    title: {
      en: 'Privacy Policy',
      nl: 'Privacybeleid',
      es: 'Política de Privacidad',
    },
    description: {
      en: 'Privacy policy of VDH Enterprises. How we collect, use and protect your personal data.',
      nl: 'Privacybeleid van VDH Enterprises. Hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen.',
      es: 'Política de privacidad de VDH Enterprises. Cómo recopilamos, usamos y protegemos sus datos personales.',
    },
  },
  legal: {
    title: {
      en: 'Legal Notice',
      nl: 'Juridische Kennisgeving',
      es: 'Aviso Legal',
    },
    description: {
      en: 'Legal notice and terms of use for VDH Enterprises website.',
      nl: 'Juridische kennisgeving en gebruiksvoorwaarden van de VDH Enterprises website.',
      es: 'Aviso legal y condiciones de uso del sitio web de VDH Enterprises.',
    },
  },
  cookies: {
    title: {
      en: 'Cookies Policy',
      nl: 'Cookiebeleid',
      es: 'Política de Cookies',
    },
    description: {
      en: 'Cookies policy of VDH Enterprises. How we use cookies on our website.',
      nl: 'Cookiebeleid van VDH Enterprises. Hoe wij cookies gebruiken op onze website.',
      es: 'Política de cookies de VDH Enterprises. Cómo usamos las cookies en nuestro sitio web.',
    },
  },
  'blog-sitges': {
    title: {
      en: 'Sitges — South of Barcelona',
      nl: 'Sitges — Dicht bij Barcelona maar niet in de Drukte',
      es: 'Sitges — Al Sur de Barcelona',
    },
    description: {
      en: 'Sitges: a Mediterranean gem 35 minutes from Barcelona. Property market insights, lifestyle guide and investment advice by Paul van den Hout.',
      nl: 'Sitges: een mediterrane parel op 35 minuten van Barcelona. Vastgoedmarkt inzichten, levensstijl gids en investeringsadvies.',
      es: 'Sitges: una joya mediterránea a 35 minutos de Barcelona. Perspectivas del mercado inmobiliario, guía de estilo de vida y asesoramiento.',
    },
  },
  'blog-process': {
    title: {
      en: 'Purchasing a Property in Spain — Ins & Outs of the Process',
      nl: 'Aandachtspunten bij de Aankoop van een Woning in Spanje',
      es: 'El Proceso de Compra de una Propiedad en España',
    },
    description: {
      en: 'Complete guide to the Spanish property purchase process: costs, taxes, NIE requirements, notary procedures and what to expect. By Paul van den Hout.',
      nl: 'Complete gids voor het Spaanse aankoopproces: kosten, belastingen, NIE-vereisten, notarisprocedures en wat u kunt verwachten.',
      es: 'Guía completa del proceso de compra de propiedades en España: costes, impuestos, requisitos del NIE, procedimientos notariales.',
    },
  },
  'blog-barcelona': {
    title: {
      en: 'Reasons to Buy a Property in Barcelona — The Best Investment',
      nl: '8 Redenen om Nu een Appartement in Barcelona te Kopen',
      es: 'Razones para Comprar una Propiedad en Barcelona',
    },
    description: {
      en: 'Why Barcelona is one of the best property investments in Europe. Market insights, lifestyle benefits and expert advice from Paul van den Hout.',
      nl: 'Waarom Barcelona een van de beste vastgoedinvesteringen in Europa is. Marktinzichten, levensstijl voordelen en deskundig advies.',
      es: 'Por qué Barcelona es una de las mejores inversiones inmobiliarias de Europa. Perspectivas de mercado y asesoramiento experto.',
    },
  },
  'blog-foreigners': {
    title: {
      en: 'Where Do Foreigners Buy Property in Spain?',
      nl: 'Waar Kopen Buitenlanders Vastgoed in Spanje?',
      es: '¿Dónde Compran los Extranjeros en España?',
    },
    description: {
      en: 'Geographic analysis: where international buyers purchase property in Spain. Key regions, trends and expert insights by Paul van den Hout.',
      nl: 'Geografische analyse: waar internationale kopers vastgoed kopen in Spanje. Belangrijke regio\'s, trends en deskundige inzichten.',
      es: 'Análisis geográfico: dónde compran los extranjeros propiedades en España. Regiones clave, tendencias y perspectivas expertas.',
    },
  },
  'blog-demand': {
    title: {
      en: 'Is Foreign Demand for Spanish Holiday Homes Sustainable?',
      nl: 'Is Buitenlandse Vraag naar Spaanse Vakantiewoningen Duurzaam?',
      es: '¿Es Sostenible la Demanda Extranjera de Viviendas Vacacionales?',
    },
    description: {
      en: 'Analysis of international demand trends for Spanish property. Market sustainability, foreign buyer statistics and long-term outlook.',
      nl: 'Analyse van internationale vraagtrends voor Spaans vastgoed. Marktstabiliteit, statistieken buitenlandse kopers en langetermijnprognose.',
      es: 'Análisis de tendencias de demanda internacional de propiedades españolas. Sostenibilidad del mercado y perspectivas a largo plazo.',
    },
  },
  'blog-brexit': {
    title: {
      en: 'Brexit and the Consequences for the Spanish Market',
      nl: 'Brexit — Wat Zijn de Gevolgen voor Spanje?',
      es: 'Brexit y las Consecuencias para el Mercado Español',
    },
    description: {
      en: 'How Brexit has impacted the Spanish property market. Analysis of consequences for British buyers and the broader market by Paul van den Hout.',
      nl: 'Hoe Brexit de Spaanse vastgoedmarkt heeft beïnvloed. Analyse van de gevolgen voor Britse kopers en de bredere markt.',
      es: 'Cómo el Brexit ha impactado el mercado inmobiliario español. Análisis de consecuencias para compradores británicos.',
    },
  },
  'project-sitges-villa': {
    title: {
      en: 'Spectacular Villa of 265m² — Close to Sitges',
      nl: 'Spectaculaire Villa van 265m² — Dichtbij Sitges',
      es: 'Espectacular Villa de 265m² — Cerca de Sitges',
    },
    description: {
      en: 'Case study: spectacular villa of 265m² close to Sitges with pool and Mediterranean views. Advisory project by VDH Enterprises.',
      nl: 'Case study: spectaculaire villa van 265m² dichtbij Sitges met zwembad en uitzicht op de Middellandse Zee.',
      es: 'Caso de estudio: espectacular villa de 265m² cerca de Sitges con piscina y vistas al Mediterráneo.',
    },
  },
  'project-girona': {
    title: {
      en: 'Apartments in Girona Golf Club House',
      nl: 'Woningen te Koop in Girona',
      es: 'Apartamentos en Venta en Girona Golf Club House',
    },
    description: {
      en: 'Case study: apartments in the Girona Golf Club House development. Advisory project by VDH Enterprises.',
      nl: 'Case study: appartementen in het Girona Golf Club House complex. Begeleid project door VDH Enterprises.',
      es: 'Caso de estudio: apartamentos en el complejo Girona Golf Club House. Proyecto asesorado por VDH Enterprises.',
    },
  },
  'project-calonge': {
    title: {
      en: 'Villa in Calonge, Costa Brava — Pool on Private Plot of 680m²',
      nl: 'Villa in Calonge, Costa Brava — Privézwembad',
      es: 'Casa en Costa Brava, Calonge — con Piscina',
    },
    description: {
      en: 'Case study: minimalistic villa in Calonge, Costa Brava with swimming pool on private plot of 680m². Advisory project by VDH Enterprises.',
      nl: 'Case study: minimalistische villa in Calonge, Costa Brava met zwembad op privéperceel van 680m².',
      es: 'Caso de estudio: villa minimalista en Calonge, Costa Brava con piscina en parcela privada de 680m².',
    },
  },
  'project-barcelona': {
    title: {
      en: 'Property for Sale in Barcelona City Centre',
      nl: 'Woningen te Koop in het Centrum van Barcelona',
      es: 'Piso en Venta en el Centro de Barcelona',
    },
    description: {
      en: 'Case study: fabulous apartment of 136m² in downtown Barcelona. Advisory project by VDH Enterprises.',
      nl: 'Case study: prachtig appartement van 136m² in het centrum van Barcelona. Begeleid project door VDH Enterprises.',
      es: 'Caso de estudio: fabuloso apartamento de 136m² en el centro de Barcelona. Proyecto asesorado por VDH Enterprises.',
    },
  },
  'project-costa-brava-1': {
    title: {
      en: 'Property in Costa Brava',
      nl: 'Woning in Costa Brava',
      es: 'Propiedad en Costa Brava',
    },
    description: {
      en: 'Case study: luxurious property in Costa Brava. Advisory project by VDH Enterprises.',
      nl: 'Case study: luxe woning aan de Costa Brava. Begeleid project door VDH Enterprises.',
      es: 'Caso de estudio: propiedad de lujo en Costa Brava. Proyecto asesorado por VDH Enterprises.',
    },
  },
  'project-costa-brava-2': {
    title: {
      en: 'Independent Villa on Plot of 750m² — Costa Brava',
      nl: 'Vrijstaande Villa op Perceel van 750m² — Costa Brava',
      es: 'Villa Independiente en Parcela de 750m² — Costa Brava',
    },
    description: {
      en: 'Case study: independent villa on plot of 750m² with private pool in Costa Brava. Advisory project by VDH Enterprises.',
      nl: 'Case study: vrijstaande villa op perceel van 750m² met privézwembad aan de Costa Brava.',
      es: 'Caso de estudio: villa independiente en parcela de 750m² con piscina privada en Costa Brava.',
    },
  },
};

/**
 * Generate Next.js Metadata for a given page and locale.
 * Includes title, description, hreflang alternates, OpenGraph locale, and canonical.
 */
export function getPageMetadata(page: string, locale: Locale): Metadata {
  const meta = pageMeta[page];
  if (!meta) return {};

  const alternates = getAlternates(page);
  const ogLocaleMap: Record<Locale, string> = { en: 'en_US', nl: 'nl_NL', es: 'es_ES' };
  const base = 'https://vdhenterprises.com';

  return {
    title: page === 'home' ? { absolute: meta.title[locale] } : meta.title[locale],
    description: meta.description[locale],
    alternates: {
      canonical: alternates[locale],
      languages: {
        en: alternates.en,
        nl: alternates.nl,
        es: alternates.es,
        'x-default': alternates['x-default'],
      },
    },
    openGraph: {
      title: meta.title[locale],
      description: meta.description[locale],
      locale: ogLocaleMap[locale],
      alternateLocale: Object.entries(ogLocaleMap)
        .filter(([l]) => l !== locale)
        .map(([, v]) => v),
      siteName: 'VDH Enterprises',
      type: 'website',
      url: alternates[locale],
      images: [
        {
          url: `${base}/wp-content/uploads/2017/02/about-Paul-vdh.jpg`,
          width: 1200,
          height: 630,
          alt: 'VDH Enterprises — Property Advisory in Spain',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title[locale],
      description: meta.description[locale],
      images: [`${base}/wp-content/uploads/2017/02/about-Paul-vdh.jpg`],
    },
  };
}
