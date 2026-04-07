'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  gallery?: string[]; // extra photos for this property's lightbox
}

interface ExpandableGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ images, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  /* Lightbox state: which property + which photo inside it */
  const [lightbox, setLightbox] = useState<{ propertyIdx: number; photoIdx: number } | null>(null);

  const openLightbox = (propertyIdx: number) => setLightbox({ propertyIdx, photoIdx: 0 });
  const closeLightbox = () => setLightbox(null);

  /* Build full photo list for the active property */
  const activePhotos: string[] = lightbox
    ? [images[lightbox.propertyIdx].src, ...(images[lightbox.propertyIdx].gallery ?? [])]
    : [];

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, photoIdx: (prev.photoIdx + 1) % activePhotos.length } : null);
  }, [lightbox, activePhotos.length]);

  const goToPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!lightbox) return;
    setLightbox(prev => prev ? { ...prev, photoIdx: (prev.photoIdx - 1 + activePhotos.length) % activePhotos.length } : null);
  }, [lightbox, activePhotos.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, goToNext, goToPrev]);

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1;
    return hoveredIndex === index ? 1.5 : 0.75;
  };

  const activeProperty = lightbox ? images[lightbox.propertyIdx] : null;

  return (
    <div className={className}>
      {/* Desktop: Horizontal Expandable Gallery */}
      <div className="hidden md:flex gap-2 h-[28rem] lg:h-[42rem] w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-sm"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Dark overlay — lifts on hover */}
            <motion.div
              className="absolute inset-0 bg-[var(--navy)]"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.35 }}
              transition={{ duration: 0.4 }}
            />

            {/* Bottom gradient + caption */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(26,35,50,0.7), transparent 70%)',
                padding: 'clamp(1rem, 3vw, 2rem)',
              }}
            >
              {image.subtitle && (
                <p
                  className="font-sans uppercase tracking-widest"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--gold)', opacity: 0.8, marginBottom: '4px' }}
                >
                  {image.subtitle}
                </p>
              )}
              {image.title && (
                <h3
                  className="font-serif"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', fontWeight: 400, lineHeight: 1.25, color: 'var(--off-white)', letterSpacing: '-0.01em' }}
                >
                  {image.title}
                </h3>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: Horizontal scroll gallery */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-lg"
            style={{ width: '80vw', maxWidth: '340px', aspectRatio: '3/4' }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[var(--navy)]" style={{ opacity: 0.2 }} />
            {/* Bottom gradient + caption */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(26,35,50,0.75), transparent 70%)',
                padding: '1.25rem',
              }}
            >
              {image.subtitle && (
                <p
                  className="font-sans uppercase tracking-widest"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--gold)', opacity: 0.8, marginBottom: '4px' }}
                >
                  {image.subtitle}
                </p>
              )}
              {image.title && (
                <h3
                  className="font-serif"
                  style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.25, color: 'var(--off-white)', letterSpacing: '-0.01em' }}
                >
                  {image.title}
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          Fullscreen Lightbox — per-property photos
          (Portal: renders at <body> to escape any CSS containment)
          ══════════════════════════════════════════════ */}
      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {lightbox && activeProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(26,35,50,0.97)' }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 z-10 cursor-pointer"
              style={{ color: 'var(--off-white)', opacity: 0.7 }}
              onClick={closeLightbox}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            {activePhotos.length > 1 && (
              <button
                className="absolute left-5 z-10 cursor-pointer"
                style={{ color: 'var(--off-white)', opacity: 0.7 }}
                onClick={(e) => goToPrev(e)}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Fullscreen image */}
            <div
              className="relative w-full h-full"
              style={{ padding: 'clamp(1.5rem, 3vh, 5rem) clamp(1rem, 4vw, 6rem)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightbox.photoIdx}
                  className="relative w-full h-full"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={activePhotos[lightbox.photoIdx]}
                    alt={`${activeProperty.alt} — ${lightbox.photoIdx + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            {activePhotos.length > 1 && (
              <button
                className="absolute right-5 z-10 cursor-pointer"
                style={{ color: 'var(--off-white)', opacity: 0.7 }}
                onClick={(e) => goToNext(e)}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Bottom bar: title + counter */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              style={{ color: 'var(--off-white)' }}
            >
              {activeProperty.title && (
                <p className="font-serif" style={{ fontSize: '1.05rem', marginBottom: '4px' }}>
                  {activeProperty.title}
                </p>
              )}
              {activePhotos.length > 1 && (
                <p className="font-sans" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.5 }}>
                  {lightbox.photoIdx + 1} / {activePhotos.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </div>
  );
};
