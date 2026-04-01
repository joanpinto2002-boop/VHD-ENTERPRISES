import Link from 'next/link';
import Image from 'next/image';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('market', locale as Locale);
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const stats = [
    { value: t.market_page.stat1_value, label: t.market_page.stat1_label },
    { value: t.market_page.stat2_value, label: t.market_page.stat2_label },
    { value: t.market_page.stat3_value, label: t.market_page.stat3_label },
    { value: t.market_page.stat4_value, label: t.market_page.stat4_label },
  ];

  const regions = [
    {
      title: t.market_page.region1_title,
      text: t.market_page.region1_text,
      image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/Sagrada-Familia-opt.jpg',
    },
    {
      title: t.market_page.region2_title,
      text: t.market_page.region2_text,
      image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/piscina-vistas-doc.jpg',
    },
    {
      title: t.market_page.region3_title,
      text: t.market_page.region3_text,
      image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/mayo-2015-5.jpg',
    },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Barcelona office / coast
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2016/12/mayo-2015-5.jpg"
            alt="Barcelona coast and skyline"
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
                {t.market_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.market_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.market_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <p
              className="text-navy text-center text-balance font-serif"
              style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8 }}
            >
              {t.market_page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR — 4 key numbers
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-3xl)' }}
            >
              {t.market_page.stats_label}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 100} variant="fade">
                <div className="bg-navy p-8 lg:p-12 text-center">
                  <span
                    className="block font-serif text-gold"
                    style={{ fontSize: 'var(--text-5xl)', lineHeight: 1, marginBottom: 'var(--space-sm)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-sans text-off-white/50 uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          REGIONS — Barcelona, Costa Brava, Sitges
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-3xl)' }}
            >
              {t.market_page.regions_label}
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {regions.map((region, i) => (
              <Reveal key={i} delay={i * 150} variant="fade">
                <div className="group relative overflow-hidden aspect-[3/4]">
                  <Image
                    src={region.image}
                    alt={region.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <h3
                      className="font-serif text-gold"
                      style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}
                    >
                      {region.title}
                    </h3>
                    <p
                      className="text-off-white/80"
                      style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}
                    >
                      {region.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10 text-center" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <h2
              className="text-off-white text-balance"
              style={{ fontSize: 'var(--text-3xl)', lineHeight: 1.2 }}
            >
              {t.market_page.cta}
            </h2>
          </Reveal>

          <Reveal delay={200} variant="fade">
            <div className="mt-10">
              <Link
                href={getLocalizedPath('contact', locale as Locale)}
                className="inline-flex items-center gap-3 border border-gold/30 px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
                style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.12em' }}
              >
                {t.contact_page.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
