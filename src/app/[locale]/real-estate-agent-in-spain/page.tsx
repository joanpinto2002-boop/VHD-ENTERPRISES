import Image from 'next/image';
import Link from 'next/link';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('about', locale as Locale);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const credentials = [
    t.about_page.cred_1,
    t.about_page.cred_2,
    t.about_page.cred_3,
    t.about_page.cred_4,
    t.about_page.cred_5,
    t.about_page.cred_6,
    t.about_page.cred_7,
    t.about_page.cred_8,
    t.about_page.cred_9,
  ];

  const timeline = [
    { year: '1989', place: 'Madrid', desc: t.about_page.timeline_1989 },
    { year: '1995', place: 'Barcelona', desc: t.about_page.timeline_1995 },
    { year: '2014', place: 'ESADE', desc: t.about_page.timeline_2014 },
    { year: '—', place: 'LIVT', desc: t.about_page.timeline_livt },
    { year: '—', place: 'El Camino', desc: t.about_page.timeline_camino },
  ];

  const testimonials = [
    {
      quote: "Paul is a trustful consultant with tremendous expertise in real estate and business in Spain. Focus on the aim, supportive and helpful. He helped me to acquire an apartment in Barcelona but offered much more like a perfect renovation and organizing all services needed to enjoy being an inhabitant in Barcelona. He became a professional friend who is there when you need him.",
      name: 'Jaap Boonstra',
      origin: 'From Amsterdam',
      project: 'Apartment in Barcelona',
    },
    {
      quote: "We found the services of VDH through the internet. Within hours they sent us a complete report with the 'ins & outs' of the local market and a quote of the proposed services. We found a unique apartment, in downtown BCN, did the negotiations together, and had a fantastic deal! With such an important decision, it felt very safe to have someone you could trust.",
      name: 'Joel Kahn',
      origin: 'From Australia',
      project: 'Apartment in Barcelona',
    },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Text-only, content hierarchy
          ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'clamp(7rem, 14vh, 10rem)',
          paddingBottom: 'clamp(5rem, 10vh, 8rem)',
        }}
      >
        <div
          className="mx-auto px-6 lg:px-10 w-full"
          style={{ maxWidth: '1280px' }}
        >
          <div className="grid lg:grid-cols-[4fr_5fr] gap-12 lg:gap-16 items-center">

            {/* Left: Text block */}
            <div style={{ maxWidth: '580px' }}>

            {/* Eyebrow label */}
            <Reveal variant="fade">
              <p
                className="font-sans uppercase tracking-widest"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  color: 'var(--gold)',
                  marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                }}
              >
                {t.about_page.label}
              </p>
            </Reveal>

            {/* Main headline */}
            <Reveal delay={150}>
              <h1
                className="font-serif text-navy"
                style={{
                  fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                }}
              >
                {t.about_page.title}
              </h1>
            </Reveal>

            {/* Subheadline */}
            <Reveal delay={300} variant="fade">
              <p
                className="font-sans"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  lineHeight: 1.7,
                  color: 'var(--navy)',
                  opacity: 0.55,
                  marginTop: 'clamp(1.25rem, 2.5vw, 2rem)',
                  maxWidth: '520px',
                }}
              >
                {t.about_page.subtitle}
              </p>
            </Reveal>

            {/* Authority line */}
            <Reveal delay={420} variant="fade">
              <p
                className="font-sans"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  color: 'var(--navy)',
                  opacity: 0.3,
                  marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                }}
              >
                {t.about_page.hero_authority}
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={550} variant="fade">
              <Link
                href={getLocalizedPath('contact', locale as Locale)}
                className="font-sans inline-flex items-center gap-2.5 hover:opacity-85 transition-opacity"
                style={{
                  marginTop: 'clamp(2rem, 4vw, 3rem)',
                  padding: '0.9rem 2rem',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'white',
                  background: 'var(--navy)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                {t.about_page.hero_cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                </svg>
              </Link>
            </Reveal>

            </div>

            {/* Right: Paul's portrait */}
            <Reveal delay={300} variant="fade">
              <div className="relative hidden lg:block" style={{ aspectRatio: '5/4', borderRadius: '16px', overflow: 'hidden' }}>
                <Image
                  src="https://vdhenterprises.com/wp-content/uploads/2017/02/about-Paul-vdh.jpg"
                  alt="Paul van den Hout"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BIO — Stats + narrative (no duplicate photo)
          ══════════════════════════════════════════════════════════ */}
      <section
        style={{ background: '#fff', paddingTop: 'clamp(5rem, 10vh, 8rem)', paddingBottom: 'clamp(5rem, 10vh, 8rem)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: '1280px' }}>

          {/* Section header */}
          <Reveal variant="fade">
            <p
              className="font-sans uppercase tracking-widest"
              style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '1rem' }}
            >
              {t.about_page.bio_label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="font-serif text-navy"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t.about_page.bio_title}
            </h2>
          </Reveal>

          {/* Stats strip */}
          <Reveal variant="fade">
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-px"
              style={{
                background: 'rgba(26,35,50,0.06)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: 'clamp(3.5rem, 7vw, 5rem)',
              }}
            >
              {[
                { value: t.about_page.stat_years_value, label: t.about_page.stat_years_label },
                { value: t.about_page.stat_languages_value, label: t.about_page.stat_languages_label },
                { value: t.about_page.stat_since_value, label: t.about_page.stat_since_label },
                { value: t.about_page.stat_clients_value, label: t.about_page.stat_clients_label },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)',
                    textAlign: 'center',
                  }}
                >
                  <p className="font-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1, color: '#fcb040', letterSpacing: '-0.03em' }}>
                    {stat.value}
                  </p>
                  <p className="font-sans text-navy/40" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '8px' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Two-column narrative */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: Lead intro */}
            <div className="lg:col-span-2">
              <Reveal>
                <p
                  className="font-serif text-navy"
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', lineHeight: 1.5, letterSpacing: '-0.02em' }}
                >
                  {t.about_page.bio_intro}
                </p>
              </Reveal>
            </div>

            {/* Right: Bio paragraphs */}
            <div className="lg:col-span-3">
              <Reveal delay={100}>
                <p className="font-sans text-navy/80" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.85, marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  {t.about_page.bio_1}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="font-sans text-navy/60" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.85, marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  {t.about_page.bio_2}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="font-sans text-navy/60" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.85, marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  {t.about_page.bio_3}
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="font-sans text-navy/60" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.85, marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                  {t.about_page.bio_4}
                </p>
              </Reveal>
              <Reveal delay={500}>
                <p className="font-sans text-navy/60" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.85 }}>
                  {t.about_page.bio_5}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Photo mosaic */}
          <Reveal variant="fade" delay={200}>
            <div
              className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] gap-4"
              style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              <div className="relative md:row-span-2" style={{ aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src="/images/paul-vdh-2.jpg"
                  alt="Paul van den Hout con maqueta"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="relative md:col-span-2" style={{ aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src="/images/paul-vdh-1.jpg"
                  alt="Paul van den Hout"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
              <div className="relative md:col-span-2" style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src="/images/paul-vdh-3.jpg"
                  alt="Paul van den Hout en stand"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — 3 core services
          ══════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: 'var(--navy)', paddingTop: 'clamp(5rem, 10vh, 8rem)', paddingBottom: 'clamp(5rem, 10vh, 8rem)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: '1280px' }}>

          {/* Section header */}
          <Reveal variant="fade">
            <p
              className="font-sans uppercase tracking-widest text-center"
              style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '1rem' }}
            >
              {t.about_page.services_label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="font-serif text-off-white text-center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t.about_page.services_title}
            </h2>
          </Reveal>

          {/* Service cards */}
          <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              {
                num: '01',
                title: t.solution.svc1_title,
                desc: t.solution.svc1_desc,
                href: getLocalizedPath('advisory', locale as Locale),
                icon: (
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="14" cy="16" r="6" /><path d="M18.5 20.5 27 29" /><path d="M23 25l3 3" /><path d="M26 22l3 3" />
                  </svg>
                ),
              },
              {
                num: '02',
                title: t.solution.svc2_title,
                desc: t.solution.svc2_desc,
                href: getLocalizedPath('investment', locale as Locale),
                icon: (
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 34h28" /><rect x="10" y="20" width="5" height="14" rx="1" /><rect x="17.5" y="12" width="5" height="22" rx="1" /><rect x="25" y="6" width="5" height="28" rx="1" />
                  </svg>
                ),
              },
              {
                num: '03',
                title: t.solution.svc3_title,
                desc: t.solution.svc3_desc,
                href: getLocalizedPath('full-service', locale as Locale),
                icon: (
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="6" width="16" height="28" rx="1" /><rect x="24" y="14" width="10" height="20" rx="1" />
                    <path d="M12 11h3M12 16h3M12 21h3M12 26h3M19 11h1M19 16h1M19 21h1M19 26h1" /><path d="M28 19h3M28 24h3" /><path d="M15 30v4h-3v-4" />
                  </svg>
                ),
              },
            ].map((svc, i) => (
              <Reveal key={i} delay={i * 120} variant="fade">
                <div
                  style={{ background: 'var(--navy)', padding: 'clamp(2rem, 4vw, 3rem)' }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                    {svc.icon}
                    <span className="font-sans" style={{ fontSize: '2rem', fontWeight: 200, color: 'rgba(252,176,64,0.2)' }}>
                      {svc.num}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-off-white"
                    style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.75rem' }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="font-sans text-off-white/50 flex-1"
                    style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}
                  >
                    {svc.desc}
                  </p>
                  <Link
                    href={svc.href}
                    className="font-sans inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity"
                    style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
                  >
                    {t.about_page.services_cta}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CAREER TIMELINE — Visual milestones
          ══════════════════════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: 'var(--light-grey)', paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans uppercase tracking-widest text-center"
              style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '1rem' }}
            >
              {t.about_page.timeline_label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="font-serif text-navy text-center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t.about_page.timeline_title}
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-navy/10 -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-12 lg:space-y-16">
              {timeline.map((item, i) => (
                <Reveal key={i} delay={i * 120} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                  <div className={`relative flex items-start gap-8 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Dot on timeline */}
                    <div
                      className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-off-white -translate-x-1/2 mt-2 z-10"
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div className={`ml-14 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                      <span
                        className="font-sans text-gold uppercase tracking-widest"
                        style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em' }}
                      >
                        {item.year} · {item.place}
                      </span>
                      <p
                        className="text-navy mt-2"
                        style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CREDENTIALS — Grid with numbers
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans uppercase tracking-widest text-center"
              style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: '1rem' }}
            >
              {t.about_page.credentials_label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="font-serif text-off-white text-center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t.about_page.credentials_title}
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {credentials.map((cred, i) => (
              <Reveal key={i} delay={i * 80} variant="fade">
                <div className="bg-navy p-8 lg:p-10 h-full">
                  <span
                    className="block font-sans text-gold/40 mb-3"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 300 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-off-white/80" style={{ fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                    {cred}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} variant="fade">
            <div className="mt-20 flex flex-wrap items-center justify-center gap-12">
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/eurocertif-2.jpg"
                alt="Eurocertif"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/Registre4261-color647-800px.jpg"
                alt="AICAT #4261"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/aepi-color-2.jpg"
                alt="AEPI"
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIAL STRIP — Two client quotes
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
              {t.about_page.testimonial_strip_title}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={i * 200} variant={i === 0 ? 'slide-left' : 'slide-right'}>
                <blockquote className="h-full flex flex-col">
                  <p
                    className="font-serif italic text-navy/70 flex-1"
                    style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-6 pt-6 border-t border-navy/10">
                    <p className="font-sans text-navy" style={{ fontSize: 'var(--text-sm)' }}>
                      {item.name}
                    </p>
                    <p className="font-sans text-warm-grey mt-1" style={{ fontSize: 'var(--text-xs)' }}>
                      {item.origin} · {item.project}
                    </p>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
