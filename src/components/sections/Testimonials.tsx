'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import type en from '@/messages/en.json';

type Messages = typeof en;

const AUTOPLAY_MS = 7000;
const EASE = 'cubic-bezier(0.16,1,0.3,1)';

const testimonials = [
  {
    id: 1,
    quote: 'We contacted Paul when we were living in Seoul (South Korea). He immediately understood what we were looking for and arranged a pré selection for us to visit during our planned holidays at the Costa Brava. During our stay, we found a spectacular \'first line beach apartment\'. Paul took care of the negotiations, all the paper work, inspections + supervision, including a complete refurbish project. He offers a unique service package and we couldn\'t have made it without his support.',
    name: 'Wieneke & Jeroen Both',
    origin: 'From Seoul',
    project: 'Beach apartment in Costa Brava',
  },
  {
    id: 2,
    quote: 'VDH enterprises provides exactly what you are looking for buying a home in Spain. Paul was recommended to me by a friend who used his services earlier. Together we made a \'purchase plan to find a small penthouse\' in the centre of Seville. We found the ideal home and with Paul\'s expertise, we really made a good deal. I am very satisfied with his support; we immediately understood each other and he offers a very good value for money.',
    name: 'Harrie van Heck',
    origin: 'From Netherlands',
    project: 'Penthouse in Sevilla',
  },
  {
    id: 3,
    quote: 'We met Paul on a \'Second Home Exhibition\' in The Netherlands. He knows the market very well and understands the specific needs of foreigners. We found a loft-type apartment at the beach area (Barceloneta). VDH assisted us during the whole process, including a complete refurbishment project and Paul has become a personal friend. Very efficient, all-round service. Highly recommendable!',
    name: 'Esther & Paul',
    origin: 'From The Netherlands',
    project: 'Apartment in Barcelona',
  },
  {
    id: 4,
    quote: 'We found the services of VDH through the internet. Within hours they sent us a complete report with the \'ins & outs\' of the local market and a quote of the proposed services. We found a unique apartment, in downtown BCN, did the negotiations together, and had a fantastic deal! The company, and specially Paul are highly recommendable. They took care of everything, including signing the purchase Deed with a power of attorney.',
    name: 'Joel Kahn',
    origin: 'From Australia',
    project: 'Apartment in Barcelona',
  },
  {
    id: 5,
    quote: 'We contacted Paul after the very positive experience of my parents with him, a couple of years earlier, when they bought a villa in Tossa de Mar (Costa Brava). In our case, it was a complicated (legal) process and Paul was always there to support us. We felt very comfortable having someone with his experience, working on our behalf.',
    name: 'Frankie Gregorkiewicz',
    origin: 'From Poland',
    project: 'Villa in Tossa de Mar, Costa Brava',
  },
  {
    id: 6,
    quote: 'Paul is a trustful consultant with tremendous expertise in real estate and business in Spain. Focus on the aim, supportive and helpful. He helped me to acquire an apartment in Barcelona but offered much more like a perfect renovation and organizing all services needed to enjoy being an inhabitant in Barcelona. He became a professional friend who is there when you need him.',
    name: 'Jaap Boonstra',
    origin: 'From Amsterdam',
    project: 'Apartment in Barcelona',
  },
  {
    id: 7,
    quote: 'I was looking for an investment in residential real estate in Barcelona. VDH offered a complete building with 9 fantastic apartments + 2 shops in the Borne quarter of the city. Very professional, close to the client, always able to resolve any obstacles and willing to share his experience. After we bought, his partner company Caseuro is still handling the administration and rentals on our behalf.',
    name: 'David',
    origin: 'From Barcelona',
    project: 'Building with 9 apartments in Barcelona',
  },
  {
    id: 8,
    quote: 'The main reasons to choose for VDH were, confidence, fast feedback, a clear \'no-nonsense\', result driven approach and a hands-on mentality. It only took us one day to find the ideal apartment in the center of the city. Paul negotiated with the realtor for us and the deal was sealed the very same day. Paul and his team are very professional and always put the customer first!',
    name: 'Martin Van Beelen',
    origin: 'From Netherlands',
    project: 'Apartment in Barcelona',
  },
];

/* ── Star icon ── */
const Star = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--gold)" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0.5l1.76 4.27 4.54.37-3.46 2.93 1.08 4.43L7 10.1 3.08 12.5l1.08-4.43L.7 5.14l4.54-.37L7 .5z" />
  </svg>
);

