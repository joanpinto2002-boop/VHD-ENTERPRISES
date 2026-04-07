'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

/* ── SVG Icons ── */
const IconKey = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="16" r="6" /><path d="M18.5 20.5 27 29" /><path d="M23 25l3 3" /><path d="M26 22l3 3" />
  </svg>
);
const IconChart = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 34h28" /><rect x="10" y="20" width="5" height="14" rx="1" /><rect x="17.5" y="12" width="5" height="22" rx="1" /><rect x="25" y="6" width="5" height="28" rx="1" />
  </svg>
);
const IconBuilding = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="1.2" stroke="var(--gold)" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="16" height="28" rx="1" /><rect x="24" y="14" width="10" height="20" rx="1" />
    <path d="M12 11h3M12 16h3M12 21h3M12 26h3M19 11h1M19 16h1M19 21h1M19 26h1" /><path d="M28 19h3M28 24h3" /><path d="M15 30v4h-3v-4" />
  </svg>
);

const icons = [IconKey, IconChart, IconBuilding];

const cardImages = [
  '/images/service-1.jpg',
  '/images/service-2.jpg',
  '/images/service-3.jpg',
];

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const DURATION = '1s';

type ExpandPhase = 'mounting' | 'expanded' | 'collapsing' | null;

/* ═══════════════════════════════════════════════════════════
   SOLUTION — 3 Cards that PHYSICALLY EXPAND on hover
   Card grows from its position to fill the full grid width,
   revealing image panel on the right
   ═══════════════════════════════════════════════════════════ */
