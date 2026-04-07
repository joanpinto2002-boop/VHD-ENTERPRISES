import Link from 'next/link';
import Image from 'next/image';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';
import { AdvisoryHero } from '@/components/sections/AdvisoryHero';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('advisory', locale as Locale);
}

export default async function AdvisoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const steps = [
    { num: '01', title: t.advisory_page.step1_title, desc: t.advisory_page.step1_desc },
    { num: '02', title: t.advisory_page.step2_title, desc: t.advisory_page.step2_desc },
    { num: '03', title: t.advisory_page.step3_title, desc: t.advisory_page.step3_desc },
    { num: '04', title: t.advisory_page.step4_title, desc: t.advisory_page.step4_desc },
    { num: '05', title: t.advisory_page.step5_title, desc: t.advisory_page.step5_desc },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Property search with dynamic location images
          ══════════════════════════════════════════════════════════ */}
      <AdvisoryHero locale={locale as Locale} t={t} />

      {/* ══════════════════════════════════════════════════════════
          PROCESS — Premium Apple/Porsche style
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          {/* Section header — centered, minimal */}
          <Reveal variant="fade">
            <div className="text-center" style={{ marginBottom: 'clamp(4rem, 8vw, 7rem)', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
              <p
                className="font-serif italic"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.75, color: 'rgba(26,35,50,0.5)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {t.advisory_page.intro}
              </p>
              <h2
                className="font-serif text-navy"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em' }}
              >
                {t.advisory_page.process_label}
              </h2>
            </div>
          </Reveal>

          {/* Steps — alternating layout */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 100} variant="fade">
                <div
                  className="grid lg:grid-cols-12 items-center"
                  style={{
                    padding: 'clamp(2rem, 4vw, 3.5rem) 0',
                    borderTop: i === 0 ? '1px solid rgba(26,35,50,0.08)' : 'none',
                    borderBottom: '1px solid rgba(26,35,50,0.08)',
                  }}
                >
                  {/* Number — large, faded */}
                  <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-3' : ''}`}>
                    <span
                      className="font-serif block"
                      style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: 200,
                        lineHeight: 1,
                        color: 'var(--navy)',
                        opacity: 0.08,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div className={`lg:col-span-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3
                      className="font-serif text-navy"
                      style={{
                        fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                        lineHeight: 1.75,
                        color: 'rgba(26,35,50,0.55)',
                        maxWidth: '480px',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY CHOOSE US — Cinematic video + text overlay
          ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/spain-cities.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 35, 50, 0.70)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,35,50,0.95)] via-[rgba(26,35,50,0.6)] to-transparent" />

        {/* Letterbox bars for film look */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--navy)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'var(--navy)' }} />

        {/* Content — text on the left */}
        <div
          className="relative z-10 mx-auto px-6 lg:px-10 flex items-center"
          style={{ maxWidth: 'var(--max-width)', minHeight: '85vh', paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
        >
          <div style={{ maxWidth: '580px' }}>
            <Reveal variant="fade">
              <p
                className="font-sans uppercase tracking-widest"
                style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
              >
                | {t.advisory_page.why_label} |
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2
                className="font-serif"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em', color: 'white', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {t.advisory_page.why_title}
              </h2>
            </Reveal>

            <Reveal delay={200} variant="fade">
              <p
                className="font-sans"
                style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(255,255,255,0.85)' }}
              >
                {t.advisory_page.opening}
              </p>
            </Reveal>

            <Reveal delay={300} variant="fade">
              <p
                className="font-sans mt-6"
                style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}
              >
                {t.advisory_page.intro}
              </p>
            </Reveal>

            {/* Film grain detail */}
            <Reveal delay={400} variant="fade">
              <div className="mt-10 flex items-center gap-4">
                <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                <span className="font-sans uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gold)', opacity: 0.6 }}>
                  VDH Enterprises · Barcelona
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          "DO I NEED?" — Objection handling, editorial style
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
            {/* Left — question */}
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="text-navy text-balance">
                  {t.advisory_page.need_title}
                </h2>
              </Reveal>
            </div>

            {/* Right — answer */}
            <div className="lg:col-span-3">
              <Reveal delay={150} variant="fade">
                <p
                  className="text-text-muted"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                >
                  {t.advisory_page.need_p1}
                </p>
              </Reveal>

              <Reveal delay={250} variant="fade">
                <p
                  className="text-text-muted mt-6"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                >
                  {t.advisory_page.need_p2}
                </p>
              </Reveal>

              {/* Pull quote */}
              <Reveal delay={350}>
                <blockquote
                  className="mt-10 pl-8 border-l-2 border-gold"
                >
                  <p
                    className="font-serif italic text-navy"
                    style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7 }}
                  >
                    &ldquo;{t.advisory_page.need_quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          "NO CURE, NO PAY" — Pricing value banner
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
            <p
              className="font-sans uppercase tracking-widest text-navy/50"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              {t.advisory_page.pricing_title}
            </p>
            <p
              className="font-serif text-navy"
              style={{ fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              {t.advisory_page.pricing_badge}
            </p>
          </Reveal>

          <Reveal delay={200} variant="fade">
            <p
              className="text-navy/70 mt-8 mx-auto"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, maxWidth: '600px' }}
            >
              {t.advisory_page.pricing_text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIAL — Joel Kahn feature
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <div className="text-center">
              <div
                className="mx-auto mb-8 w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30"
              >
                <Image
                  src="https://vdhenterprises.com/wp-content/uploads/2017/01/Foto-Joel-opt.jpg"
                  alt={t.advisory_page.testimonial_name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              <blockquote>
                <p
                  className="font-serif italic text-off-white/80 text-balance"
                  style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8 }}
                >
                  &ldquo;{t.advisory_page.testimonial_quote}&rdquo;
                </p>
              </blockquote>

              <div className="mt-8">
                <p className="font-sans text-off-white" style={{ fontSize: 'var(--text-sm)' }}>
                  {t.advisory_page.testimonial_name}
                </p>
                <p className="font-sans text-off-white/40 mt-1" style={{ fontSize: 'var(--text-xs)' }}>
                  {t.advisory_page.testimonial_origin} · {t.advisory_page.testimonial_project}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CLOSING CTA — Credentials + Contact
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10 text-center"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <h2 className="text-navy text-balance">{t.advisory_page.closing_title}</h2>
          </Reveal>

          <Reveal delay={150} variant="fade">
            <p
              className="text-text-muted mt-6 mx-auto"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, maxWidth: '560px' }}
            >
              {t.advisory_page.closing_text}
            </p>
          </Reveal>

          {/* Credential logos */}
          <Reveal delay={300} variant="fade">
            <div className="flex justify-center items-center gap-10 mt-12 opacity-50">
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/Registre4261-color647-800px.jpg"
                alt="AICAT Registered Agent #4261"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '44px', width: 'auto' }}
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/aepi-color-2.jpg"
                alt="AEPI Member"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '44px', width: 'auto' }}
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/eurocertif-2.jpg"
                alt="European Certification"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '44px', width: 'auto' }}
              />
            </div>
          </Reveal>

          {/* CTA button + contact */}
          <Reveal delay={450} variant="fade">
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                href={getLocalizedPath('contact', locale as Locale)}
                className="inline-flex items-center gap-3 bg-navy px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-navy-light"
                style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.12em' }}
              >
                {t.advisory_page.cta}
                <span aria-hidden="true">→</span>
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
