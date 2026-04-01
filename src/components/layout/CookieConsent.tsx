'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Locale, getLocalizedPath } from '@/lib/i18n';
import type en from '@/messages/en.json';

type Messages = typeof en;

export function CookieConsent({ locale, t }: { locale: Locale; t: Messages }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vdh-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('vdh-cookie-consent', 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem('vdh-cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  const c = t.cookie_consent;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div
        className="mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-navy text-white/80 px-6 py-4 shadow-lg"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <p className="flex-1 font-sans text-sm" style={{ lineHeight: 1.6 }}>
          {c.message}{' '}
          <Link
            href={getLocalizedPath('cookies', locale)}
            className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors"
          >
            {c.link}
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="font-sans text-sm text-white/50 hover:text-white transition-colors px-4 py-2"
          >
            {c.decline}
          </button>
          <button
            onClick={handleAccept}
            className="font-sans text-sm font-medium bg-gold text-navy px-5 py-2 hover:bg-gold-light transition-colors"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
