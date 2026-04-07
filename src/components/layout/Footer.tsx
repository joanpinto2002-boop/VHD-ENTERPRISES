import Link from 'next/link';
import Image from 'next/image';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const f = t.footer;

  const linkClass =
    'text-[#1d1d1f]/50 hover:text-[#1d1d1f] transition-colors';
  const linkStyle = { transitionDuration: '200ms' };

  return (
    <footer style={{ background: '#fff' }}>
      {/* ── Thin separator ── */}
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-width)', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
      >
        <div style={{ height: '1px', background: '#d2d2d7' }} />
      </div>

      {/* ── Main content ── */}
      <div
        className="mx-auto px-6 lg:px-10"
        style={{
          maxWidth: 'var(--max-width)',
          paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)',
          paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        }}
      >
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10" style={{ fontSize: '0.75rem', lineHeight: 2.2 }}>
          {/* Services */}
          <div>
            <p className="font-sans font-semibold text-[#1d1d1f]" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              {f.advisory}
            </p>
            <ul className="font-sans" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href={getLocalizedPath('advisory', locale)} className={linkClass} style={linkStyle}>
                  {f.purchase}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('full-service', locale)} className={linkClass} style={linkStyle}>
                  {f.fullservice}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('investment', locale)} className={linkClass} style={linkStyle}>
                  {f.investment}
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="font-sans font-semibold text-[#1d1d1f]" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              {f.resources}
            </p>
            <ul className="font-sans" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href={getLocalizedPath('portfolio', locale)} className={linkClass} style={linkStyle}>
                  {f.buying}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('market', locale)} className={linkClass} style={linkStyle}>
                  {f.market}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('insights', locale)} className={linkClass} style={linkStyle}>
                  {f.sitges}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="font-sans font-semibold text-[#1d1d1f]" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              {f.about_section}
            </p>
            <ul className="font-sans" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href={getLocalizedPath('about', locale)} className={linkClass} style={linkStyle}>
                  {f.about_paul}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('about', locale)} className={linkClass} style={linkStyle}>
                  {f.stories}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans font-semibold text-[#1d1d1f]" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              {f.contact_section}
            </p>
            <ul className="font-sans" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a href="tel:+34609321308" className={linkClass} style={linkStyle}>
                  (+34) 609 321 308
                </a>
              </li>
              <li>
                <a href="mailto:office@vdhenterprises.com" className={linkClass} style={linkStyle}>
                  office@vdhenterprises.com
                </a>
              </li>
              <li className="text-[#1d1d1f]/35" style={{ fontSize: '0.7rem', lineHeight: 1.6, marginTop: '0.25rem' }}>
                Carrer Lepant 286-288<br />
                08013 Barcelona, Spain
              </li>
            </ul>
          </div>
        </div>

        {/* ── Separator ── */}
        <div style={{ height: '1px', background: '#d2d2d7', marginTop: 'clamp(2rem, 4vw, 3rem)' }} />

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ paddingTop: '1rem', paddingBottom: '0.5rem' }}
        >
          <p className="font-sans text-[#6e6e73]" style={{ fontSize: '0.7rem' }}>
            {f.copyright} ·{' '}
            <Link href={getLocalizedPath('privacy', locale)} className="hover:text-[#1d1d1f] transition-colors" style={linkStyle}>Privacy</Link>{' · '}
            <Link href={getLocalizedPath('legal', locale)} className="hover:text-[#1d1d1f] transition-colors" style={linkStyle}>Legal</Link>{' · '}
            <Link href={getLocalizedPath('cookies', locale)} className="hover:text-[#1d1d1f] transition-colors" style={linkStyle}>Cookies</Link>
          </p>

          <div className="flex items-center gap-5">
            <p className="font-sans text-[#6e6e73]" style={{ fontSize: '0.7rem' }}>
              AEPI · AICAT Registre #4261
            </p>
            <a
              href="https://www.linkedin.com/in/paul-van-den-hout-barcelona-7b67b42a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1d1d1f]/30 hover:text-[#1d1d1f]/70 transition-colors"
              style={{ transitionDuration: '200ms' }}
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
