import Image from 'next/image';
import Link from 'next/link';
import { locales, type Locale, getLocalizedPath } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { getArticleJsonLd } from '@/lib/jsonld';
import { Reveal } from '@/components/ui/Reveal';

const IMG = 'https://vdhenterprises.com/wp-content/uploads';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('blog-barcelona', locale as Locale);
}

export default async function BlogBarcelonaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  const a = t.blog_barcelona;

  const articleJsonLd = getArticleJsonLd({
    page: 'blog-barcelona',
    locale: locale as Locale,
    title: a.title,
    description: a.intro,
    datePublished: '2016-12-20',
    dateModified: '2026-03-28',
    image: `${IMG}/2016/12/IMG_0186.jpg`,
  });

  const sections = [
    { title: a.section1_title, text: a.section1_text },
    { title: a.section2_title, text: a.section2_text },
    { title: a.section3_title, text: a.section3_text },
    { title: a.section4_title, text: a.section4_text },
  ];

  const related = [
    { key: 'blog-process' as const, label: t.blog_process.label, title: t.blog_process.title },
    { key: 'blog-sitges' as const, label: t.blog_sitges.label, title: t.blog_sitges.title },
    { key: 'blog-demand' as const, label: t.blog_demand.label, title: t.blog_demand.title },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-navy-dark">
        <div className="absolute inset-0">
          <Image
            src={`${IMG}/2016/12/IMG_0186.jpg`}
            alt="Barcelona property — investment opportunity"
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
                {a.label}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h1
                className="text-white text-balance"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, var(--text-4xl))', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                {a.title}
              </h1>
            </Reveal>
            <Reveal delay={400} variant="fade">
              <p className="text-white/60 mt-4 font-sans" style={{ fontSize: 'var(--text-sm)' }}>
                {a.updated}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <p
              className="text-navy font-serif text-balance"
              style={{ fontSize: 'var(--text-xl)', lineHeight: 1.8 }}
            >
              {a.intro}
            </p>
          </Reveal>
          <div className="mt-16 space-y-12">
            {sections.map((s, i) => (
              <Reveal key={i} delay={i * 80} variant="fade">
                <h2
                  className="text-navy"
                  style={{ fontSize: 'var(--text-lg)', lineHeight: 1.4, marginBottom: 'var(--space-sm)' }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-text-muted"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}
                >
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section
        className="bg-white"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/30">
                <Image
                  src={`${IMG}/2017/01/about-Paul-vdh.jpg`}
                  alt="Paul van den Hout"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-navy font-serif" style={{ fontSize: 'var(--text-base)' }}>
                  Paul van den Hout
                </p>
                <p className="text-text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                  Founder, VDH Enterprises · Barcelona since 1995
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section
        className="bg-off-white"
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
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((r, i) => (
              <Reveal key={i} delay={i * 100} variant="fade">
                <Link
                  href={`/${getLocalizedPath(r.key, locale as Locale)}`}
                  className="block group"
                >
                  <p
                    className="font-sans text-gold uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.15em', marginBottom: 'var(--space-xs)' }}
                  >
                    {r.label}
                  </p>
                  <h3
                    className="text-navy group-hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-base)', lineHeight: 1.4 }}
                  >
                    {r.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10 text-center"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <h2
              className="text-white font-serif"
              style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.3, marginBottom: 'var(--space-md)' }}
            >
              {t.insights_page.cta_title}
            </h2>
            <p
              className="text-white/70"
              style={{ fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}
            >
              {t.insights_page.cta_text}
            </p>
            <Link
              href={`/${getLocalizedPath('contact', locale as Locale)}`}
              className="inline-block bg-gold hover:bg-gold-light text-navy font-sans font-semibold uppercase tracking-wider transition-colors"
              style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-sm) var(--space-xl)', letterSpacing: '0.1em' }}
            >
              {t.contact_page.label}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
