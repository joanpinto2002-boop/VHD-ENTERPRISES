'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type en from '@/messages/en.json';

type Messages = typeof en;

const properties = [
  {
    id: 1,
    title: 'Spectacular villa of 265m²',
    location: 'Close to Sitges',
    image: 'https://vdhenterprises.com/wp-content/uploads/2018/12/piscina-vistas-doc.jpg',
  },
  {
    id: 2,
    title: 'Fabulous apartment of 136m²',
    location: 'Downtown Barcelona',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/IMG_0186.jpg',
  },
  {
    id: 3,
    title: 'Apartments in Girona Golf Club House',
    location: 'Girona',
    image: 'https://vdhenterprises.com/wp-content/uploads/2017/01/cocina.jpg',
  },
  {
    id: 4,
    title: 'Independent villa on plot of 750m²',
    location: 'Costa Brava · Private Pool',
    image: 'https://vdhenterprises.com/wp-content/uploads/2016/12/096.jpg',
  },
];

export function Projects({ t }: { t: Messages }) {
  return (
    <section
      className="bg-off-white"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width-wide)' }}>
        {/* Section header */}
        <div className="text-center" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-navy text-balance">{t.projects.title}</h2>
          </Reveal>
        </div>

        {/* Featured property — hero size */}
        <Reveal delay={200} variant="scale">
          <div className="mt-16 relative group cursor-pointer overflow-hidden">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
              <Image
                src={properties[0].image}
                alt={properties[0].title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                style={{ transitionDuration: '1.2s', transitionTimingFunction: 'var(--ease-out)' }}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <p
                className="font-sans text-gold/80 uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.15em', marginBottom: 'var(--space-xs)' }}
              >
                {properties[0].location}
              </p>
              <h3
                className="text-white"
                style={{ fontSize: 'clamp(1.5rem, 3vw, var(--text-3xl))', letterSpacing: '-0.02em' }}
              >
                {properties[0].title}
              </h3>
            </div>
          </div>
        </Reveal>

        {/* 3-column grid for remaining properties */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {properties.slice(1).map((property, i) => (
            <Reveal key={property.id} delay={300 + i * 120} variant="scale">
              <div className="relative group cursor-pointer overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    style={{ transitionDuration: '1.2s', transitionTimingFunction: 'var(--ease-out)' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p
                    className="font-sans text-gold/80 uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', marginBottom: '4px' }}
                  >
                    {property.location}
                  </p>
                  <h3
                    className="text-white"
                    style={{ fontSize: 'var(--text-lg)', letterSpacing: '-0.01em' }}
                  >
                    {property.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
