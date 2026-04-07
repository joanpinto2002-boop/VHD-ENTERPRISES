'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  ];

  const contactPath = getLocalizedPath('contact', locale);

  const linkClass = () =>
    'font-sans text-sm tracking-wide transition-colors text-navy/70 hover:text-navy';

  return (
    <>
      {/* ══════════════════════════════════════════════════
          Floating header — always white, Apple/Porsche pill
          ══════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ padding: 'clamp(0.6rem, 1.5vh, 1rem) clamp(1rem, 3vw, 2rem)' }}
      >
        <div
          className="pointer-events-auto mx-auto flex items-center justify-between transition-all"
          style={{
            maxWidth: '1280px',
            height: '52px',
            padding: '0 clamp(1.2rem, 2.5vw, 2rem)',
            background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
            borderRadius: '14px',
            boxShadow: scrolled
              ? '0 4px 24px rgba(26,35,50,0.10), 0 1px 3px rgba(26,35,50,0.06)'
              : '0 2px 12px rgba(26,35,50,0.06), 0 1px 2px rgba(26,35,50,0.04)',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo */}
          <Link
            href={getLocalizedPath('home', locale)}
            className="transition-opacity hover:opacity-80 shrink-0"
          >
            <Image
              src="/images/vdh-logo.png"
              alt="VDH Enterprises"
              width={140}
              height={42}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href={getLocalizedPath('home', locale)} className={linkClass()}>
              {t.nav.welcome}
            </Link>

            <Link href={getLocalizedPath('about', locale)} className={linkClass()}>
              {t.nav.about}
            </Link>

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="font-sans text-sm tracking-wide transition-colors text-navy/70 hover:text-navy flex items-center gap-1 cursor-pointer"
              >
                {t.nav.services}
                <svg
                  width="10" height="10" viewBox="0 0 10 10"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 bg-white/95 backdrop-blur-xl shadow-lg border border-navy/5 py-2"
                  style={{ borderRadius: '10px' }}
                >
                  {serviceItems.map((item) => (
                    <Link
                      key={item.page}
                      href={getLocalizedPath(item.page, locale)}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-2.5 font-sans text-sm text-navy/70 hover:bg-off-white hover:text-navy transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={getLocalizedPath('portfolio', locale)} className={linkClass()}>
              {t.nav.projects}
            </Link>

            <Link href={getLocalizedPath('insights', locale)} className={linkClass()}>
              {t.nav.blog}
            </Link>

            {/* Language switcher */}
            <div className="flex items-center gap-1 ml-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={getLocalizedPath(currentPage, l)}
                  className={`font-sans text-xs uppercase px-1.5 py-0.5 transition-colors ${
                    l === locale ? 'text-navy font-semibold' : 'text-navy/40 hover:text-navy/70'
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={contactPath}
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium px-4 py-1.5 bg-navy text-white hover:bg-navy-light transition-colors"
              style={{ borderRadius: '8px' }}
            >
              {t.nav.contact}
              <span aria-hidden="true" className="text-xs">→</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-navy lg:hidden cursor-pointer"
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
