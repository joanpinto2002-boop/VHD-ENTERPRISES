'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type RevealVariant = 'up' | 'fade' | 'scale' | 'slide-left' | 'slide-right';

const variantClass: Record<RevealVariant, string> = {
  up: 'reveal',
  fade: 'reveal-fade',
  scale: 'reveal-scale',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  threshold = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${variantClass[variant]} ${className}`}>
      {children}
    </div>
  );
}