export function Testimonials({ t }: { t: Messages }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const total = testimonials.length;

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setActive(index);
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = 0;
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    goTo((active + 1) % total, 'next');
  }, [active, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((active - 1 + total) % total, 'prev');
  }, [active, total, goTo]);

  /* ── Autoplay with progress bar ── */
  useEffect(() => {
    if (paused || isAnimating) {
      lastTimeRef.current = 0;
      return;
    }

    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      progressRef.current += delta;
      const pct = Math.min(progressRef.current / AUTOPLAY_MS, 1);
      setProgress(pct);

      if (pct >= 1) {
        goTo((active + 1) % total, 'next');
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, isAnimating, active, total, goTo]);

  /* ── Card position styles ── */
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - active;
    // Normalize to handle wrap-around
    const n = total;
    const normalizedDiff = ((diff % n) + n) % n;
    // Map to -1, 0, 1, 2... range
    const pos = normalizedDiff <= n / 2 ? normalizedDiff : normalizedDiff - n;

    if (pos === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)',
        transition: `all 0.6s ${EASE}`,
        pointerEvents: 'auto',
      };
    } else if (pos === 1) {
      return {
        transform: 'translateX(calc(50% + 2rem)) scale(0.88)',
        opacity: 0.5,
        zIndex: 8,
        filter: 'blur(3px)',
        transition: `all 0.6s ${EASE}`,
        pointerEvents: 'auto',
        cursor: 'pointer',
      };
    } else if (pos === -1) {
      return {
        transform: 'translateX(calc(-50% - 2rem)) scale(0.88)',
        opacity: 0.5,
        zIndex: 8,
        filter: 'blur(3px)',
        transition: `all 0.6s ${EASE}`,
        pointerEvents: 'auto',
        cursor: 'pointer',
      };
    }
    // Hidden — off-screen
    return {
      transform: `translateX(${pos > 0 ? 120 : -120}%) scale(0.85)`,
      opacity: 0,
      zIndex: 1,
      filter: 'blur(6px)',
      transition: `all 0.6s ${EASE}`,
      pointerEvents: 'none',
    };
  };

  return (
    <section
      className="bg-off-white"
      style={{ paddingTop: 'clamp(7rem, 14vh, 12rem)', paddingBottom: 'clamp(10rem, 18vh, 16rem)', overflowX: 'clip' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: '1280px', overflow: 'visible' }}>
        {/* Section header */}
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{ fontSize: '0.65rem', letterSpacing: '0.25em', marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}
            >
              Testimonials
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2
              className="font-serif text-navy"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em' }}
            >
              {t.testimonials.title}
            </h2>
          </Reveal>
          <Reveal delay={150} variant="fade">
            <div className="bg-gold mx-auto" style={{ width: '40px', height: '2px', marginTop: 'clamp(1.2rem, 2vw, 1.8rem)' }} />
          </Reveal>
        </div>

        {/* Card stack container */}
        <Reveal delay={200} variant="fade">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); lastTimeRef.current = 0; }}
            style={{ position: 'relative', maxWidth: '720px', margin: '0 auto', minHeight: '320px', overflow: 'visible' }}
          >
            {/* Stacked cards */}
            <div style={{ position: 'relative', width: '100%', minHeight: '280px', overflow: 'visible' }}>
              {testimonials.map((item, i) => {
                const diff = i - active;
                const n = total;
                const nd = ((diff % n) + n) % n;
                const pos = nd <= n / 2 ? nd : nd - n;

                return (
                <div
                  key={item.id}
                  onClick={pos !== 0 ? () => goTo(i, pos > 0 ? 'next' : 'prev') : undefined}
                  style={{
                    position: i === active ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    ...getCardStyle(i),
                  }}
                >
                  <div
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: 'clamp(2rem, 4vw, 3rem)',
                      boxShadow: i === active
                        ? '0 20px 60px rgba(26,35,50,0.08), 0 8px 24px rgba(26,35,50,0.04)'
                        : '0 8px 30px rgba(26,35,50,0.04)',
                    }}
                  >
                    {/* Quote mark */}
                    <div
                      className="font-serif text-gold"
                      style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        lineHeight: 1,
                        opacity: 0.15,
                        marginBottom: '-1rem',
                        userSelect: 'none',
                      }}
                    >
                      &ldquo;
                    </div>

                    {/* Quote text */}
                    <blockquote>
                      <p
                        className="font-serif text-navy"
                        style={{
                          fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                          lineHeight: 1.75,
                          fontStyle: 'italic',
                        }}
                      >
                        {item.quote}
                      </p>
                    </blockquote>

                    {/* Gold divider */}
                    <div
                      className="bg-gold"
                      style={{ width: '32px', height: '1.5px', margin: 'clamp(1.2rem, 2vw, 1.5rem) 0' }}
                    />

                    {/* Footer: name + stars */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="font-sans text-navy" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                          {item.name}
                        </p>
                        <p className="font-sans text-text-muted" style={{ fontSize: '0.8rem', marginTop: '2px' }}>
                          {item.origin} · {item.project}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, si) => <Star key={si} />)}
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Navigation: arrows + counter */}
            <div className="flex items-center justify-center gap-6" style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {/* Prev arrow */}
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '1px solid rgba(26,35,50,0.12)', background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--navy)',
                  transition: `all 0.3s ${EASE}`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(26,35,50,0.12)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Counter */}
              <span className="font-sans text-navy/50" style={{ fontSize: '0.8rem', letterSpacing: '0.08em', minWidth: '3rem', textAlign: 'center' }}>
                {String(active + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>

              {/* Next arrow */}
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '1px solid rgba(26,35,50,0.12)', background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--navy)',
                  transition: `all 0.3s ${EASE}`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'rgba(26,35,50,0.12)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: 'clamp(1rem, 2vw, 1.5rem)',
              height: '2px',
              background: 'rgba(26,35,50,0.06)',
              borderRadius: '1px',
              overflow: 'hidden',
              maxWidth: '200px',
              margin: 'clamp(1rem, 2vw, 1.5rem) auto 0',
            }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--gold)',
                  borderRadius: '1px',
                  width: `${progress * 100}%`,
                  transition: paused ? 'none' : 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
