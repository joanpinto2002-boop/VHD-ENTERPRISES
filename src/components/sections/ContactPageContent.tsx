'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import type en from '@/messages/en.json';

type Messages = typeof en;

const WHATSAPP_NUMBER = '34609321308';
const EASE = 'cubic-bezier(0.16,1,0.3,1)';

export function ContactPageContent({ t }: { t: Messages }) {
  const cp = t.contact_page;
  const ct = t.contact_section;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWhatsAppMessage = () => {
    const lines = [];
    if (form.name) lines.push(`*${ct.form_name}:* ${form.name}`);
    if (form.email) lines.push(`*${ct.form_email}:* ${form.email}`);
    if (form.message) lines.push(`\n${form.message}`);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    const subject = encodeURIComponent(`VDH Contact — ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:office@vdhenterprises.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 1000);
  };

  const inputStyle = {
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    border: '1px solid rgba(26,35,50,0.1)',
    borderRadius: '10px',
    outline: 'none',
    background: 'var(--off-white)',
    transition: `border-color 0.3s ${EASE}`,
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        paddingTop: 'clamp(6rem, 10vh, 8rem)',
        paddingBottom: 'clamp(3rem, 5vh, 5rem)',
      }}
    >
      <div className="mx-auto px-6 lg:px-10 w-full" style={{ maxWidth: '1280px' }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">

          {/* ── Left: Map + Contact info ── */}
          <div className="flex flex-col gap-5">
            {/* Google Maps */}
            <Reveal variant="fade">
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(26,35,50,0.06)',
                  minHeight: 'clamp(260px, 38vh, 400px)',
                  position: 'relative',
                  boxShadow: '0 8px 30px rgba(26,35,50,0.06)',
                }}
              >
                <iframe
                  title="VDH Enterprises Barcelona Office"
                  src="https://www.google.com/maps?q=Carrer+de+Lepant+286,+08013+Barcelona,+Spain&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Compact info card below map */}
            <Reveal delay={150} variant="fade">
              <div
                style={{
                  background: 'rgba(26,35,50,0.02)',
                  borderRadius: '14px',
                  padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.2rem, 2.5vw, 1.5rem)',
                  border: '1px solid rgba(26,35,50,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(252,176,64,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#fcb040" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 6.67C13 10.67 8 15 8 15S3 10.67 3 6.67a5 5 0 1110 0z" />
                      <circle cx="8" cy="6.67" r="1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-navy" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {cp.address_line1}
                    </p>
                    <p className="font-sans text-text-muted" style={{ fontSize: '0.75rem', marginTop: '1px' }}>
                      {cp.address_line2}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(26,35,50,0.05)' }} />

                {/* Phone + Email row */}
                <div className="flex items-center flex-wrap gap-4">
                  <a
                    href={`tel:${cp.phone.replace(/\s/g, '')}`}
                    className="font-sans text-navy/70 inline-flex items-center gap-2"
                    style={{ fontSize: '0.8rem', textDecoration: 'none', transition: `color 0.3s ${EASE}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fcb040'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#fcb040" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 11.3v1.9a1.27 1.27 0 01-1.38 1.27 12.56 12.56 0 01-5.48-1.95 12.37 12.37 0 01-3.8-3.8A12.56 12.56 0 011.89 3.2 1.27 1.27 0 013.15 1.82h1.9a1.27 1.27 0 011.27 1.09c.08.6.23 1.19.44 1.76a1.27 1.27 0 01-.29 1.34l-.8.8a10.16 10.16 0 003.8 3.8l.8-.8a1.27 1.27 0 011.34-.29c.57.21 1.16.36 1.76.44a1.27 1.27 0 011.09 1.29z" />
                    </svg>
                    {cp.phone}
                  </a>

                  <div className="hidden sm:block" style={{ width: '1px', height: '16px', background: 'rgba(26,35,50,0.08)' }} />

                  <a
                    href={`mailto:${cp.email}`}
                    className="font-sans text-navy/70 inline-flex items-center gap-2"
                    style={{ fontSize: '0.8rem', textDecoration: 'none', transition: `color 0.3s ${EASE}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fcb040'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#fcb040" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1.5" y="3" width="13" height="10" rx="1" />
                      <path d="M1.5 4.5L8 9l6.5-4.5" />
                    </svg>
                    {cp.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Form card ── */}
          <Reveal delay={200} variant="fade">
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                boxShadow: '0 20px 60px rgba(26,35,50,0.06), 0 4px 16px rgba(26,35,50,0.03)',
                border: '1px solid rgba(26,35,50,0.04)',
              }}
            >
              <h2
                className="font-serif text-navy"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '0.4rem' }}
              >
                {ct.form_title}
              </h2>
              <p
                className="font-sans text-text-muted"
                style={{ fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
              >
                {ct.form_subtitle}
              </p>

              <form onSubmit={handleEmail} className="flex flex-col gap-3.5">
                <div>
                  <label htmlFor="cp-name" className="font-sans text-navy/60 block" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>
                    {ct.form_name}
                  </label>
                  <input
                    id="cp-name" type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    className="w-full font-sans text-navy" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                  />
                </div>

                <div>
                  <label htmlFor="cp-email" className="font-sans text-navy/60 block" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>
                    {ct.form_email}
                  </label>
                  <input
                    id="cp-email" type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    className="w-full font-sans text-navy" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                  />
                </div>

                <div>
                  <label htmlFor="cp-message" className="font-sans text-navy/60 block" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>
                    {ct.form_message}
                  </label>
                  <textarea
                    id="cp-message" name="message" required rows={4}
                    value={form.message} onChange={handleChange}
                    className="w-full font-sans text-navy resize-none" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(26,35,50,0.1)'; }}
                  />
                </div>

                <div className="flex flex-col gap-2.5" style={{ marginTop: '0.25rem' }}>
                  <button
                    type="submit" disabled={sending}
                    className="w-full font-sans text-white flex items-center justify-center gap-3"
                    style={{
                      padding: '0.8rem 1.5rem', fontSize: '0.65rem', fontWeight: 600,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      background: 'var(--navy)', borderRadius: '8px', border: 'none',
                      cursor: 'pointer', transition: `all 0.3s ${EASE}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#243042'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1.5" y="3" width="13" height="10" rx="1" />
                      <path d="M1.5 4.5L8 9l6.5-4.5" />
                    </svg>
                    {sent ? ct.form_sent : sending ? '...' : ct.form_send_email}
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1" style={{ height: '1px', background: 'rgba(26,35,50,0.08)' }} />
                    <span className="font-sans text-navy/30" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{ct.form_or}</span>
                    <div className="flex-1" style={{ height: '1px', background: 'rgba(26,35,50,0.08)' }} />
                  </div>

                  <button
                    type="button" onClick={handleWhatsApp}
                    className="w-full font-sans text-white flex items-center justify-center gap-3"
                    style={{
                      padding: '0.8rem 1.5rem', fontSize: '0.65rem', fontWeight: 600,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      background: '#25D366', borderRadius: '8px', border: 'none',
                      cursor: 'pointer', transition: `all 0.3s ${EASE}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#1ebe57'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#25D366'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {ct.form_send_whatsapp}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
