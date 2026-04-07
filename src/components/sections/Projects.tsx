'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExpandableGallery, type GalleryImage } from '@/components/ui/gallery-animation';
import type en from '@/messages/en.json';

gsap.registerPlugin(ScrollTrigger);

type Messages = typeof en;

const properties: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    alt: 'Modern luxury villa with infinity pool',
    title: 'Modern Villa with Infinity Pool',
    subtitle: 'Costa Brava · 450m²',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    alt: 'Elegant Mediterranean estate',
    title: 'Mediterranean Estate',
    subtitle: 'Sitges · 620m²',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80',
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    alt: 'Contemporary penthouse in Barcelona',
    title: 'Penthouse with Panoramic Views',
    subtitle: 'Barcelona · 280m²',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80',
    alt: 'Seaside luxury villa with terrace',
    title: 'Seaside Villa with Private Terrace',
    subtitle: 'Tossa de Mar · 380m²',
    gallery: [
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80',
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    alt: 'Exclusive hillside residence',
    title: 'Exclusive Hillside Residence',
    subtitle: 'Girona · 520m²',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7a5a2b?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80',
    ],
  },
];

export function Projects({ t }: { t: Messages }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEls = gsap.utils.toArray<HTMLElement>('.proj-header-reveal');
      if (headerEls.length) {
        gsap.fromTo(headerEls,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.proj-header', start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      }

      const gallery = section.querySelector('.proj-gallery');
      if (gallery) {
        gsap.fromTo(gallery,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: gallery, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-off-white">
      {/* ── Header — left aligned ── */}
      <div
        className="proj-header"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 4vw, 3rem) clamp(2rem, 4vh, 3rem)',
        }}
      >
        <p
          className="proj-header-reveal font-sans uppercase tracking-widest"
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--gold)',
            marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
          }}
        >
          Portfolio
        </p>
        <h2
          className="proj-header-reveal font-serif text-navy"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            maxWidth: '700px',
          }}
        >
          {t.projects.title}
        </h2>
        <div
          className="proj-header-reveal bg-gold"
          style={{ width: '40px', height: '2px', marginTop: 'clamp(1.2rem, 2vw, 1.8rem)' }}
        />
      </div>

      {/* ── Expandable Gallery — full width with side padding ── */}
      <div
        style={{
          width: '100%',
          padding: '0 clamp(1rem, 2vw, 2rem) clamp(5rem, 10vh, 8rem)',
        }}
      >
        <div className="proj-gallery" style={{ opacity: 0 }}>
          <ExpandableGallery images={properties} />
        </div>
      </div>
    </section>
  );
}
