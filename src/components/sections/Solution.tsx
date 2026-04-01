import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function Solution({ locale, t }: { locale: Locale; t: Messages }) {
  const services = [
    { num: '01', title: t.solution.svc1_title, desc: t.solution.svc1_desc, link: t.solution.svc1_link },
    { num: '02', title: t.solution.svc2_title, desc: t.solution.svc2_desc, link: t.solution.svc2_link },
    { num: '03', title: t.solution.svc3_title, desc: t.solution.svc3_desc, link: t.solution.svc3_link },
  ];

  return (
    <section
      className="bg-navy"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Section header */}
        <div className="text-center" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              {t.solution.label}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-off-white text-balance">{t.solution.title}</h2>
          </Reveal>
          <Reveal delay={200} variant="fade">
            <p
              className="mt-6 text-off-white/60"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7 }}
            >
              {t.solution.intro}
            </p>
          </Reveal>
        </div>

        {/* Services — 3 columns */}
        <div className="mt-20 grid gap-px bg-white/10 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 120} variant="fade">
              <div className="bg-navy p-8 lg:p-12 h-full flex flex-col">
                <span
                  className="block font-sans text-gold/25"
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 200,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 'var(--space-lg)',
                  }}
                >
                  {service.num}
                </span>

                <h3
                  className="text-off-white"
                  style={{ fontSize: 'var(--text-xl)', fontWeight: 500, marginBottom: 'var(--space-md)' }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-off-white/50 flex-1"
                  style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8 }}
                >
                  {service.desc}
                </p>

                <Link
                  href={getLocalizedPath(service.link, locale)}
                  className="inline-flex items-center gap-2 mt-8 font-sans text-gold/80 transition-colors hover:text-gold"
                  style={{ fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  {t.solution.cta}
                  <span aria-hidden="true" className="text-xs">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
