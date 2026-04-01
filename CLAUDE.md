@AGENTS.md

# VDH Enterprises — Website Project Context

## Overview
Real estate website for Paul van den Hout (ESADE-certified property advisor, Barcelona since 1995).
Domain: https://vdhenterprises.com

## Tech Stack
- Next.js 16.2.1, React 19, TypeScript 5, Tailwind CSS 4, GSAP 3.14
- Fonts: Playfair Display (serif headings), Lato (body sans)

## i18n Architecture
- 3 locales: `en` (default, no prefix), `nl`, `es`
- Middleware-based routing with `slugMap` in `src/lib/i18n.ts`
- Locale-specific slugs map to English filesystem paths
- Locale detected via `x-vdh-locale` header

## Key Patterns
- **Add a page:** create `[locale]/new-slug/page.tsx` + add entry to `slugMap` in i18n.ts + add metadata in metadata.ts
- **Next.js 16 breaking change:** `params` is a `Promise` — always `await` it
- **Animations:** GSAP ScrollTrigger + `<Reveal>` wrapper component
- **Static generation:** All routes via `generateStaticParams()`
- **SEO:** robots.ts, sitemap.ts, jsonld.ts, per-page metadata in metadata.ts

## Build Commands
```bash
npm run dev    # Development server
npm run build  # Production build
npm start      # Start production
npm run lint   # ESLint check
```

## Known Issues
- URL typo `purchase-asistant` must be preserved (indexed by Google)
- 2 blog posts missing from XML sitemap
- Content last updated 2022 — freshness signals needed
