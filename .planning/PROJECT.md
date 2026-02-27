# PROJECT.md — Personal Portfolio

## What This Is

A modern, single-page portfolio website for **Pujan**, a full-stack web developer based in Nepal.
Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

The site showcases Pujan's skills, featured projects, and provides a contact point for potential clients and collaborators.

---

## Core Value

One clear goal: **make a lasting first impression** that converts visitors into clients or collaborators.

---

## Tech Stack

| Layer      | Choice                  |
| ---------- | ----------------------- |
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| Animation  | Framer Motion           |
| Icons      | Lucide React            |
| Deployment | Vercel (planned)        |

---

## Current Structure

Single-page app at `app/page.tsx`, composed of section components:

| Section     | File                         | Status                                                   |
| ----------- | ---------------------------- | -------------------------------------------------------- |
| Header      | `components/Header.tsx`      | ✅ Complete — animated pill nav, mobile menu             |
| Hero        | `components/Hero.tsx`        | ✅ Complete — profile image, animated text, floating CTA |
| About       | `components/About.tsx`       | ✅ Complete — bio, skills grid, animated shapes          |
| Projects    | `components/Projects.tsx`    | 🟡 Placeholder — fake projects, needs real content       |
| Contact     | `components/Contact.tsx`     | 🟡 Partial — UI ready, form not wired up                 |
| Footer      | `components/Footer.tsx`      | 🟡 Needs review                                          |
| ScrollToTop | `components/ScrollToTop.tsx` | ✅ Complete                                              |

---

## Requirements

### Validated (already shipped)

- ✓ Responsive single-page layout (mobile-first)
- ✓ Animated hero section with profile photo
- ✓ About section with skills
- ✓ Smooth scroll navigation with animated header
- ✓ Dark/light mode support (CSS-based)
- ✓ Framer Motion page animations

### Active (remaining to build)

- [ ] Projects section — populated with real project content + screenshots
- [ ] Contact form — wired to a backend (EmailJS or Formspree)
- [ ] Dark mode toggle — user-controlled via button/icon
- [ ] SEO — proper `<head>` metadata, Open Graph tags, sitemap
- [ ] Performance — image optimization, Lighthouse score ≥ 90
- [ ] Deployment — live on Vercel with custom domain (optional)
- [ ] Footer — social links (GitHub, LinkedIn, Twitter/X), copyright
- [ ] Blog/Writing section — optional, low priority

### Out of Scope

- CMS integration — static content is fine for now
- Authentication — no user accounts needed
- E-commerce — not relevant

---

## Key Decisions

| Decision            | Rationale                                             | Outcome    |
| ------------------- | ----------------------------------------------------- | ---------- |
| Next.js App Router  | Modern, supports RSC, easy deploy on Vercel           | ✅ In use  |
| Tailwind CSS        | Rapid utility styling, consistent design tokens       | ✅ In use  |
| Framer Motion       | Production-quality animations with minimal code       | ✅ In use  |
| Single-page design  | Better UX for portfolios, reduces navigation friction | ✅ Decided |
| Formspree / EmailJS | No backend needed, free tier sufficient               | — Pending  |

---

## Constraints

- **No backend** — all data is static or sent via third-party services
- **Budget** — free-tier services only (Vercel free, EmailJS/Formspree free)
- **Domain** — optional at this stage

---

_Last updated: 2026-02-27 after GSD initialization_