export function Solution({ locale, t }: { locale: Locale; t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [phase, setPhase] = useState<ExpandPhase>(null);
  const [origin, setOrigin] = useState({ left: 0, top: 0, width: 0, height: 0, gridW: 0, gridH: 0 });

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  const services = [
    {
      num: '01', title: t.solution.svc1_title, desc: t.solution.svc1_desc,
      detail: t.solution.svc1_detail, bullets: t.solution.svc1_bullets, link: t.solution.svc1_link,
    },
    {
      num: '02', title: t.solution.svc2_title, desc: t.solution.svc2_desc,
      detail: t.solution.svc2_detail, bullets: t.solution.svc2_bullets, link: t.solution.svc2_link,
    },
    {
      num: '03', title: t.solution.svc3_title, desc: t.solution.svc3_desc,
      detail: t.solution.svc3_detail, bullets: t.solution.svc3_bullets, link: t.solution.svc3_link,
    },
  ];

  /* ── Hover enter: measure card, mount overlay at card pos, then expand ── */
  const handleEnter = useCallback((i: number) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    if (collapseTimer.current) { clearTimeout(collapseTimer.current); collapseTimer.current = null; }

    if (activeCard === i && phase === 'expanded') return;
    if (activeCard === i && phase === 'collapsing') { setPhase('expanded'); return; }

    const card = cardRefs.current[i];
    const grid = gridRef.current;
    if (!card || !grid) return;

    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    setOrigin({
      left: cardRect.left - gridRect.left,
      top: cardRect.top - gridRect.top,
      width: cardRect.width,
      height: cardRect.height,
      gridW: grid.offsetWidth,
      gridH: grid.offsetHeight,
    });
    setActiveCard(i);
    setPhase('mounting');

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setPhase('expanded');
      });
    });
  }, [activeCard, phase]);

  /* ── Hover leave: collapse back to card position, then remove ── */
  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setPhase('collapsing');
      collapseTimer.current = setTimeout(() => {
        setActiveCard(null);
        setPhase(null);
      }, 1000);
    }, 60);
  }, []);

  const handleOverlayEnter = useCallback(() => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    if (collapseTimer.current) { clearTimeout(collapseTimer.current); collapseTimer.current = null; }
    if (phase === 'collapsing') setPhase('expanded');
  }, [phase]);

  /* ── Close overlay immediately ── */
  const handleClose = useCallback(() => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    if (collapseTimer.current) { clearTimeout(collapseTimer.current); collapseTimer.current = null; }
    setPhase('collapsing');
    collapseTimer.current = setTimeout(() => {
      setActiveCard(null);
      setPhase(null);
    }, 1000);
  }, []);

  /* ── Navigate to prev/next service ── */
  const handleNavigate = useCallback((dir: -1 | 1) => {
    if (activeCard === null) return;
    const next = (activeCard + dir + services.length) % services.length;

    // Re-measure the target card so origin stays correct for collapse later
    const card = cardRefs.current[next];
    const grid = gridRef.current;
    if (card && grid) {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setOrigin({
        left: cardRect.left - gridRect.left,
        top: cardRect.top - gridRect.top,
        width: cardRect.width,
        height: cardRect.height,
        gridW: grid.offsetWidth,
        gridH: grid.offsetHeight,
      });
    }

    // Swap content instantly — stay expanded
    setActiveCard(next);
  }, [activeCard, services.length]);

  /* ── GSAP scroll reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEls = gsap.utils.toArray<HTMLElement>('.svc-header-reveal');
      if (headerEls.length) {
        gsap.fromTo(headerEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.svc-header', start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      }
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Preload card images so they're cached before hover ── */
  useEffect(() => {
    cardImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  /* ── Computed overlay position ── */
  const isExpanded = phase === 'expanded';
  const isCollapsing = phase === 'collapsing';
  const isVisible = activeCard !== null && phase !== null;
  const animate = isExpanded || isCollapsing;

  const overlayStyle: React.CSSProperties = isVisible ? {
    position: 'absolute',
    left: isExpanded ? 0 : origin.left,
    top: isExpanded ? 0 : origin.top,
    width: isExpanded ? '100%' : origin.width,
    minHeight: isExpanded ? origin.gridH : origin.height,
    height: isExpanded ? 'auto' : origin.height,
    zIndex: 30,
    borderRadius: 0,
    overflow: 'visible',
    background: 'transparent',
    boxShadow: isExpanded
      ? '0 40px 100px rgba(26,35,50,0.10), 0 12px 36px rgba(26,35,50,0.05)'
      : '0 2px 20px rgba(26,35,50,0.04)',
    display: 'flex',
    transition: animate
      ? `left ${DURATION} ${EASE}, top ${DURATION} ${EASE}, width ${DURATION} ${EASE}, min-height ${DURATION} ${EASE}, height ${DURATION} ${EASE}, border-radius ${DURATION} ${EASE}, box-shadow ${DURATION} ${EASE}`
      : 'none',
  } : { display: 'none' };

  return (
    <section ref={sectionRef} className="bg-off-white">
      {/* ── Header ── */}
      <div
        className="svc-header"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem) clamp(2.5rem, 5vh, 4rem)',
        }}
      >
        <p className="svc-header-reveal font-sans uppercase tracking-widest"
          style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
          {t.solution.label}
        </p>
        <h2 className="svc-header-reveal font-serif text-navy"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em' }}>
          {t.solution.title}
        </h2>
        <div className="svc-header-reveal bg-gold" style={{ width: '40px', height: '2px', marginTop: 'clamp(1.2rem, 2vw, 1.8rem)' }} />
      </div>

      {/* ── Grid wrapper ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem) clamp(5rem, 10vh, 8rem)',
        }}
      >
        <div ref={gridRef} style={{ position: 'relative' }}>
          {/* ── 3-column card grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              alignItems: 'start',
            }}
            className="max-md:!grid-cols-1"
          >
            {services.map((service, i) => {
              const Icon = icons[i];
              const isThisCardActive = activeCard === i && phase !== null;
              return (
                <div
                  key={i}
                  className="svc-card"
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                  style={{
                    opacity: 0,
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: '0 2px 20px rgba(26,35,50,0.04)',
                    cursor: 'pointer',
                    visibility: isThisCardActive ? 'hidden' : 'visible',
                  }}
                >
                  {/* Gold top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '2px',
                    background: 'var(--gold)', width: '40px',
                  }} />

                  <div style={{ padding: 'clamp(2rem, 3.5vw, 3rem)' }}>
                    <div style={{ marginBottom: 'clamp(1.2rem, 2vw, 1.8rem)', opacity: 0.85 }}>
                      <Icon />
                    </div>
                    <h3 className="font-serif text-navy"
                      style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                      {service.title}
                    </h3>
                    <p className="font-sans text-text-muted"
                      style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.75, marginBottom: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                      {service.desc}
                    </p>
                    <Link
                      href={getLocalizedPath(service.link, locale)}
                      className="inline-flex items-center gap-3 font-sans group/link"
                      style={{
                        fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em',
                        textTransform: 'uppercase' as const, color: 'var(--navy)', textDecoration: 'none',
                      }}
                    >
                      <span className="relative">
                        {t.solution.cta}
                        <span className="absolute left-0 -bottom-[3px] h-[1.5px] bg-gold w-0 group-hover/link:w-full"
                          style={{ transition: `width 0.5s ${EASE}` }} />
                      </span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                        className="group-hover/link:translate-x-1"
                        style={{ transition: `transform 0.35s ${EASE}` }}>
                        <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ══════ Expanding overlay ══════ */}
          {isVisible && activeCard !== null && (() => {
            const service = services[activeCard];
            const Icon = icons[activeCard];
            return (
              <div
                onMouseEnter={handleOverlayEnter}
                onMouseLeave={handleLeave}
                className="hidden md:flex"
                style={overlayStyle}
              >
                {/* ── Close button — top right ── */}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  style={{
                    position: 'absolute', top: '1rem', right: '1rem', zIndex: 40,
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(26,35,50,0.1)', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--navy)',
                    opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none',
                    transform: isExpanded ? 'scale(1)' : 'scale(0.8)',
                    transition: `opacity 0.4s ease 0.3s, transform 0.4s ${EASE} 0.3s`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>

                {/* ── Left arrow ── */}
                <button
                  onClick={() => handleNavigate(-1)}
                  aria-label="Previous service"
                  style={{
                    position: 'absolute', left: '-18px', top: '50%', transform: isExpanded ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
                    zIndex: 40, width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(26,35,50,0.1)', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--navy)', boxShadow: '0 4px 16px rgba(26,35,50,0.1)',
                    opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none',
                    transition: `opacity 0.4s ease 0.35s, transform 0.4s ${EASE} 0.35s`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* ── Right arrow ── */}
                <button
                  onClick={() => handleNavigate(1)}
                  aria-label="Next service"
                  style={{
                    position: 'absolute', right: '-18px', top: '50%', transform: isExpanded ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
                    zIndex: 40, width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(26,35,50,0.1)', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--navy)', boxShadow: '0 4px 16px rgba(26,35,50,0.1)',
                    opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none',
                    transition: `opacity 0.4s ease 0.35s, transform 0.4s ${EASE} 0.35s`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Inner clip wrapper — clips content, arrows stay outside */}
                <div style={{
                  display: 'flex', flex: 1, overflow: 'hidden',
                  borderRadius: isExpanded ? '12px' : '8px',
                  transition: animate ? `border-radius ${DURATION} ${EASE}` : 'none',
                  background: 'white', position: 'relative',
                }}>
                {/* ── Text column — always same width as original card ── */}
                <div style={{
                  width: origin.width,
                  flexShrink: 0,
                  padding: 'clamp(2rem, 3.5vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}>
                  {/* Gold top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '2px',
                    background: 'var(--gold)', width: '40px',
                  }} />

                  {/* Icon */}
                  <div style={{ marginBottom: 'clamp(1.2rem, 2vw, 1.8rem)', opacity: 0.85 }}>
                    <Icon />
                  </div>

                  {/* Title — always visible */}
                  <h3 className="font-serif text-navy"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', fontWeight: 400,
                      lineHeight: 1.15, letterSpacing: '-0.02em',
                      marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
                    }}>
                    {service.title}
                  </h3>

                  {/* Short desc — always visible, never moves */}
                  <p className="font-sans text-text-muted"
                    style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.75, marginBottom: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
                    {service.desc}
                  </p>

                  {/* Bullets — space reserved immediately, content fades in after expand */}
                  <div style={{
                    maxHeight: (isExpanded || isCollapsing) ? '600px' : 0,
                    overflow: 'hidden',
                    transition: isExpanded
                      ? `max-height ${DURATION} ${EASE}`
                      : 'none',
                  }}>
                    {/* Gold divider */}
                    <div style={{
                      width: '32px', height: '1.5px', background: 'var(--gold)',
                      marginBottom: 'clamp(0.8rem, 1.2vw, 1rem)',
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded ? 'translateY(0)' : 'translateY(6px)',
                      transition: isExpanded
                        ? `opacity 0.4s ease 0s, transform 0.4s ${EASE} 0s`
                        : 'opacity 0.15s ease, transform 0.15s ease',
                    }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 clamp(0.8rem, 1.2vw, 1rem) 0' }}>
                      {service.bullets.map((bullet, bi) => (
                        <li key={bi} className="font-sans text-navy/75 flex items-start gap-3"
                          style={{
                            fontSize: 'clamp(0.82rem, 0.9vw, 0.9rem)', lineHeight: 1.6, marginBottom: '0.45rem',
                            opacity: isExpanded ? 1 : 0,
                            transform: isExpanded ? 'translateY(0)' : 'translateY(8px)',
                            transition: isExpanded
                              ? `opacity 0.4s ease ${0.05 + bi * 0.05}s, transform 0.4s ${EASE} ${0.05 + bi * 0.05}s`
                              : 'opacity 0.15s ease, transform 0.15s ease',
                          }}>
                          <span className="text-gold mt-[3px] shrink-0">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href={getLocalizedPath(service.link, locale)}
                    className="inline-flex items-center gap-3 font-sans group/link"
                    style={{
                      fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em',
                      textTransform: 'uppercase' as const, color: 'var(--navy)', textDecoration: 'none',
                      marginTop: isExpanded ? 'clamp(1.2rem, 2vw, 1.8rem)' : 'auto',
                    }}
                  >
                    <span className="relative">
                      {t.solution.cta}
                      <span className="absolute left-0 -bottom-[3px] h-[1.5px] bg-gold w-0 group-hover/link:w-full"
                        style={{ transition: `width 0.5s ${EASE}` }} />
                    </span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                      className="group-hover/link:translate-x-1"
                      style={{ transition: `transform 0.35s ${EASE}` }}>
                      <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* ── Image column — revealed as card expands ── */}
                <div style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isExpanded ? 1 : 0,
                  transition: isExpanded
                    ? `opacity 0.5s ease 0.3s`
                    : isCollapsing
                      ? 'opacity 0.2s ease'
                      : 'none',
                }}>
                  <Image
                    src={cardImages[activeCard]}
                    alt={service.title}
                    fill
                    sizes="55vw"
                    priority
                    className="object-cover"
                    style={{
                      transform: 'scale(1)',
                    }}
                  />
                  {/* Subtle gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(26,35,50,0.04) 0%, transparent 40%)',
                    pointerEvents: 'none',
                  }} />

                </div>
                </div>  {/* end inner clip wrapper */}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
