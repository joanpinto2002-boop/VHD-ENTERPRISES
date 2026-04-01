'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type en from '@/messages/en.json';
import { type Locale, getLocalizedPath } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

export function Hero({ locale, t }: { locale: Locale; t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLParagraphElement>(null);
  const proofRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Image — gentle scale settle with soft blur clear
      tl.fromTo(
        imageRef.current,
        { scale: 1.06, opacity: 0, filter: 'blur(8px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.4, ease: 'power1.out' },
        0
      );

      // Overlay — soft fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        0.4
      );

      // Tagline — gentle rise
      tl.fromTo(
        taglineRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        0.9
      );

      // Title line 1
      tl.fromTo(
        titleLine1Ref.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        1.1
      );

      // Title line 2
      tl.fromTo(
        titleLine2Ref.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        1.35
      );

      // Gold divider
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1, ease: 'power1.inOut' },
        1.9
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        2.1
      );

      // Proof line
      tl.fromTo(
        proofRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        2.5
      );

      // CTA row
      tl.fromTo(
        ctaRowRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power1.out' },
        2.7
      );

      // Trust pillars
      tl.fromTo(
        trustRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        3.0
      );

      // Credentials line
      tl.fromTo(
        credentialsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        3.3
      );

      // Ken Burns
      gsap.to(imageRef.current, {
        scale: 1.04,
        duration: 30,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      // Scroll parallax
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Scroll dissolve — content
      gsap.to(contentRef.current, {
        y: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Trust bar scroll fade
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
    <section ref={sectionRef} className="relative flex flex-col overflow-hidden bg-navy-dark" style={{ minHeight: '115vh' }}>
      {/* Background image — Paul's photo */}
      <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ opacity: 0 }}>
        <Image
          src="https://vdhenterprises.com/wp-content/uploads/2017/02/about-Paul-vdh.jpg"
          alt="Paul van den Hout — Real estate advisor in Barcelona"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay — darker from bottom + left for text readability */}
      <div ref={overlayRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-navy-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/75 via-navy-dark/30 to-transparent" />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex items-end w-full mx-auto px-6 lg:px-10 will-change-transform"
        style={{
          maxWidth: 'var(--max-width)',
          paddingTop: 'var(--space-2xl)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          {/* Tagline */}
          <p
            ref={taglineRef}
            className="font-sans text-gold/70 uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              marginBottom: 'var(--space-md)',
              opacity: 0,
            }}
          >
            {t.hero.tagline}
          </p>

          {/* Title — two weights for hierarchy */}
          <h1>
            <span
              ref={titleLine1Ref}
              className="block font-serif text-white/85"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                opacity: 0,
              }}
            >
              {t.hero.title_line1}
            </span>
            <span
              ref={titleLine2Ref}
              className="block font-serif text-white"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginTop: '0.1em',
                opacity: 0,
              }}
            >
              {t.hero.title_line2}
            </span>
          </h1>

          {/* Gold divider */}
          <div
            ref={dividerRef}
            className="bg-gold/80"
            style={{
              width: '40px',
              height: '1.5px',
              marginTop: 'var(--space-lg)',
              marginBottom: 'var(--space-lg)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-sans text-white/50"
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 1.75,
              maxWidth: '500px',
              letterSpacing: '0.005em',
              opacity: 0,
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* Proof line */}
          <p
            ref={proofRef}
            className="font-sans text-gold/60 uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              marginTop: 'var(--space-lg)',
              opacity: 0,
            }}
          >
            {t.hero.proof}
          </p>

          {/* CTA row */}
          <div
            ref={ctaRowRef}
            className="flex flex-wrap items-center"
            style={{ marginTop: 'var(--space-xl)', gap: '2rem', opacity: 0 }}
          >
            <Link
              href={getLocalizedPath('contact', locale)}
              className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 font-sans text-[0.75rem] font-medium text-white uppercase transition-all hover:bg-white hover:border-white hover:text-navy-dark"
              style={{ transitionDuration: 'var(--duration-base)', letterSpacing: '0.15em' }}
            >
              {t.hero.cta}
              <span
                className="inline-block transition-transform group-hover:translate-x-1"
                aria-hidden="true"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                →
              </span>
            </Link>
            <a
              href="tel:+34609321308"
              className="font-sans text-white/30 text-[0.75rem] tracking-wider transition-colors hover:text-white/60"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              {t.hero.cta_phone}
            </a>
          </div>
        </div>
      </div>

      {/* Trust bar — 3 pillars + credentials */}
      <div ref={trustRef} className="relative z-10" style={{ opacity: 0 }}>
        <div
          className="w-full border-t border-white/[0.07]"
          style={{ backgroundColor: 'rgba(17, 24, 34, 0.55)', backdropFilter: 'blur(12px)' }}
        >
          <div
            className="mx-auto flex flex-col items-center px-6 lg:px-10"
            style={{ maxWidth: 'var(--max-width)', paddingTop: '1.25rem', paddingBottom: '1.25rem' }}
          >
            {/* Stat pillars */}
            <div className="flex items-center gap-10 sm:gap-16">
              {trustPillars.map((pillar, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="font-serif text-white/90"
                    style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {pillar.value}
                  </span>
                  <span
                    className="font-sans text-white/30 uppercase"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.12em', lineHeight: 1.3 }}
                  >
                    {pillar.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Credentials */}
            <p
              ref={credentialsRef}
              className="font-sans text-white/20 text-center"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
                opacity: 0,
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
