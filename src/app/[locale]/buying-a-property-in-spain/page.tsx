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
  return getPageMetadata('insights', locale as Locale);
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const articles = [
    { title: t.insights_page.article1_title, text: t.insights_page.article1_text },
    { title: t.insights_page.article2_title, text: t.insights_page.article2_text },
    { title: t.insights_page.article3_title, text: t.insights_page.article3_text },
    { title: t.insights_page.article4_title, text: t.insights_page.article4_text },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Sagrada Familia Barcelona
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src="https://vdhenterprises.com/wp-content/uploads/2017/01/Sagrada-Familia-opt.jpg"
            alt="Barcelona skyline with Sagrada Familia"
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
                {t.insights_page.label}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.insights_page.title}
              </h1>
            </Reveal>

            <Reveal delay={400} variant="fade">
              <p
                className="text-white/70 mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.insights_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO — Editorial
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
              {t.insights_page.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ARTICLES — Static blog-style editorial cards
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-3xl)' }}
            >
              {t.insights_page.articles_label}
            </p>
          </Reveal>

          <div className="space-y-0">
            {articles.map((article, i) => (
              <Reveal key={i} delay={i * 100} variant="fade">
                <article
                  className="border-t border-navy/10 py-12 lg:py-16 grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
                >
                  <div className="lg:col-span-4">
                    <span
                      className="font-sans text-gold/30"
                      style={{ fontSize: 'var(--text-4xl)', fontWeight: 300, lineHeight: 1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2
                      className="text-navy mt-3"
                      style={{ fontSize: 'var(--text-xl)', lineHeight: 1.3 }}
                    >
                      {article.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-8">
                    <p
                      className="text-text-muted"
                      style={{ fontSize: 'var(--text-base)', lineHeight: 1.9 }}
                    >
                      {article.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            <div className="border-t border-navy/10" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BLOG ARTICLES — Links to individual posts
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-white"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal>
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-2xl)' }}
            >
              {t.insights_page.articles_label}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'blog-process' as const, t: t.blog_process },
              { key: 'blog-barcelona' as const, t: t.blog_barcelona },
              { key: 'blog-sitges' as const, t: t.blog_sitges },
              { key: 'blog-foreigners' as const, t: t.blog_foreigners },
              { key: 'blog-demand' as const, t: t.blog_demand },
              { key: 'blog-brexit' as const, t: t.blog_brexit },
            ].map((post, i) => (
              <Reveal key={i} delay={i * 80} variant="fade">
                <Link
                  href={`/${getLocalizedPath(post.key, locale as Locale)}`}
                  className="block group border border-navy/10 p-6 rounded-lg hover:border-gold/40 transition-colors"
                >
                  <p
                    className="font-sans text-gold uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.15em', marginBottom: 'var(--space-xs)' }}
                  >
                    {post.t.label}
                  </p>
                  <h3
                    className="text-navy group-hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-base)', lineHeight: 1.4 }}
                  >
                    {post.t.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA — Ready to take the next step?
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
              {t.insights_page.cta_title}
            </h2>
          </Reveal>

          <Reveal delay={150} variant="fade">
            <p
              className="text-off-white/60 mt-6 mx-auto"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, maxWidth: '500px' }}
            >
              {t.insights_page.cta_text}
            </p>
          </Reveal>

          <Reveal delay={300} variant="fade">
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
