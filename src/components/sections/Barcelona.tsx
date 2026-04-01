import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function Barcelona({ t }: { t: Messages }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
      {/* Background — Paul's office/Barcelona */}
      <div className="absolute inset-0">
        <Image
          src="https://vdhenterprises.com/wp-content/uploads/2016/12/mayo-2015-5.jpg"
          alt="VDH Enterprises Barcelona office"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/30" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex min-h-[80vh] items-center px-6 lg:px-10"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div style={{ maxWidth: '600px' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
            >
              Carrer Lepant 286-288, 08013 Barcelona
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h2
              className="text-white text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              {t.barcelona.title}
            </h2>
          </Reveal>

          <Reveal delay={400} variant="fade">
            <p
              className="mt-6 text-white/70"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7 }}
            >
              {t.barcelona.text}
            </p>
          </Reveal>

          <Reveal delay={600} variant="fade">
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-gold font-serif" style={{ fontSize: 'var(--text-3xl)', lineHeight: 1 }}>30+</p>
                <p className="text-white/50 font-sans mt-1" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years in Spain</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-gold font-serif" style={{ fontSize: 'var(--text-3xl)', lineHeight: 1 }}>5+</p>
                <p className="text-white/50 font-sans mt-1" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Languages</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-gold font-serif" style={{ fontSize: 'var(--text-3xl)', lineHeight: 1 }}>1995</p>
                <p className="text-white/50 font-sans mt-1" style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Since</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
