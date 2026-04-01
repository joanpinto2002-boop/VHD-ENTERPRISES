'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import type en from '@/messages/en.json';

type Messages = typeof en;

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

export function Testimonials({ t }: { t: Messages }) {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section
      className="bg-light-grey"
      style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
    >
      <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
        {/* Section header */}
        <div className="text-center">
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              Testimonials
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-navy text-balance">{t.testimonials.title}</h2>
          </Reveal>
        </div>

        {/* Featured testimonial */}
        <Reveal delay={200} variant="fade">
          <div className="mt-16 text-center" style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
            <blockquote>
              <p
                className="text-navy font-serif"
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, var(--text-xl))',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  transition: 'opacity 0.4s ease',
                }}
              >
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <p className="font-sans text-navy font-medium" style={{ fontSize: 'var(--text-base)' }}>
                  {current.name}
                </p>
                <p className="text-text-muted mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                  {current.origin} — {current.project}
                </p>
              </footer>
            </blockquote>
          </div>
        </Reveal>

        {/* Navigation dots + names */}
        <Reveal delay={300} variant="fade">
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className={`font-sans px-4 py-2 text-sm transition-all border ${
                  i === active
                    ? 'bg-navy text-white border-navy'
                    : 'bg-transparent text-text-muted border-border hover:border-navy/30 hover:text-navy'
                }`}
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {item.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
