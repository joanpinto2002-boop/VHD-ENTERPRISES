import Link from 'next/link';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const f = t.footer;

  return (
    <footer className="bg-navy text-white/70">
      <div
        className="mx-auto px-6 lg:px-10"
        style={{ maxWidth: 'var(--max-width)', paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-xl)' }}
      >
        {/* Top: Logo + tagline */}
        <div className="mb-16">
          <p className="font-serif text-white mb-3" style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em' }}>VDH</p>
          <p className="text-sm text-white/40 max-w-sm" style={{ lineHeight: 1.6 }}>{f.tagline}</p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={{ letterSpacing: '0.15em' }}>
              {f.advisory}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={getLocalizedPath('advisory', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.purchase}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('full-service', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.fullservice}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('investment', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.investment}
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties & Insights */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={{ letterSpacing: '0.15em' }}>
              {f.resources}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={getLocalizedPath('portfolio', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.buying}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('market', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.market}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('insights', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.sitges}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={{ letterSpacing: '0.15em' }}>
              {f.about_section}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={getLocalizedPath('about', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.about_paul}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('about', locale)} className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  {f.stories}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/30 mb-5" style={{ letterSpacing: '0.15em' }}>
              {f.contact_section}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+34609321308" className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  (+34) 609 321 308
                </a>
              </li>
              <li>
                <a href="mailto:office@vdhenterprises.com" className="hover:text-white transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
                  office@vdhenterprises.com
                </a>
              </li>
              <li className="text-white/40 text-xs leading-relaxed pt-1">
                Carrer Lepant 286-288<br />
                08013 Barcelona, Spain
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/paul-van-den-hout-barcelona-7b67b42a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <Link
                href={getLocalizedPath('contact', locale)}
                className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                {f.start_conversation} →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-white/30">
            {f.copyright} ·{' '}
            <Link href={getLocalizedPath('privacy', locale)} className="transition-colors hover:text-white/50">Privacy</Link> ·{' '}
            <Link href={getLocalizedPath('legal', locale)} className="transition-colors hover:text-white/50">Legal</Link> ·{' '}
            <Link href={getLocalizedPath('cookies', locale)} className="transition-colors hover:text-white/50">Cookies</Link>
          </p>
          <p className="text-xs text-white/25">
            AEPI · AICAT Registre #4261
          </p>
        </div>
      </div>
    </footer>
  );
}
