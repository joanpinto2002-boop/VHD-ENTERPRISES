'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { type Locale, getLocalizedPath, locales, resolveSlug } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

function useCurrentPageKey(locale: Locale): string {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  let slug: string;
  if (locales.includes(segments[0] as Locale) && segments[0] !== 'en') {
    slug = segments.slice(1).join('/');
  } else {
    slug = segments.join('/');
  }

  if (!slug) return 'home';
  const resolved = resolveSlug(slug);
  return resolved?.page ?? 'home';
}

export function Header({ locale, t }: { locale: Locale; t: Messages }) {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const currentPage = useCurrentPageKey(locale);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Find the first section after the hero (second <section> in the page)
      const sections = document.querySelectorAll('section');
      const nextSection = sections[1];
      if (nextSection) {
        const rect = nextSection.getBoundingClientRect();
        setScrolled(rect.top <= 80);
      } else {
        setScrolled(window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  }, [locale]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceItems = [
    { label: t.nav.services_advisory, page: 'advisory' },
    { label: t.nav.services_fullservice, page: 'full-service' },
    { label: t.nav.services_investment, page: 'investment' },
    { label: t.nav.services_market, page: 'market' },
  ];

  const contactPath = getLocalizedPath('contact', locale);

  const active = scrolled || hovered;

  const linkClass = (isActive: boolean) =>
    `font-sans text-sm tracking-wide transition-all hover:opacity-70 ${
      isActive ? 'text-navy' : 'text-white/90'
    }`;

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          scrolled || hovered
            ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
        style={{ transitionDuration: 'var(--duration-base)' }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)', height: 'var(--header-height)' }}
        >
          {/* Logo */}
          <Link
            href={getLocalizedPath('home', locale)}
            className={`font-serif tracking-tight transition-colors ${
              active ? 'text-navy' : 'text-white'
            }`}
            style={{ fontSize: 'var(--text-xl)', transitionDuration: 'var(--duration-base)', fontWeight: 500, letterSpacing: '-0.02em' }}
          >
            VDH
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Welcome */}
            <Link
              href={getLocalizedPath('home', locale)}
              className={linkClass(active)}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.nav.welcome}
            </Link>

            {/* About */}
            <Link
              href={getLocalizedPath('about', locale)}
              className={linkClass(active)}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.nav.about}
            </Link>

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`font-sans text-sm tracking-wide transition-all hover:opacity-70 flex items-center gap-1 ${
                  active ? 'text-navy' : 'text-white/90'
                }`}
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {t.nav.services}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border border-navy/5 py-2"
                  style={{ borderRadius: '2px' }}
                >
                  {serviceItems.map((item) => (
                    <Link
                      key={item.page}
                      href={getLocalizedPath(item.page, locale)}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-2.5 font-sans text-sm text-navy/80 hover:bg-off-white hover:text-navy transition-colors"
                      style={{ transitionDuration: 'var(--duration-fast)' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              href={getLocalizedPath('portfolio', locale)}
              className={linkClass(active)}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.nav.projects}
            </Link>

            {/* Blog */}
            <Link
              href={getLocalizedPath('insights', locale)}
              className={linkClass(active)}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.nav.blog}
            </Link>

            {/* Language switcher */}
            <div className="flex items-center gap-1.5">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={getLocalizedPath(currentPage, l)}
                  className={`font-sans text-xs uppercase transition-all px-1.5 py-0.5 ${
                    l === locale
                      ? active ? 'text-navy font-semibold' : 'text-white font-semibold'
                      : active ? 'text-text-muted hover:text-navy' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  {l}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={contactPath}
              className={`inline-flex items-center gap-2 font-sans text-sm font-medium px-5 py-2 transition-all ${
                active
                  ? 'bg-navy text-white hover:bg-navy-light'
                  : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
              }`}
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.nav.contact}
              <span aria-hidden="true" className="text-xs">→</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1.5 transition-colors ${active ? 'text-navy' : 'text-white'}`}
              style={{ transitionDuration: 'var(--duration-fast)' }}
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-off-white flex flex-col items-center justify-center gap-6 lg:hidden overflow-y-auto"
          style={{ paddingTop: 'var(--header-height)', paddingBottom: 'var(--space-xl)' }}
        >
          {/* Welcome */}
          <Link
            href={getLocalizedPath('home', locale)}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-navy"
          >
            {t.nav.welcome}
          </Link>

          {/* About */}
          <Link
            href={getLocalizedPath('about', locale)}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-navy"
          >
            {t.nav.about}
          </Link>

          {/* Services (expandable) */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="font-serif text-2xl text-navy flex items-center gap-2"
            >
              {t.nav.services}
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col items-center gap-3 mt-3">
                {serviceItems.map((item) => (
                  <Link
                    key={item.page}
                    href={getLocalizedPath(item.page, locale)}
                    onClick={() => setMenuOpen(false)}
                    className="font-sans text-base text-text-muted hover:text-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          <Link
            href={getLocalizedPath('portfolio', locale)}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-navy"
          >
            {t.nav.projects}
          </Link>

          {/* Blog */}
          <Link
            href={getLocalizedPath('insights', locale)}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-2xl text-navy"
          >
            {t.nav.blog}
          </Link>

          <hr className="w-16 border-border" />

          <div className="flex items-center gap-4 text-sm text-text-muted">
            {locales.map((l) => (
              <Link
                key={l}
                href={getLocalizedPath(currentPage, l)}
                onClick={() => setMenuOpen(false)}
                className={`uppercase ${l === locale ? 'font-semibold text-navy' : ''}`}
              >
                {l}
              </Link>
            ))}
          </div>

          <a href="tel:+34609321308" className="text-text-muted text-sm">
            (+34) 609 321 308
          </a>

          <Link
            href={contactPath}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 bg-navy text-white font-medium px-6 py-3"
          >
            {t.nav.contact}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </>
  );
}
