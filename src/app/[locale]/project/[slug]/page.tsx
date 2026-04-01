import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

const IMG = 'https://vdhenterprises.com/wp-content/uploads';

interface ProjectData {
  pageKey: string;
  translationKey: string;
  heroImage: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
}

const projects: Record<string, ProjectData> = {
  'spectacular-villa-of-265m2-close-to-sitges': {
    pageKey: 'project-sitges-villa',
    translationKey: 'project_sitges_villa',
    heroImage: `${IMG}/2016/12/piscina-vistas-doc.jpg`,
    heroAlt: 'Spectacular villa with pool near Sitges',
    gallery: [],
  },
  'property-for-sale-girona': {
    pageKey: 'project-girona',
    translationKey: 'project_girona',
    heroImage: `${IMG}/2016/12/cocina.jpg`,
    heroAlt: 'Modern kitchen in Girona Golf Club House apartment',
    gallery: [],
  },
  'villa-in-calonge-costa-brava-with-swimming-pool-on-private-plot-of-680m2': {
    pageKey: 'project-calonge',
    translationKey: 'project_calonge',
    heroImage: `${IMG}/2016/12/Project-Teules-2010-1.jpg`,
    heroAlt: 'Minimalistic villa in Calonge, Costa Brava',
    gallery: [
      { src: `${IMG}/2016/12/Project-Teules-2010-3.jpg`, alt: 'Villa Calonge exterior' },
      { src: `${IMG}/2016/12/Project-Teules-2010-4.jpg`, alt: 'Villa Calonge detail' },
      { src: `${IMG}/2016/12/Project-Teules-2010-6.jpg`, alt: 'Villa Calonge garden' },
    ],
  },
  'property-for-sale-in-barcelona-city-centre': {
    pageKey: 'project-barcelona',
    translationKey: 'project_barcelona',
    heroImage: `${IMG}/2016/12/IMG_0186.jpg`,
    heroAlt: 'Apartment in downtown Barcelona',
    gallery: [
      { src: `${IMG}/2016/12/cocina-y-comedor.jpg`, alt: 'Kitchen and dining area' },
      { src: `${IMG}/2016/12/DSC01459.jpg`, alt: 'Living space' },
    ],
  },
  'property-in-costa-brava': {
    pageKey: 'project-costa-brava-1',
    translationKey: 'project_costa_brava_1',
    heroImage: `${IMG}/2016/12/DSC01150.jpg`,
    heroAlt: 'Luxurious villa in Costa Brava',
    gallery: [
      { src: `${IMG}/2016/12/DSC01164.jpg`, alt: 'Costa Brava villa view' },
      { src: `${IMG}/2016/12/DSC01152.jpg`, alt: 'Costa Brava villa exterior' },
      { src: `${IMG}/2016/12/DSC01153.jpg`, alt: 'Costa Brava villa terrace' },
    ],
  },
  'property-costa-brava': {
    pageKey: 'project-costa-brava-2',
    translationKey: 'project_costa_brava_2',
    heroImage: `${IMG}/2016/12/096.jpg`,
    heroAlt: 'Independent villa with pool in Costa Brava',
    gallery: [
      { src: `${IMG}/2016/12/pisina-118-ejemplo-grande.jpg`, alt: 'Private pool area' },
    ],
  },
};

const validSlugs = Object.keys(projects);

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    validSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects[slug];
  if (!project) return {};
  return getPageMetadata(project.pageKey, locale as Locale);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  const t = getMessages(locale as Locale);
  const p = t[project.translationKey as keyof typeof t] as {
    title: string;
    location: string;
    type: string;
    intro: string;
    section1_title: string;
    section1_text: string;
    section2_title: string;
    section2_text: string;
  };

  const sections = [
    { title: p.section1_title, text: p.section1_text },
    { title: p.section2_title, text: p.section2_text },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-navy-dark/10" />
        </div>
        <div
          className="relative z-10 w-full mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)', paddingBottom: 'var(--space-3xl)' }}
        >
          <div style={{ maxWidth: '700px' }}>
            <Reveal variant="fade">
              <p
                className="font-sans text-gold uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
              >
                {p.location}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, var(--text-4xl))', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                {p.title}
              </h1>
            </Reveal>
            <Reveal delay={400} variant="fade">
              <p className="text-white/60 mt-4 font-sans" style={{ fontSize: 'var(--text-sm)' }}>
                {p.type}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTRO & SECTIONS */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <p
              className="text-navy font-serif text-balance"
              style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8 }}
            >
              {p.intro}
            </p>
          </Reveal>
          <div className="mt-16 space-y-12">
            {sections.map((s, i) => (
              <Reveal key={i} delay={i * 80} variant="fade">
                <h2
                  className="text-navy"
                  style={{ fontSize: 'var(--text-lg)', lineHeight: 1.4, marginBottom: 'var(--space-sm)' }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-text-muted"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                >
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery.length > 0 && (
        <section
          className="bg-white"
          style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
        >
          <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
            <Reveal>
              <div
                className={`grid gap-4 ${
                  project.gallery.length === 1
                    ? 'grid-cols-1 max-w-2xl mx-auto'
                    : project.gallery.length === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-3'
                }`}
              >
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10 text-center"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <h2
              className="text-white font-serif"
              style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.3, marginBottom: 'var(--space-md)' }}
            >
              {t.insights_page.cta_title}
            </h2>
            <p
              className="text-white/70"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}
            >
              {t.insights_page.cta_text}
            </p>
            <Link
              href={`/${getLocalizedPath('contact', locale as Locale)}`}
              className="inline-block bg-gold hover:bg-gold-light text-navy font-sans font-semibold uppercase tracking-wider transition-colors"
              style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-sm) var(--space-xl)', letterSpacing: '0.1em' }}
            >
              {t.contact_page.label}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
