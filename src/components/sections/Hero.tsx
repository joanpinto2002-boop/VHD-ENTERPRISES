'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type en from '@/messages/en.json';
import { type Locale, getLocalizedPath } from '@/lib/i18n';

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
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 40%',
            filter: 'saturate(0.8) contrast(1.15)',
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

      {/* ── Overlay — strong lateral gradient (left darker for text) ── */}
      <div className="absolute inset-0 z-[1]">
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
          style={{ background: 'linear-gradient(to bottom, rgba(17,24,34,0.3) 0%, transparent 25%)' }}
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
          paddingTop: 'clamp(6rem, 14vh, 10rem)',
          paddingBottom: 'clamp(6rem, 14vh, 10rem)',
        }}
      >
        <div
          className="w-full mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            {/* Authority anchor — animated line + tagline */}
            <div className="hero-reveal flex items-center justify-center gap-4" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <div
                className="hero-gold-line bg-gold/40"
                style={{ width: '32px', height: '1px', transform: 'scaleX(0)' }}
              />
              <p
                className="font-sans text-white/30 uppercase"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                }}
              >
                {t.hero.tagline}
              </p>
            </div>

            {/* Headline — two weights for hierarchy */}
            <h1 style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              {/* Line 1 — light */}
              <span
                className="hero-reveal block font-serif text-white/85"
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
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
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginTop: '0.1em',
                }}
              >
                {t.hero.title_line2}
              </span>
            </h1>

            {/* Gold divider — animated */}
            <div
              className="hero-gold-line bg-gold/70"
              style={{
                width: '48px',
                height: '2px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                transform: 'scaleX(0)',
              }}
            />

            {/* Subtitle — concise */}
            <p
              className="hero-reveal font-sans text-white/40"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                lineHeight: 1.75,
                maxWidth: '540px',
                marginLeft: 'auto',
                marginRight: 'auto',
                letterSpacing: '0.005em',
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* CTA — solid background, premium */}
            <div
              className="hero-reveal flex flex-wrap items-center justify-center"
              style={{ marginTop: 'clamp(2rem, 4vh, 3rem)', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              <Link
                href={getLocalizedPath('contact', locale)}
                className="group inline-flex items-center gap-3 bg-white px-10 py-4 font-sans text-[0.7rem] font-semibold text-navy-dark uppercase transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02]"
                style={{ letterSpacing: '0.18em', transitionDuration: '0.4s' }}
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
            </div>

            {/* Mini trust — below CTA */}
            <p
              className="hero-reveal font-sans text-white/20 uppercase"
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
            {/* Stat pillars */}
            <div className="flex items-center gap-8 sm:gap-14">
              {trustPillars.map((pillar, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span
                    className="font-serif text-white/80"
                    style={{ fontSize: '1.35rem', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {pillar.value}
                  </span>
                  <span
                    className="font-sans text-white/25 uppercase"
                    style={{ fontSize: '0.55rem', letterSpacing: '0.12em', lineHeight: 1.3 }}
                  >
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Credentials */}
            <p
              className="font-sans text-white/15 text-center lg:text-right"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
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
