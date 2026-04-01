import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale, slugMap } from '@/lib/i18n';

// Resolve a locale-specific slug to its EN filesystem slug
function resolveToEnSlug(locale: Locale, slug: string): string | null {
  for (const [, slugs] of Object.entries(slugMap)) {
    if (slugs[locale] === slug) {
      return slugs.en;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales.includes(firstSegment as Locale) && firstSegment !== defaultLocale) {
    const locale = firstSegment as Locale;
    const slug = segments.slice(1).join('/');

    if (!slug) {
      const res = NextResponse.next();
      res.headers.set('x-vdh-locale', locale);
      return res;
    }

    // Resolve locale-specific slug to EN slug for filesystem routing
    const enSlug = resolveToEnSlug(locale, slug);
    if (enSlug !== null && enSlug !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = enSlug === '' ? `/${locale}` : `/${locale}/${enSlug}`;
      const res = NextResponse.rewrite(url);
      res.headers.set('x-vdh-locale', locale);
      return res;
    }

    const res = NextResponse.next();
    res.headers.set('x-vdh-locale', locale);
    return res;
  }

  // Default locale (en): rewrite to /en/...
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  const res = NextResponse.rewrite(url);
  res.headers.set('x-vdh-locale', 'en');
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon.ico|.*\\.).*)'],
};
