'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type en from '@/messages/en.json';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

/* ═══════════════════════════════════════════════════════════
   OUR APPROACH — Sticky video left · 5 cards right (scroll)
   Desktop: video sticky left, cards appear one-by-one right
   Mobile: video top + stacked cards below
   ═══════════════════════════════════════════════════════════ */
export function Problem({ t }: { t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);

  const approach = (t as Record<string, unknown>).approach as Messages['approach'] | undefined;

  const pillars = approach
    ? [
        { num: '01', title: approach.pillar1_title, desc: approach.pillar1_desc },
        { num: '02', title: approach.pillar2_title, desc: approach.pillar2_desc },
        { num: '03', title: approach.pillar3_title, desc: approach.pillar3_desc },
        { num: '04', title: approach.pillar4_title, desc: approach.pillar4_desc },
        { num: '05', title: approach.pillar5_title, desc: approach.pillar5_desc },
      ]
    : [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || pillars.length === 0) return;

    const ctx = gsap.context(() => {
      /* Header reveal */
      const headerEls = gsap.utils.toArray<HTMLElement>('.apr-header-reveal');
      if (headerEls.length) {
        gsap.fromTo(headerEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.apr-header', start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      }

      /* Each card appears individually on scroll */
      const cards = gsap.utils.toArray<HTMLElement>('.apr-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [pillars.length]);

  if (pillars.length === 0) return null;

  /* ── Reusable card renderer ── */
  const renderCard = (pillar: typeof pillars[0], i: number) => (
    <div
      key={i}
      className="apr-card"
      style={{
        opacity: 0,
        background: '#fff',
        borderRadius: '4px',
        border: '1px solid rgba(26,35,50,0.06)',
        padding: 'clamp(1.6rem, 2.5vw, 2.2rem)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,35,50,0.08), 0 6px 20px rgba(26,35,50,0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gold top accent */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gold"
        style={{ width: '40px', transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }}
        ref={(el) => {
          if (!el) return;
          const card = el.parentElement;
          card?.addEventListener('mouseenter', () => { el.style.width = '100%'; });
          card?.addEventListener('mouseleave', () => { el.style.width = '40px'; });
        }}
      />

      <span
        className="font-sans block"
        style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', opacity: 0.5, marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)', marginTop: '0.4rem' }}
      >
        {pillar.num}
      </span>

      <h3
        className="font-serif text-navy"
        style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 'clamp(0.5rem, 1vw, 0.7rem)' }}
      >
        {pillar.title}
      </h3>

      <p
        className="font-sans text-text-muted"
        style={{ fontSize: 'clamp(0.8rem, 0.9vw, 0.88rem)', lineHeight: 1.7 }}
      >
        {pillar.desc}
      </p>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-off-white">
      {/* ── Header ── */}
      <div
        className="apr-header"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem) clamp(2rem, 4vh, 3rem)',
        }}
      >
        <p
          className="apr-header-reveal font-sans uppercase tracking-widest"
          style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}
        >
          {approach?.label}
        </p>
        <h2
          className="apr-header-reveal font-serif text-navy"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em', maxWidth: '700px' }}
        >
          {approach?.title}
        </h2>
        <p
          className="apr-header-reveal font-sans text-text-muted"
          style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', lineHeight: 1.7, maxWidth: '560px', marginTop: 'clamp(1rem, 2vw, 1.5rem)' }}
        >
          {approach?.subtitle}
        </p>
        <div
          className="apr-header-reveal bg-gold"
          style={{ width: '40px', height: '2px', marginTop: 'clamp(1.2rem, 2vw, 1.8rem)' }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP — Video sticky left · Cards scrolling right
          ══════════════════════════════════════════════════ */}
      <div
        className="hidden lg:grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem) clamp(5rem, 10vh, 8rem)',
          gridTemplateColumns: '55% 1fr',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: Sticky video card ── */}
        <div style={{ alignSelf: 'stretch' }}>
          <div
            className="relative overflow-hidden w-full"
            style={{
              position: 'sticky',
              top: 'max(2rem, calc(50vh - 20vw))',
              borderRadius: '6px',
              aspectRatio: '3 / 2',
              boxShadow: '0 24px 80px rgba(26,35,50,0.12), 0 8px 32px rgba(26,35,50,0.06)',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 40%' }}
            >
              <source src="/videos/Videoservicies.mp4" type="video/mp4" />
            </video>

            {/* Bottom gradient */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: '50%', background: 'linear-gradient(to top, rgba(26,35,50,0.5), transparent)' }}
            />

            {/* Quote overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{ padding: 'clamp(1.2rem, 2.5vw, 2rem)' }}
            >
              <p
                className="font-serif italic"
                style={{ fontSize: 'clamp(0.8rem, 1vw, 0.95rem)', lineHeight: 1.6, color: 'var(--off-white)', opacity: 0.9, maxWidth: '500px' }}
              >
                &ldquo;{approach?.quote}&rdquo;
              </p>
              <p
                className="font-sans"
                style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--gold)', marginTop: '0.4rem', opacity: 0.8 }}
              >
                — {approach?.quote_author}
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: 5 cards, each appears on scroll ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
          {pillars.map((pillar, i) => renderCard(pillar, i))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE — Video top + stacked cards below
          ══════════════════════════════════════════════════ */}
      <div
        className="lg:hidden"
        style={{ padding: '0 clamp(1.5rem, 4vw, 2.5rem) clamp(4rem, 8vh, 6rem)' }}
      >
        {/* Video */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '6px',
            aspectRatio: '16 / 9',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            boxShadow: '0 16px 48px rgba(26,35,50,0.1)',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          >
            <source src="/videos/Videoservicies.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '40%', background: 'linear-gradient(to top, rgba(26,35,50,0.4), transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
          >
            <p className="font-serif italic" style={{ fontSize: '0.82rem', lineHeight: 1.5, color: 'var(--off-white)', opacity: 0.9 }}>
              &ldquo;{approach?.quote}&rdquo;
            </p>
            <p className="font-sans" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--gold)', marginTop: '0.3rem', opacity: 0.8 }}>
              — {approach?.quote_author}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
          {pillars.map((pillar, i) => renderCard(pillar, i))}
        </div>
      </div>
    </section>
  );
}
