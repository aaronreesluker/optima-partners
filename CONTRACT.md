# Optima Partners — Build Contract V2 (read fully before writing any file)

One-page showcase for a regulatory compliance and cybersecurity consultancy serving financial institutions. The design direction has CHANGED from the previous serif/bronze institutional look. The new register: modern, premium, minimal startup aesthetic — clean WHITE site, single sans-serif family, monochrome palette with one quiet accent, generous whitespace, 1px hairline dividers, large soft-radius bordered cards, pill buttons. Think a top-tier Framer/Linear-style marketing site, executed with restraint. Do NOT copy text, logos, images or code from any existing website — the aesthetic direction is described fully here.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind v3, framer-motion, lucide-react. All installed — add NO dependencies.
- Project root: `/Users/reviveoperations/Sites/Client Websites/Active/Optima Partners/optima-partners`
- Import alias `@/*` maps to project root (e.g. `@/components/FadeIn`, `@/lib/analytics`).

## Design tokens (Tailwind classes)

- Background: pure white — `bg-white` everywhere. No dark sections.
- `ink` #151817 — primary text, solid buttons, icons.
- `grey` #6E7573 — secondary/body text.
- `teal` #123C44 — the ONLY accent: eyebrow labels, category tags, list markers, link hover states, globe dots. Small doses only.
- `mist` #F6F7F7 — subtle fills: icon circles, soft panels.
- `line` #E7E9E8 — ALL borders, hairlines, card strokes (1px).
- Font: Inter for everything via `font-body` (already the body default — you rarely need the class). NO serif anywhere, no italics.

## Type scale

- H1 (Hero only): `text-5xl md:text-7xl font-medium tracking-tight leading-[1.05]`
- H2 (section headings): `text-3xl md:text-5xl font-medium tracking-tight`
- Card titles (h3): `text-xl md:text-2xl font-medium`
- Body: `text-base md:text-lg text-grey leading-relaxed`
- Eyebrow labels: `text-xs font-medium tracking-[0.25em] uppercase text-teal` (e.g. "01 — The Difference")
- Section intros are CENTRED (eyebrow, H2, supporting line centred, `mx-auto`).

## Components vocabulary

- Buttons are pills, `rounded-full`. Primary: `bg-ink text-white hover:bg-ink/80 transition-colors duration-200 px-7 py-3.5 text-sm font-medium`. Secondary: `border border-line text-ink hover:border-ink/40 transition-colors duration-200 px-7 py-3.5 text-sm font-medium`.
- Cards: `rounded-[20px] border border-line bg-white p-8 md:p-10 hover:border-ink/25 transition-colors duration-200`.
- Icon treatment: lucide icon size 20–22, `strokeWidth={1.5}`, `text-ink`, inside `flex h-12 w-12 items-center justify-center rounded-full bg-mist`.
- Section rhythm: `py-24 md:py-32`, container `mx-auto max-w-6xl px-6 md:px-10`. Every section EXCEPT the hero opens with a full-width hairline: give the `<section>` `border-t border-line`.
- Text links: `underline underline-offset-4 decoration-line hover:text-teal hover:decoration-teal transition-colors duration-200`.

## Shared components and utilities (already exist — use them, never recreate)

- `@/components/FadeIn` (default export). Props: `children`, `className?`, `delay?` (seconds), `immediate?` (true = animate on mount, hero only; default = fade up on scroll into view, once). Respects prefers-reduced-motion. Wrap every revealed block. Card grids stagger with `delay={index * 0.12}`.
- `@/lib/analytics` exports `trackEvent(name, params?)`. Fire the exact GA4 event names in your section specs.

## Rules (unchanged from V1)

- `"use client"` only where hooks/motion/handlers are used. One default-exported component per file. Strict TS, no `any`, ESLint-clean (no unused imports; escape apostrophes in JSX as `&apos;` or use ’).
- Anchor ids (exact): `approach`, `services`, `global-reach`, `insights`, `contact`.
- Exactly one `h1` (Hero owns it). Semantic elements, `aria-hidden` on decorative SVGs, alt text where meaningful, 4.5:1 body-text contrast (grey #6E7573 on white passes for text ≥14px, keep body at that or larger).
- Every interactive element: `cursor-pointer`, visible focus (global teal `:focus-visible` outline — don't suppress), hover transitions 150–300ms.
- Copy: UK English, quiet confidence, no hype, no exclamation marks, NO invented statistics/testimonials/regulatory content. Placeholder slots (Proof, Insights) must be VISIBLY labelled placeholders.
- No emoji. No stock photos, no external URLs for assets. Decorative SVGs are drawn inline, flat, in `line`/`mist`/`teal` tints only.
- Custom framer-motion beyond FadeIn allowed where specced; must check `useReducedMotion()` and fall back to instant display.
- Only create/edit the files assigned to you. Never touch `app/page.tsx`, `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`, or another agent's components.

## Page order

Header (fixed, white blur) → Hero (white, centred) → 01 The Difference (`approach`) → 02 What We Do (`services`) → 03 Global Reach (`global-reach`) → Proof (placeholder quote) → 05 Insights (`insights`) → Contact CTA (`contact`) → Footer → MobileCta (fixed, mobile only).
