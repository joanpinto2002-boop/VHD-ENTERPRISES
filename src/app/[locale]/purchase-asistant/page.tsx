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
          HERO — Full-screen immersive with Barcelona skyline
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2017/01/Sagrada-Familia-opt.jpg"
            alt="Barcelona skyline near the Sagrada Familia"
            fill
            className="object-cover object-center"
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
                {t.advisory_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.advisory_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.advisory_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OPENING — Two-column: text + office photo
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <Reveal>
                <p
                  className="text-navy text-balance"
                  style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8 }}
                >
                  {t.advisory_page.opening}
                </p>
              </Reveal>

              <Reveal delay={200} variant="fade">
                <p
                  className="text-text-muted mt-8"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                >
                  {t.advisory_page.intro}
                </p>
              </Reveal>
            </div>

            <Reveal variant="slide-right">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ maxHeight: '600px' }}>
                <Image
                  src="https://vdhenterprises.com/wp-content/uploads/2016/12/sala-de-juntas.jpg"
                  alt="VDH Enterprises meeting room in Barcelona"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESS TIMELINE — Visual 5-step journey
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              {t.advisory_page.process_label}
            </p>
          </Reveal>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Vertical line — hidden on mobile, visible on lg */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px bg-gold/15 hidden lg:block"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * 120} variant="fade">
                  <div className="relative flex gap-8 lg:gap-16 items-start py-10 lg:py-14">
                    {/* Step number with dot */}
                    <div className="relative shrink-0 flex flex-col items-center" style={{ width: '64px' }}>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-gold bg-navy z-10 hidden lg:block"
                        style={{ marginLeft: '-0.5px' }}
                      />
                      <span
                        className="font-sans text-gold/30 lg:mt-4"
                        style={{ fontSize: 'var(--text-3xl)', fontWeight: 300, lineHeight: 1 }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-0 lg:pt-0">
                      <h3
                        className="text-off-white"
                        style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-off-white/50"
                        style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, maxWidth: '560px' }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Divider between steps */}
                  {i < steps.length - 1 && (
                    <div className="border-b border-white/5 lg:ml-16" />
                  )}
                </Reveal>
              ))}
            </div>
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
