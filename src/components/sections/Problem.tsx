'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type en from '@/messages/en.json';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

export function Problem({ t }: { t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);

  const approach = (t as Record<string, unknown>).approach as Messages['approach'] | undefined;

  const pillars = approach
    ? [
        {
          num: '01',
          title: approach.pillar1_title,
          items: [approach.pillar1_item1, approach.pillar1_item2, approach.pillar1_item3],
          img: '/images/approach-1.jpg',
        },
        {
          num: '02',
          title: approach.pillar2_title,
          items: [approach.pillar2_item1, approach.pillar2_item2, approach.pillar2_item3],
          img: '/images/approach-2.jpg',
        },
        {
          num: '03',
          title: approach.pillar3_title,
          items: [approach.pillar3_item1, approach.pillar3_item2, approach.pillar3_item3],
          img: '/images/approach-3.jpg',
        },
        {
          num: '04',
          title: approach.pillar4_title,
          items: [approach.pillar4_item1, approach.pillar4_item2, approach.pillar4_item3],
          img: '/images/approach-4.jpg',
        },
      ]
    : [];

  /* ─── Move underline to active tab ─── */
  const moveUnderline = useCallback((index: number) => {
    const tab = tabsRef.current[index];
    const underline = underlineRef.current;
    if (!tab || !underline || !tab.parentElement) return;
    const parent = tab.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    gsap.to(underline, {
      x: tabRect.left - parentRect.left,
      width: tabRect.width,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, []);

  /* ─── Switch tab with crossfade ─── */
  const switchTo = useCallback((index: number) => {
    if (index === active || isAnimating.current) return;
    isAnimating.current = true;

    const showcase = showcaseRef.current;
    if (!showcase) return;

    const prevContent = showcase.querySelector(`.approach-content-${active}`);
    const nextContent = showcase.querySelector(`.approach-content-${index}`);
    const prevImg = showcase.querySelector(`.approach-img-${active}`);
    const nextImg = showcase.querySelector(`.approach-img-${index}`);

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    // Fade out previous
    if (prevContent) {
      tl.to(prevContent, { opacity: 0, y: -16, duration: 0.3, ease: 'power2.in' }, 0);
    }
    if (prevImg) {
      tl.to(prevImg, { opacity: 0, scale: 1.03, duration: 0.4, ease: 'power2.in' }, 0);
    }

    // Fade in next
    if (nextContent) {
      tl.fromTo(nextContent,
        { opacity: 0, y: 20, display: 'none' },
        { opacity: 1, y: 0, display: 'flex', duration: 0.45, ease: 'power2.out' },
        0.25
      );
    }
    if (nextImg) {
      tl.fromTo(nextImg,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
        0.2
      );
    }

    // Hide previous after fade
    if (prevContent) {
      tl.set(prevContent, { display: 'none' }, 0.35);
    }

    moveUnderline(index);
    setActive(index);
  }, [active, moveUnderline]);

  /* ─── Header scroll reveal + initial underline ─── */
  useEffect(() => {
    if (pillars.length === 0) return;

    const ctx = gsap.context(() => {
      const headerEls = headerRef.current?.querySelectorAll('.approach-header-el');
      if (headerEls) {
        gsap.fromTo(headerEls, { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        });
      }

      // Showcase reveal
      if (showcaseRef.current) {
        gsap.fromTo(showcaseRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: showcaseRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);

    // Set initial underline position
    requestAnimationFrame(() => moveUnderline(0));

    const handleResize = () => moveUnderline(active);
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [pillars.length, moveUnderline, active]);

  if (pillars.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative bg-off-white">
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto px-6 lg:px-10 text-center"
        style={{
          maxWidth: 'var(--max-width-narrow)',
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <p
          className="approach-header-el font-sans uppercase tracking-widest"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'var(--space-lg)', opacity: 0 }}
        >
          {approach?.label}
        </p>
        <h2
          className="approach-header-el font-serif text-navy text-balance"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.025em', opacity: 0 }}
        >
          {approach?.title}
        </h2>
        <p
          className="approach-header-el font-sans text-text-muted"
          style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, marginTop: 'var(--space-md)', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto', opacity: 0 }}
        >
          {approach?.subtitle}
        </p>
      </div>

      {/* Showcase */}
      <div
        ref={showcaseRef}
        className="mx-auto px-6 lg:px-10"
        style={{ maxWidth: 'var(--max-width-wide)', paddingBottom: 'clamp(4rem, 8vw, 7rem)', opacity: 0 }}
      >
        {/* ── Tabs ── */}
        <div className="relative mb-10 lg:mb-14">
          <div className="flex gap-1 overflow-x-auto" style={{ borderBottom: '1px solid var(--border)' }}>
            {pillars.map((pillar, i) => (
              <button
                key={i}
                ref={el => { tabsRef.current[i] = el; }}
                onClick={() => switchTo(i)}
                className="relative shrink-0 px-5 lg:px-7 pb-4 pt-1 font-sans transition-colors cursor-pointer"
                style={{
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                  fontWeight: active === i ? 700 : 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: active === i ? 'var(--navy)' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="text-gold/60 mr-2" style={{ fontSize: '0.65rem' }}>{pillar.num}</span>
                {pillar.title}
              </button>
            ))}
          </div>
          {/* Animated underline */}
          <div
            ref={underlineRef}
            className="absolute bottom-0 left-0 bg-gold"
            style={{ height: '2px', width: 0, willChange: 'transform, width' }}
          />
        </div>

        {/* ── Content area ── */}
        <div className="relative">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`approach-content-${i} flex-col lg:flex-row gap-10 lg:gap-16 items-start`}
              style={{ display: i === 0 ? 'flex' : 'none' }}
            >
              {/* Text side */}
              <div className="w-full lg:w-[45%] flex flex-col justify-center py-4 lg:py-8">
                <span
                  className="font-serif text-navy/[0.06] block"
                  style={{
                    fontSize: 'clamp(4rem, 7vw, 6rem)',
                    fontWeight: 400,
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {pillar.num}
                </span>

                <div className="bg-gold mt-4 mb-5" style={{ width: '32px', height: '2px' }} />

                <h3
                  className="font-serif text-navy"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
                  }}
                >
                  {pillar.title}
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pillar.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4"
                      style={{
                        paddingTop: 'clamp(0.6rem, 0.8vw, 0.75rem)',
                        paddingBottom: 'clamp(0.6rem, 0.8vw, 0.75rem)',
                        borderBottom: j < pillar.items.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span
                        className="font-sans text-gold/50 shrink-0"
                        style={{ fontSize: '0.6rem', letterSpacing: '0.1em', marginTop: '0.4em' }}
                      >
                        0{j + 1}
                      </span>
                      <p
                        className="font-sans text-text-muted"
                        style={{ fontSize: 'var(--text-base)', lineHeight: 1.7 }}
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image side */}
              <div className="w-full lg:w-[55%] relative overflow-hidden rounded-sm" style={{ aspectRatio: '4 / 3' }}>
                {pillars.map((p, imgIdx) => (
                  <div
                    key={imgIdx}
                    className={`approach-img-${imgIdx} absolute inset-0`}
                    style={{ opacity: imgIdx === i ? 1 : 0 }}
                  >
                    <Image
                      src={p.img}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 35%' }}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      priority={imgIdx === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Stacked cards (< lg uses same tabs on desktop) ── */}
      <div className="lg:hidden px-6" style={{ paddingBottom: 'var(--space-3xl)', display: 'none' }}>
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="approach-mobile-card border-t border-border"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', opacity: 0 }}
          >
            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-md)' }}>
              <span className="font-sans text-gold" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                {pillar.num}
              </span>
              <div className="bg-gold/50" style={{ width: '32px', height: '1px' }} />
            </div>
            <h3
              className="font-serif text-navy"
              style={{ fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-md)' }}
            >
              {pillar.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pillar.items.map((item, j) => (
                <li
                  key={j}
                  className="font-sans text-text-muted"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

  useEffect(() => {
    if (pillars.length === 0) return;
    const mm = gsap.matchMedia();

    /* ─── DESKTOP ─── */
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        // Header reveal
        const headerEls = headerRef.current?.querySelectorAll('.approach-header-el');
        if (headerEls) {
          gsap.fromTo(headerEls, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: headerRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          });
        }

        const total = pillars.length;
        const bgImages = gsap.utils.toArray<HTMLElement>('.approach-bg-img');
        const cardItems = gsap.utils.toArray<HTMLElement>('.approach-card-item');

        // Stack bg images, first visible
        bgImages.forEach((img, i) => {
          gsap.set(img, { opacity: i === 0 ? 1 : 0 });
        });

        // Pin + scroll-driven updates
        ScrollTrigger.create({
          trigger: splitRef.current,
          start: 'top top',
          end: `+=${total * 400}vh`,
          pin: true,
          pinSpacing: true,
          scrub: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(Math.floor(progress * total), total - 1);

            // Vertical progress line
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleY(${progress})`;
            }

            // Floating card parallax
            if (floatingCardRef.current) {
              const y = -8 + progress * 16;
              floatingCardRef.current.style.transform = `translateY(${y}px)`;
            }

            if (index !== activeRef.current) {
              const prev = activeRef.current;
              activeRef.current = index;

              // Crossfade images
              if (prev >= 0 && bgImages[prev]) {
                gsap.to(bgImages[prev], { opacity: 0, scale: 1.02, duration: 0.7, ease: 'power2.inOut' });
              }
              if (bgImages[index]) {
                gsap.fromTo(bgImages[index],
                  { opacity: 0, scale: 1.05 },
                  { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                );
              }

              // Morph number
              if (numberRef.current) {
                gsap.to(numberRef.current, {
                  opacity: 0, y: -12, duration: 0.2, ease: 'power2.in',
                  onComplete: () => {
                    if (numberRef.current) {
                      numberRef.current.textContent = pillars[index].num;
                      gsap.fromTo(numberRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
                    }
                  },
                });
              }

              // Morph title
              if (titleRef.current) {
                gsap.to(titleRef.current, {
                  opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
                  onComplete: () => {
                    if (titleRef.current) {
                      titleRef.current.textContent = pillars[index].title;
                      gsap.fromTo(titleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
                    }
                  },
                });
              }

              // Pulse the accent line
              if (lineRef.current) {
                gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' });
              }

              // Stagger card items out → in
              const currentItems = cardItems.slice(index * 3, index * 3 + 3);
              const prevItems = prev >= 0 ? cardItems.slice(prev * 3, prev * 3 + 3) : [];

              if (prevItems.length) {
                gsap.to(prevItems, {
                  opacity: 0, y: -10, duration: 0.2, stagger: 0.04, ease: 'power2.in',
                  onComplete: () => {
                    gsap.set(prevItems, { display: 'none' });
                    gsap.set(currentItems, { display: 'block' });
                    gsap.fromTo(currentItems,
                      { opacity: 0, y: 16 },
                      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
                    );
                  },
                });
              } else {
                // First load
                gsap.set(cardItems, { display: 'none' });
                gsap.set(currentItems, { display: 'block' });
                gsap.fromTo(currentItems,
                  { opacity: 0, y: 16 },
                  { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
                );
              }
            }
          },
        });
      }, sectionRef);

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => { ctx.revert(); activeRef.current = -1; };
    });

    /* ─── MOBILE ─── */
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        const headerEls = headerRef.current?.querySelectorAll('.approach-header-el');
        if (headerEls) {
          gsap.fromTo(headerEls, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          });
        }

        const cards = gsap.utils.toArray<HTMLElement>('.approach-mobile-card');
        cards.forEach((card) => {
          gsap.fromTo(card, { y: 24, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [pillars.length]);

  if (pillars.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative bg-off-white">
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto px-6 lg:px-10 text-center"
        style={{
          maxWidth: 'var(--max-width-narrow)',
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(3rem, 6vw, 4rem)',
        }}
      >
        <p
          className="approach-header-el font-sans uppercase tracking-widest"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.25em', color: 'var(--gold)', marginBottom: 'var(--space-lg)', opacity: 0 }}
        >
          {approach?.label}
        </p>
        <h2
          className="approach-header-el font-serif text-navy text-balance"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.025em', opacity: 0 }}
        >
          {approach?.title}
        </h2>
        <p
          className="approach-header-el font-sans text-text-muted"
          style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, marginTop: 'var(--space-lg)', maxWidth: '540px', marginLeft: 'auto', marginRight: 'auto', opacity: 0 }}
        >
          {approach?.subtitle}
        </p>
        <p
          className="approach-header-el font-sans uppercase tracking-widest"
          style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', color: 'var(--gold)', marginTop: 'var(--space-xl)', opacity: 0 }}
        >
          {approach?.intro}
        </p>
      </div>

      {/* ── Desktop: Giant Typography + Floating Image ── */}
      <div ref={splitRef} className="hidden lg:flex bg-off-white" style={{ height: '100vh' }}>

        {/* LEFT — Giant typography on white */}
        <div className="w-[45%] flex flex-col justify-between px-10 xl:px-16 py-12 xl:py-16">
          {/* Number + title */}
          <div className="flex-1 flex flex-col justify-center">
            <span
              ref={numberRef}
              className="block font-serif text-navy/[0.06]"
              style={{
                fontSize: 'clamp(6rem, 10vw, 9rem)',
                fontWeight: 200,
                lineHeight: 0.85,
                letterSpacing: '-0.05em',
              }}
            >
              {pillars[0]?.num}
            </span>

            <div
              ref={lineRef}
              className="bg-gold mt-6"
              style={{ width: '40px', height: '2px', transformOrigin: 'left center' }}
            />

            <h3
              ref={titleRef}
              className="font-serif text-navy mt-5"
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}
            >
              {pillars[0]?.title}
            </h3>
          </div>

          {/* Vertical progress */}
          <div className="flex items-center gap-4">
            <div className="bg-border rounded-full overflow-hidden" style={{ width: '2px', height: '60px' }}>
              <div
                ref={progressFillRef}
                className="bg-gold w-full rounded-full"
                style={{ height: '100%', transformOrigin: 'top center', transform: 'scaleY(0)' }}
              />
            </div>
            <div>
              <p className="font-sans text-navy/40 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>
                {pillars.length} Pillars
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Image with floating card */}
        <div className="w-[55%] relative overflow-hidden">
          {/* Stacked images */}
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="approach-bg-img absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={pillar.img}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: 'center 35%' }}
                sizes="55vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Subtle gradient from left for blend with white side */}
          <div
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{ width: '120px', background: 'linear-gradient(to right, var(--off-white), transparent)' }}
          />

          {/* Floating card */}
          <div
            ref={floatingCardRef}
            className="absolute z-20"
            style={{
              bottom: 'clamp(2.5rem, 5vh, 4rem)',
              left: 'clamp(1.5rem, 3vw, 2.5rem)',
              right: 'clamp(2rem, 4vw, 4rem)',
              transition: 'transform 0.1s linear',
            }}
          >
            <div
              className="backdrop-blur-xl rounded-sm border border-white/20"
              style={{
                background: 'rgba(26, 35, 50, 0.82)',
                padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              {/* All card items — stacked, GSAP toggles display */}
              {pillars.map((pillar, i) =>
                pillar.items.map((item, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="approach-card-item"
                    style={{ display: i === 0 ? 'block' : 'none' }}
                  >
                    <div
                      className="flex items-start gap-4"
                      style={{
                        paddingTop: j === 0 ? 0 : 'clamp(0.6rem, 1vw, 0.85rem)',
                        paddingBottom: 'clamp(0.6rem, 1vw, 0.85rem)',
                        borderBottom: j < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      }}
                    >
                      <span
                        className="font-sans text-gold/50 shrink-0"
                        style={{ fontSize: '0.6rem', letterSpacing: '0.1em', marginTop: '0.35em' }}
                      >
                        0{j + 1}
                      </span>
                      <p
                        className="font-sans text-off-white/90"
                        style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', lineHeight: 1.65 }}
                      >
                        {item}
                      </p>
                    </div>
                  </div>
                ))
              )}

              {/* Counter badge */}
              <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-sans uppercase text-gold/60" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
                  {approach?.label}
                </span>
                <span className="font-sans text-off-white/40" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                  <span className="text-gold">01</span> / {String(pillars.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: Stacked cards ── */}
      <div className="lg:hidden px-6" style={{ paddingBottom: 'var(--space-3xl)' }}>
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className="approach-mobile-card border-t border-border"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', opacity: 0 }}
          >
            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-md)' }}>
              <span className="font-sans text-gold" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                {pillar.num}
              </span>
              <div className="bg-gold/50" style={{ width: '32px', height: '1px' }} />
            </div>
            <h3
              className="font-serif text-navy"
              style={{ fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--space-md)' }}
            >
              {pillar.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pillar.items.map((item, j) => (
                <li
                  key={j}
                  className="font-sans text-text-muted"
                  style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, paddingTop: '0.4rem', paddingBottom: '0.4rem' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
