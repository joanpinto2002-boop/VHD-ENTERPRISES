'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type en from '@/messages/en.json';
import { type Locale, getLocalizedPath } from '@/lib/i18n';

const WHATSAPP_NUMBER = '34609321308';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

export function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      /* Video — cinematic reveal */
      tl.fromTo(
        videoWrapRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 3, ease: 'power1.out' },
        0
      );

      /* Content elements — progressive fade-in */
      const reveals = gsap.utils.toArray<HTMLElement>('.hero-reveal');
      reveals.forEach((el, i) => {
        tl.fromTo(el,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
          0.6 + i * 0.18
        );
      });

      /* Gold animated line */
      tl.fromTo('.hero-gold-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
        1.6
      );

      /* HUD grid lines */
      tl.fromTo('.hero-hud-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.5, ease: 'power1.inOut', stagger: 0.3 },
        2.0
      );

      /* Trust bar */
      tl.fromTo(trustRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        2.8
      );

      /* Scroll parallax — video */
      gsap.to(videoWrapRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* Scroll dissolve — content */
      gsap.to(contentRef.current, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* Trust bar scroll fade */
      gsap.to(trustRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '70% top',
          end: '90% top',
          scrub: true,
        },
      });

      /* Scroll indicator bounce */
      gsap.fromTo('.hero-scroll-indicator',
        { y: 0, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 3.5 }
      );
      gsap.to('.hero-scroll-indicator', {
        y: 8,
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const trustPillars = [
    { value: t.hero.trust_years, label: t.hero.trust_years_label },
    { value: t.hero.trust_clients, label: t.hero.trust_clients_label },
    { value: t.hero.trust_languages, label: t.hero.trust_languages_label },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden bg-navy-dark"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Video background with cinematic treatment ── */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 40%',
            filter: 'saturate(0.8) contrast(1.15)',
            backgroundColor: '#1a2332',
          }}
        >
          <source src="/videos/videoheroinicio.mp4" type="video/mp4" />
        </video>

        {/* Cinematic film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* ── Overlay — strong navy overlay + gradients ── */}
      <div className="absolute inset-0 z-[1]">
        {/* Uniform navy tint */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(26, 35, 50, 0.55)' }}
        />
        {/* Bottom-up darkness */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(17,24,34,0.92) 0%, rgba(17,24,34,0.5) 40%, rgba(17,24,34,0.15) 70%, rgba(17,24,34,0.08) 100%)' }}
        />
        {/* Left-side darkness (text readability) */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(17,24,34,0.7) 0%, rgba(17,24,34,0.45) 40%, rgba(17,24,34,0.25) 60%, rgba(17,24,34,0.15) 100%)' }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(17,24,34,0.4) 0%, transparent 25%)' }}
        />
      </div>

      {/* ── HUD subtle tech lines ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
        {/* Vertical grid lines */}
        <div
          className="hero-hud-line absolute"
          style={{ top: 0, bottom: 0, left: '25%', width: '1px', background: 'rgba(255,255,255,0.03)' }}
        />
        <div
          className="hero-hud-line absolute"
          style={{ top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(255,255,255,0.025)' }}
        />
        <div
          className="hero-hud-line absolute"
          style={{ top: 0, bottom: 0, left: '75%', width: '1px', background: 'rgba(255,255,255,0.02)' }}
        />
        {/* Corner frame accent */}
        <div
          className="absolute"
          style={{ top: 'clamp(2rem, 4vh, 3.5rem)', left: 'clamp(2rem, 4vw, 3.5rem)', width: '30px', height: '30px', borderTop: '1px solid rgba(212,168,67,0.15)', borderLeft: '1px solid rgba(212,168,67,0.15)' }}
        />
        <div
          className="absolute"
          style={{ bottom: 'clamp(2rem, 4vh, 3.5rem)', right: 'clamp(2rem, 4vw, 3.5rem)', width: '30px', height: '30px', borderBottom: '1px solid rgba(212,168,67,0.15)', borderRight: '1px solid rgba(212,168,67,0.15)' }}
        />
      </div>

      {/* ── Main content — left-aligned, compact ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex items-center will-change-transform"
        style={{
          paddingTop: 'clamp(5rem, 12vh, 10rem)',
          paddingBottom: 'clamp(4rem, 10vh, 10rem)',
        }}
      >
        <div
          className="w-full mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="text-left md:text-center" style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Authority anchor — animated line + tagline */}
            <div className="hero-reveal flex items-center justify-start md:justify-center gap-4" style={{ marginBottom: 'clamp(1.2rem, 3vh, 3rem)' }}>
              <div
                className="hero-gold-line bg-gold/40 hidden md:block"
                style={{ width: '32px', height: '1px', transform: 'scaleX(0)' }}
              />
              <p
                className="font-sans text-white/50 uppercase"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                }}
              >
                {t.hero.tagline}
              </p>
            </div>

            {/* Headline — two weights for hierarchy */}
            <h1 style={{ marginBottom: 'clamp(1rem, 3vh, 3rem)' }}>
              {/* Line 1 — light */}
              <span
                className="hero-reveal block font-serif text-white/85"
                style={{
                  fontSize: 'clamp(1.55rem, 4vw, 3.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {t.hero.title_line1}
              </span>

              {/* Line 2 — bold */}
              <span
                className="hero-reveal block font-serif text-white"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginTop: '0.1em',
                }}
              >
                {t.hero.title_line2}
              </span>
            </h1>

            {/* Gold divider — animated (desktop only) */}
            <div
              className="hero-gold-line bg-gold/70 hidden md:block md:mx-auto"
              style={{
                width: '48px',
                height: '2px',
                marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                transform: 'scaleX(0)',
              }}
            />

            {/* Subtitle — concise */}
            <p
              className="hero-reveal font-sans text-white/60 md:mx-auto"
              style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                lineHeight: 1.7,
                maxWidth: '540px',
                letterSpacing: '0.005em',
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* CTA — Full-width on mobile, inline on desktop */}
            <div
              className="hero-reveal flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start md:justify-center gap-4"
              style={{ marginTop: 'clamp(1.5rem, 3vh, 3rem)' }}
            >
              <Link
                href={getLocalizedPath('contact', locale)}
                className="group inline-flex items-center justify-center gap-3 bg-white w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 font-sans text-[0.7rem] font-semibold text-navy-dark uppercase transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
                style={{ letterSpacing: '0.18em', transitionDuration: '0.4s', borderRadius: '6px' }}
              >
                {t.hero.cta}
                <span
                  className="inline-block transition-transform group-hover:translate-x-1.5"
                  aria-hidden="true"
                  style={{ transitionDuration: '0.3s' }}
                >
                  →
                </span>
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start transition-all hover:opacity-80"
                style={{ transitionDuration: '0.3s' }}
              >
                <span
                  className="inline-flex items-center justify-center shrink-0"
                  style={{
                    background: '#25D366',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                <span className="font-sans text-white/50 text-xs">{t.hero.cta_whatsapp}</span>
              </a>
            </div>

            {/* Mini trust — below CTA (desktop only) */}
            <p
              className="hero-reveal font-sans text-white/35 uppercase hidden md:block"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              }}
            >
              {t.hero.proof}
            </p>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator (desktop only) ── */}
      <div
        className="hero-scroll-indicator absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
        style={{ bottom: 'clamp(5rem, 12vh, 8rem)', opacity: 0 }}
      >
        <span className="font-sans text-white/25 uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>

      {/* ── Trust bar — bottom pinned ── */}
      <div ref={trustRef} className="relative z-10" style={{ opacity: 0 }}>
        <div
          className="w-full border-t border-white/[0.06]"
          style={{ backgroundColor: 'rgba(17, 24, 34, 0.6)', backdropFilter: 'blur(16px)' }}
        >
          <div
            className="mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10"
            style={{ maxWidth: 'var(--max-width)', paddingTop: '1rem', paddingBottom: '1rem' }}
          >
            {/* Mobile: compact single-line trust */}
            <div className="md:hidden w-full">
              <p
                className="font-sans text-white/40 text-center"
                style={{ fontSize: '0.65rem', letterSpacing: '0.04em', lineHeight: 1.6 }}
              >
                <span className="font-semibold text-white/60">{t.hero.trust_clients}</span>{' '}
                <span>{t.hero.trust_clients_label}</span>
                <span className="text-white/20 mx-2">·</span>
                <span className="font-semibold text-white/60">{t.hero.trust_languages}</span>{' '}
                <span>{t.hero.trust_languages_label}</span>
                <span className="text-white/20 mx-2">·</span>
                <span>Since 1995</span>
              </p>
            </div>

            {/* Desktop: stat pillars */}
            <div className="hidden md:flex items-center justify-center lg:justify-start gap-4 sm:gap-8 lg:gap-14 w-full overflow-x-auto no-scrollbar">
              {trustPillars.map((pillar, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <span
                    className="font-serif text-white/80"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {pillar.value}
                  </span>
                  <span
                    className="font-sans text-white/30 uppercase"
                    style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.55rem)', letterSpacing: '0.12em', lineHeight: 1.3, whiteSpace: 'nowrap' }}
                  >
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Credentials (desktop only) */}
            <p
              className="font-sans text-white/15 text-center lg:text-right mt-3 lg:mt-0 hidden md:block"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {t.hero.trust_credentials}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
