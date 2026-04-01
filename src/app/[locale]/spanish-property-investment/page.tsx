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
  return getPageMetadata('investment', locale as Locale);
}

export default async function InvestmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const services = [
    { num: '01', title: t.investment_page.service1_title, desc: t.investment_page.service1_desc },
    { num: '02', title: t.investment_page.service2_title, desc: t.investment_page.service2_desc },
    { num: '03', title: t.investment_page.service3_title, desc: t.investment_page.service3_desc },
    { num: '04', title: t.investment_page.service4_title, desc: t.investment_page.service4_desc },
    { num: '05', title: t.investment_page.service5_title, desc: t.investment_page.service5_desc },
    { num: '06', title: t.investment_page.service6_title, desc: t.investment_page.service6_desc },
    { num: '07', title: t.investment_page.service7_title, desc: t.investment_page.service7_desc },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Office Barcelona
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2016/12/mayo-2015-5.jpg"
            alt="VDH Enterprises office Barcelona"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-navy-dark/20" />
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
                {t.investment_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.investment_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.investment_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO — Editorial text
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <p
              className="text-navy text-center text-balance font-serif"
              style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8 }}
            >
              {t.investment_page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7 SERVICES — Staggered list on navy
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-3xl)' }}
            >
              {t.investment_page.services_label}
            </p>
          </Reveal>

          <div className="space-y-0">
            {services.map((service, i) => (
              <Reveal key={service.num} delay={i * 80} variant="fade">
                <div
                  className="border-t border-white/10 py-10 lg:py-12 grid lg:grid-cols-12 gap-6 lg:gap-12 items-start"
                >
                  <span
                    className="font-sans text-gold/25 lg:col-span-2"
                    style={{ fontSize: 'var(--text-4xl)', fontWeight: 300, lineHeight: 1 }}
                  >
                    {service.num}
                  </span>
                  <h3
                    className="text-off-white lg:col-span-3"
                    style={{ fontSize: 'var(--text-xl)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-off-white/50 lg:col-span-7"
                    style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}
                  >
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY US — Gold banner
          ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--gold)',
          paddingTop: 'var(--space-3xl)',
          paddingBottom: 'var(--space-3xl)',
        }}
      >
        <div
          className="mx-auto px-6 lg:px-10 text-center"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal variant="scale">
            <h2
              className="font-serif text-navy"
              style={{ fontSize: 'clamp(1.5rem, 3vw, var(--text-3xl))', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              {t.investment_page.why_title}
            </h2>
          </Reveal>

          <Reveal delay={200} variant="fade">
            <p
              className="text-navy/70 mt-6 mx-auto"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, maxWidth: '600px' }}
            >
              {t.investment_page.why_text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CLOSING CTA
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10 text-center" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal variant="fade">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                href={getLocalizedPath('contact', locale as Locale)}
                className="inline-flex items-center gap-3 bg-navy px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-navy-light"
                style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.12em' }}
              >
                {t.investment_page.cta}
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <a
                href="tel:+34609321308"
                className="font-sans text-navy transition-colors hover:text-gold"
                style={{ fontSize: 'var(--text-base)', transitionDuration: 'var(--duration-fast)' }}
              >
                (+34) 609 321 308
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
