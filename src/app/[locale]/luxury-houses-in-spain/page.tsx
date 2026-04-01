import Image from 'next/image';
import Link from 'next/link';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('portfolio', locale as Locale);
}

const projects = [
  {
    title: 'Spectacular villa of 265m²',
    location: 'Close to Sitges',
    image: 'https://vdhenterprises.com/wp-content/uploads/2018/12/piscina-vistas-doc.jpg',
    aspect: 'aspect-[16/9]' as const,
    span: 'sm:col-span-2' as const,
    pageKey: 'project-sitges-villa' as const,
  },
  {
    title: 'Fabulous apartment of 136m²',
    location: 'Downtown Barcelona',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/IMG_0186.jpg',
    aspect: 'aspect-[4/5]' as const,
    span: '' as const,
    pageKey: 'project-barcelona' as const,
  },
  {
    title: 'Luxurious villa',
    location: 'Costa Brava',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/DSC01150.jpg',
    aspect: 'aspect-[4/5]' as const,
    span: '' as const,
    pageKey: 'project-costa-brava-1' as const,
  },
  {
    title: '8 Apartments — Development Project',
    location: 'Palamós, Costa Brava',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/fachada-grande.jpg',
    aspect: 'aspect-[16/9]' as const,
    span: 'sm:col-span-2' as const,
    pageKey: '' as const,
  },
  {
    title: '5 Detached villas with pool',
    location: 'Costa Brava',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/pisina-118-ejemplo-grande.jpg',
    aspect: 'aspect-[16/9]' as const,
    span: 'sm:col-span-2' as const,
    pageKey: '' as const,
  },
  {
    title: 'Minimalistic villa',
    location: 'Calonge, Costa Brava',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/Project-Teules-2010-1.jpg',
    aspect: 'aspect-[4/5]' as const,
    span: '' as const,
    pageKey: 'project-calonge' as const,
  },
  {
    title: 'Apartments in Girona Golf Club House',
    location: 'Girona',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/cocina.jpg',
    aspect: 'aspect-[4/3]' as const,
    span: '' as const,
    pageKey: 'project-girona' as const,
  },
  {
    title: 'Independent villa on plot of 750m²',
    location: 'Costa Brava · Private Pool',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/096.jpg',
    aspect: 'aspect-[4/3]' as const,
    span: '' as const,
    pageKey: 'project-costa-brava-2' as const,
  },
  {
    title: 'Luxurious villa',
    location: 'Santa Cristina de Aro',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/project-aro-3.png',
    aspect: 'aspect-[4/3]' as const,
    span: '' as const,
    pageKey: '' as const,
  },
  {
    title: '11-Unit Refurbishment Project',
    location: 'Centre of Barcelona',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/cocina-y-comedor.jpg',
    aspect: 'aspect-[16/9]' as const,
    span: 'sm:col-span-3' as const,
    pageKey: '' as const,
  },
];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Full-screen featured property
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2018/12/piscina-vistas-doc.jpg"
            alt="Spectacular villa close to Sitges"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />
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
                {t.portfolio_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.portfolio_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.portfolio_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GALLERY — Visual grid with overlay
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-wide)' }}>
          <div className="grid sm:grid-cols-3 gap-3">
            {projects.slice(1).map((project, i) => {
              const inner = (
                <div className={`relative group cursor-pointer overflow-hidden ${project.aspect} ${project.span}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '1.2s', transitionTimingFunction: 'var(--ease-out)' }}
                    sizes={project.span ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
                  />
                  <div
                    className="absolute inset-0 bg-navy/0 group-hover:bg-navy/70 transition-all flex items-end"
                    style={{ transitionDuration: 'var(--duration-base)' }}
                  >
                    <div
                      className="p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                      style={{ transitionDuration: 'var(--duration-base)', transitionTimingFunction: 'var(--ease-out)' }}
                    >
                      <p
                        className="font-sans text-gold/80 uppercase tracking-widest"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', marginBottom: '4px' }}
                      >
                        {project.location}
                      </p>
                      <h3
                        className="text-white"
                        style={{ fontSize: 'var(--text-lg)', lineHeight: 1.3 }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent pointer-events-none" />
                </div>
              );

              return (
                <Reveal key={i} delay={i * 80} variant="scale">
                  {project.pageKey ? (
                    <Link href={`/${getLocalizedPath(project.pageKey, locale as Locale)}`}>
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA — Contact
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10 text-center" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <p
              className="font-serif text-off-white/80 italic text-balance"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}
            >
              &ldquo;Discover our selection of apartments &amp; houses in Spain. From a modern apartment in downtown Barcelona to a fantastic house with incredible views of the Mediterranean Sea.&rdquo;
            </p>
          </Reveal>

          <Reveal delay={200} variant="fade">
            <Link
              href={getLocalizedPath('contact', locale as Locale)}
              className="inline-flex items-center gap-3 border border-gold/30 px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
              style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.12em' }}
            >
              {t.contact_page.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
