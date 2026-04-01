import Image from 'next/image';
import { locales, type Locale } from '@/lib/i18n';
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
          HERO — Full-screen with Paul's portrait
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2017/02/about-Paul-vdh.jpg"
            alt="Paul van den Hout"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-navy-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 to-transparent" />
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
                {t.about_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.about_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.about_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BIO — Two-column: photo + text
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <Reveal variant="slide-left">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ maxHeight: '600px' }}>
                <Image
                  src="https://vdhenterprises.com/wp-content/uploads/2017/02/about-Paul-vdh.jpg"
                  alt="Paul van den Hout"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-navy" style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
                  {t.about_page.bio_1}
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-warm-grey" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
                  {t.about_page.bio_2}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-warm-grey" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
                  {t.about_page.bio_3}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-warm-grey" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
                  {t.about_page.bio_4}
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="text-warm-grey" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
                  {t.about_page.bio_5}
                </p>
              </Reveal>
            </div>
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
            <h2 className="text-navy text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
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
            <h2 className="text-off-white text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
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
