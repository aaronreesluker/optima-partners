# Optima Partners — Capability Showcase

A one-page concept site built to demonstrate what a modern, premium marketing
site for Optima Partners — a regulatory compliance and cybersecurity
consultancy — could look like. It is a design and engineering showcase, not a
live client property: no content has been published on Optima Partners' behalf,
and the site ships with search indexing disabled (see [Configuration](#configuration)).

Built by [Revive Marketing Management](https://revivemarketing.ai).

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/) icons
- [Inter](https://rsms.me/inter/), loaded via `next/font`

## Getting started

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm run start
```

## Notable features

- **Auto-hiding header with scrollspy** — the fixed header hides on scroll-down
  and reappears on scroll-up, and highlights the current section via an
  `IntersectionObserver`.
- **Constellation hero** — a lightweight canvas particle field behind a
  word-by-word staggered headline, with a looping marquee of the regulators
  the firm engages with (SEC, FCA, NFA, CFTC).
- **Scroll-triggered section reveals** — sections and card grids fade and lift
  into view once scrolled into the viewport, staggered per item.
- **Dark "live monitoring" panel** — a radar-style panel with sweeping
  gradient, pulsing jurisdiction blips and a rotating status card, used to
  suggest ongoing regulatory and cyber monitoring.
- **Halftone globe** — an inline SVG globe built from dotted landmass
  polygons, with a labelled office network (New York, London, Hong Kong,
  Dubai, Chicago, San Francisco) connected by arcs that draw themselves in on
  scroll.
- **Parallax media bands** — full-width image bands with a subtle
  scroll-linked parallax shift.
- **GA4 event wiring** — CTA clicks, insight card clicks, scroll depth
  (25/50/75/100%) and time-on-page are tracked via `lib/analytics.ts`, active
  only when a GA4 measurement ID is configured.
- **Reduced-motion fallbacks** — every animated component checks
  `prefers-reduced-motion` (via Framer Motion's `useReducedMotion`) and falls
  back to an instant, static presentation.
- **WCAG-minded contrast** — the type scale and colour palette (`CONTRACT.md`)
  are chosen to keep body text at or above 4.5:1 contrast on white.

## Configuration

The site works with no environment configuration. To enable GA4 analytics,
set `NEXT_PUBLIC_GA_ID` to a valid Measurement ID (see `.env.example`) — the
GA4 script tags in `app/layout.tsx` and the event tracking in
`lib/analytics.ts` only activate when this is present.

The site ships with `robots: { index: false, follow: false }` in
`app/layout.tsx`, so it will not be indexed by search engines until it is
explicitly cleared for public deployment.

## Content placeholders

This is a concept build, not a finished client site. Two areas are
deliberately left as visibly labelled placeholders and must not be treated as
real content:

- **Testimonial slot** (`components/Proof.tsx`) — reserved for a real,
  attributed client quote. No testimonial has been fabricated.
- **Insights cards** (`components/Insights.tsx`) — placeholder headlines only,
  to be replaced by a live insights/content feed at launch.

No statistics, regulatory claims or case details have been invented anywhere
on the site. The logo in `components/Logo.tsx` is a recreation for layout
purposes and should be swapped for the official Optima Partners logo asset
once supplied.
