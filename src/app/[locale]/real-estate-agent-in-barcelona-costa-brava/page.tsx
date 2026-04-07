import { locales, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { ContactPageContent } from '@/components/sections/ContactPageContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('contact', locale as Locale);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return <ContactPageContent t={t} />;
}

