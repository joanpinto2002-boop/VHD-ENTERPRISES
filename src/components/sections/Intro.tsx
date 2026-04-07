'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS =
  'Van den Hout Enterprises combines the personal and hands-on services of a small enterprise with all the benefits of a huge international service network.'.split(' ');

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Word-by-word reveal on the headline ── */
      const words = gsap.utils.toArray<HTMLSpanElement>('.intro-word');
      if (words.length) {
        gsap.set(words, { opacity: 0, y: 8 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* ── Subtitle fade-in ── */
      const subtitle = document.querySelector('.intro-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: subtitle,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-off-white"
      style={{
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 4vw, 3.5rem)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '820px', textAlign: 'center' }}
      >
        <p
          ref={headlineRef}
          className="font-serif text-navy"
          style={{
            fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
            fontWeight: 300,
            lineHeight: 1.55,
            letterSpacing: '-0.02em',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className="intro-word"
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </p>
        <p
          className="intro-subtitle font-sans text-navy/50"
          style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            lineHeight: 1.8,
            marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We&apos;ll take care of your property search and will assist you during the complete purchase process.
        </p>
      </div>
    </section>
  );
}
