import { locales, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { getOrganizationJsonLd } from '@/lib/jsonld';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('home', locale as Locale);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
      />
      <Hero locale={locale as Locale} t={t} />
      <Intro />
      <Solution locale={locale as Locale} t={t} />
      <Problem t={t} />
      <Projects t={t} />
      <Testimonials t={t} />
      <Contact t={t} />
    </>
  );
}
