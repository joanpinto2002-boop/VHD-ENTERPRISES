import { Reveal } from '@/components/ui/Reveal';

export function PageHero({
  label,
  title,
  subtitle,
  dark = false,
  backgroundImage,
}: {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  backgroundImage?: string;
}) {
  const bg = dark ? 'bg-navy' : 'bg-off-white';
  const textColor = dark ? 'text-off-white' : 'text-navy';
  const subtitleColor = dark ? 'text-off-white/60' : 'text-warm-grey';

  return (
    <section
      className={`relative ${bg} overflow-hidden`}
      style={{
        paddingTop: 'var(--space-5xl)',
        paddingBottom: 'var(--space-4xl)',
        minHeight: backgroundImage ? '70vh' : undefined,
        display: backgroundImage ? 'flex' : undefined,
        alignItems: backgroundImage ? 'center' : undefined,
      }}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </>
      )}

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div style={{ maxWidth: 'var(--max-width-narrow)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest"
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.2em',
                marginBottom: 'var(--space-md)',
              }}
            >
              {label}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className={backgroundImage ? 'text-off-white' : textColor}
              style={{ fontSize: 'var(--text-5xl)', lineHeight: 1.1 }}
            >
              {title}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal delay={200} variant="fade">
              <p
                className={backgroundImage ? 'text-off-white/70' : subtitleColor}
                style={{
                  fontSize: 'var(--text-xl)',
                  lineHeight: 1.7,
                  marginTop: 'var(--space-lg)',
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
