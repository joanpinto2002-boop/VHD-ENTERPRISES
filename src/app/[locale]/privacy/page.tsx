import { locales, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('privacy', locale as Locale);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const sections = [
    { title: t.privacy_page.section1_title, text: t.privacy_page.section1_text },
    { title: t.privacy_page.section2_title, text: t.privacy_page.section2_text },
    { title: t.privacy_page.section3_title, text: t.privacy_page.section3_text },
    { title: t.privacy_page.section4_title, text: t.privacy_page.section4_text },
    { title: t.privacy_page.section5_title, text: t.privacy_page.section5_text },
  ];

  return (
    <section
      className="bg-off-white"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-narrow)' }}>
        <Reveal>
          <p
            className="font-sans text-gold uppercase tracking-widest"
            style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
          >
            {t.privacy_page.updated}
          </p>
          <h1
            className="text-navy"
            style={{ fontSize: 'var(--text-3xl)', lineHeight: 1.2, marginBottom: 'var(--space-xl)' }}
          >
            {t.privacy_page.title}
          </h1>
          <p className="text-text-muted" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
            {t.privacy_page.intro}
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
              <p className="text-text-muted" style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
