import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function CTAFinal({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <section
      className="bg-off-white"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Photo column — meeting room */}
          <Reveal variant="slide-left">
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

          {/* Text column */}
          <div>
            <Reveal>
              <h2 className="text-navy text-balance">{t.cta_final.title}</h2>
            </Reveal>

            <Reveal delay={150} variant="fade">
              <blockquote className="mt-8">
                <p
                  className="text-text-muted font-serif italic"
                  style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7 }}
                >
                  &ldquo;{t.cta_final.text}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="font-sans text-warm-grey" style={{ fontSize: 'var(--text-sm)' }}>
                    {(t.cta_final as Record<string, string>).quote_author || '— Martin Van Beelen, Decss BV'}
                  </p>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={300} variant="fade">
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href={getLocalizedPath('contact', locale)}
                  className="inline-flex items-center gap-3 bg-navy px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-navy-light"
                  style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.12em' }}
                >
                  {t.cta_final.button}
                  <span aria-hidden="true">→</span>
                </Link>

                <a
                  href={`tel:${t.cta_final.phone.replace(/\s/g, '')}`}
                  className="font-sans text-navy transition-colors hover:text-gold"
                  style={{ fontSize: 'var(--text-base)', transitionDuration: 'var(--duration-fast)' }}
                >
                  {t.cta_final.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={450} variant="fade">
              <div className="mt-10 flex items-center gap-6">
                <a
                  href="mailto:office@vdhenterprises.com"
                  className="font-sans text-text-muted text-sm transition-colors hover:text-navy"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  office@vdhenterprises.com
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
