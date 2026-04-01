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
  return getPageMetadata('full-service', locale as Locale);
}

export default async function FullServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const services = [
    { num: '01', title: t.fullservice_page.service1_title, desc: t.fullservice_page.service1_desc },
    { num: '02', title: t.fullservice_page.service2_title, desc: t.fullservice_page.service2_desc },
    { num: '03', title: t.fullservice_page.service3_title, desc: t.fullservice_page.service3_desc },
    { num: '04', title: t.fullservice_page.service4_title, desc: t.fullservice_page.service4_desc },
  ];

  const projects = [
    { text: t.fullservice_page.project1, image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/27...-Duplex-Palamos-1.jpg' },
    { text: t.fullservice_page.project2, image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/pisina-118-ejemplo-grande.jpg' },
    { text: t.fullservice_page.project3, image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/DSC01150.jpg' },
    { text: t.fullservice_page.project4, image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/project-aro-3.png' },
    { text: t.fullservice_page.project5, image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/Project-Teules-2010-1.jpg' },
    { text: t.fullservice_page.project6, image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/096.jpg' },
    { text: t.fullservice_page.project7 },
    { text: t.fullservice_page.project8, image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/cocina-y-comedor.jpg' },
    { text: t.fullservice_page.project9 },
    { text: t.fullservice_page.project10 },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Full-screen meeting room
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2016/12/sala-de-juntas.jpg"
            alt="VDH Enterprises meeting room"
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
                {t.fullservice_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.fullservice_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.fullservice_page.subtitle}
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
              {t.fullservice_page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4 SERVICES — 2x2 grid on navy
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
              {t.fullservice_page.services_label}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-px bg-white/10">
            {services.map((service, i) => (
              <Reveal key={service.num} delay={i * 120} variant="fade">
                <div className="bg-navy p-10 lg:p-14 h-full">
                  <span
                    className="block font-sans text-gold/30"
                    style={{
                      fontSize: 'var(--text-5xl)',
                      fontWeight: 300,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      marginBottom: 'var(--space-lg)',
                    }}
                  >
                    {service.num}
                  </span>
                  <h3
                    className="text-off-white"
                    style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-off-white/50" style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COMPLETED PROJECTS — Gallery list with images
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="text-center" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
            <Reveal variant="fade">
              <p
                className="font-sans text-gold uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
              >
                {t.fullservice_page.projects_label}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-navy text-balance">{t.fullservice_page.projects_title}</h2>
            </Reveal>
          </div>

          {/* Project gallery grid */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.filter(p => p.image).map((project, i) => (
              <Reveal key={i} delay={i * 80} variant="scale">
                <div className="relative group overflow-hidden aspect-[4/3]">
                  <Image
                    src={project.image!}
                    alt={project.text}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '1.2s', transitionTimingFunction: 'var(--ease-out)' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-sans" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                      {project.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Remaining projects without images */}
          <Reveal delay={600} variant="fade">
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.filter(p => !p.image).map((project, i) => (
                <div
                  key={i}
                  className="border border-navy/10 p-6 flex items-center"
                >
                  <p className="text-navy font-sans" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                    {project.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIAL — Jaap Boonstra
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
                  src="https://vdhenterprises.com/wp-content/uploads/2017/01/Jaap-Boonstra-opt.jpg"
                  alt="Jaap Boonstra"
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
                  &ldquo;{t.fullservice_page.trust_quote}&rdquo;
                </p>
              </blockquote>

              <div className="mt-8">
                <p className="font-sans text-off-white" style={{ fontSize: 'var(--text-sm)' }}>
                  {t.fullservice_page.trust_author}
                </p>
              </div>
            </div>
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
                {t.fullservice_page.cta}
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
