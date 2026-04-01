import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const t = getMessages(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} t={t} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} t={t} />
      <CookieConsent locale={locale as Locale} t={t} />
    </>
  );
}
