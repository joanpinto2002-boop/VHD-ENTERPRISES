import Image from 'next/image';
import { locales, type Locale } from '@/lib/i18n';
import { getMessages } from '@/lib/messages';
import { getPageMetadata } from '@/lib/metadata';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata('contact', locale as Locale);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const expectSteps = [
    { num: '01', title: t.contact_page.expect1_title, desc: t.contact_page.expect1_desc },
    { num: '02', title: t.contact_page.expect2_title, desc: t.contact_page.expect2_desc },
    { num: '03', title: t.contact_page.expect3_title, desc: t.contact_page.expect3_desc },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO — Minimal, text-focused
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-5xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div style={{ maxWidth: 'var(--max-width-narrow)' }}>
            <Reveal variant="fade">
              <p
                className="font-sans text-gold uppercase tracking-widest"
                style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
              >
                {t.contact_page.label}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1
                className="text-navy text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-5xl))', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                {t.contact_page.title}
              </h1>
            </Reveal>

            <Reveal delay={200} variant="fade">
              <p
                className="text-text-muted mt-6"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.6, maxWidth: '540px' }}
              >
                {t.contact_page.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT GRID — Info + Form
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingBottom: 'var(--space-4xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact info */}
            <div>
              <Reveal>
                <div
                  className="border-b border-navy/10"
                  style={{ paddingBottom: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
                >
                  <p
                    className="font-sans text-gold uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-sm)' }}
                  >
                    {t.contact_page.phone_label}
                  </p>
                  <a
                    href={`tel:${t.contact_page.phone.replace(/\s/g, '')}`}
                    className="text-navy hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-2xl)', transitionDuration: 'var(--duration-fast)' }}
                  >
                    {t.contact_page.phone}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div
                  className="border-b border-navy/10"
                  style={{ paddingBottom: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
                >
                  <p
                    className="font-sans text-gold uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-sm)' }}
                  >
                    {t.contact_page.email_label}
                  </p>
                  <a
                    href={`mailto:${t.contact_page.email}`}
                    className="text-navy hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-2xl)', transitionDuration: 'var(--duration-fast)' }}
                  >
                    {t.contact_page.email}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div
                  className="border-b border-navy/10"
                  style={{ paddingBottom: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}
                >
                  <p
                    className="font-sans text-gold uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-sm)' }}
                  >
                    {t.contact_page.address_label}
                  </p>
                  <p className="text-navy" style={{ fontSize: 'var(--text-2xl)' }}>
                    {t.contact_page.address_line1}
                  </p>
                  <p className="text-warm-grey" style={{ fontSize: 'var(--text-lg)', marginTop: 'var(--space-xs)' }}>
                    {t.contact_page.address_line2}
                  </p>
                  <p className="text-gold" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-xs)' }}>
                    {t.contact_page.address_note}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300} variant="fade">
                <p
                  className="font-sans text-gold uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-md)' }}
                >
                  {t.contact_page.social_title}
                </p>
                <div className="flex gap-6">
                  <a
                    href="https://www.linkedin.com/in/paul-van-den-hout-barcelona-7b67b42a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-base)', transitionDuration: 'var(--duration-fast)' }}
                  >
                    LinkedIn →
                  </a>
                  <a
                    href="https://www.facebook.com/Van-den-Hout-Enterprises-SL-489540154412235/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy hover:text-gold transition-colors"
                    style={{ fontSize: 'var(--text-base)', transitionDuration: 'var(--duration-fast)' }}
                  >
                    Facebook →
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Contact form */}
            <Reveal delay={200} variant="slide-right">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-sans text-sm uppercase tracking-widest text-warm-grey mb-2"
                  >
                    {t.contact_page.form_name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border border-navy/15 bg-transparent px-5 py-4 text-navy outline-none transition-colors focus:border-gold"
                    style={{ fontSize: 'var(--text-base)' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-sans text-sm uppercase tracking-widest text-warm-grey mb-2"
                  >
                    {t.contact_page.form_email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-navy/15 bg-transparent px-5 py-4 text-navy outline-none transition-colors focus:border-gold"
                    style={{ fontSize: 'var(--text-base)' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-sans text-sm uppercase tracking-widest text-warm-grey mb-2"
                  >
                    {t.contact_page.form_phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full border border-navy/15 bg-transparent px-5 py-4 text-navy outline-none transition-colors focus:border-gold"
                    style={{ fontSize: 'var(--text-base)' }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-sm uppercase tracking-widest text-warm-grey mb-2"
                  >
                    {t.contact_page.form_message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-navy/15 bg-transparent px-5 py-4 text-navy outline-none transition-colors focus:border-gold resize-none"
                    style={{ fontSize: 'var(--text-base)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-navy px-10 py-4 font-sans text-sm font-medium uppercase tracking-widest text-off-white transition-all hover:bg-gold"
                  style={{ transitionDuration: 'var(--duration-base)' }}
                >
                  {t.contact_page.form_submit}
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHAT TO EXPECT — 3-step horizontal flow
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-navy"
        style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-4xl)' }}
      >
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: 'var(--max-width)' }}>
          <Reveal variant="fade">
            <p
              className="font-sans text-gold uppercase tracking-widest text-center"
              style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', marginBottom: 'var(--space-3xl)' }}
            >
              {t.contact_page.expect_title}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {expectSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 150} variant="fade">
                <div className="text-center">
                  <span
                    className="font-sans text-gold/20"
                    style={{ fontSize: 'var(--text-4xl)', fontWeight: 300, lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-off-white mt-4"
                    style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-off-white/50"
                    style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          OFFICE — Full-width photo showcase
          ══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://vdhenterprises.com/wp-content/uploads/2016/12/mayo-2015-5.jpg"
          alt="VDH Enterprises office in Barcelona"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <Reveal variant="fade">
            <p className="font-sans text-white/80" style={{ fontSize: 'var(--text-sm)' }}>
              {t.contact_page.address_line1} · {t.contact_page.address_line2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TRUST BAR — Quote + Credentials
          ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-off-white"
        style={{ paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}
      >
        <div
          className="mx-auto px-6 lg:px-10 text-center"
          style={{ maxWidth: 'var(--max-width-narrow)' }}
        >
          <Reveal>
            <blockquote>
              <p
                className="font-serif italic text-navy/70 text-balance"
                style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7 }}
              >
                &ldquo;{t.contact_page.trust_quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-sans text-warm-grey" style={{ fontSize: 'var(--text-sm)' }}>
                  — {t.contact_page.trust_author}
                </p>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={200} variant="fade">
            <div className="flex justify-center items-center gap-10 mt-10 opacity-40">
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/Registre4261-color647-800px.jpg"
                alt="AICAT Registered Agent #4261"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/aepi-color-2.jpg"
                alt="AEPI Member"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
              <Image
                src="https://vdhenterprises.com/wp-content/uploads/2016/12/eurocertif-2.jpg"
                alt="European Certification"
                width={100}
                height={50}
                className="object-contain"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
