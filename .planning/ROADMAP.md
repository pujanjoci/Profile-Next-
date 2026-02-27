# ROADMAP.md — Portfolio Project

## Overview

Portfolio for Pujan — full-stack web developer. The Home and About sections are complete.
Remaining phases focus on real content, interactivity, discoverability, and deployment.

---

## Phase 1 — Projects Section (NEXT)

**Goal:** Replace placeholder project cards with real content and polished UI.

### Plans

1. **1.1 — Real Project Content** — Add Pujan's actual projects (title, description, tech stack, screenshot, links)
2. **1.2 — Visual Polish** — Animate cards with Framer Motion, improve hover effects, ensure dark mode matches

**Deliverables:**

- Real project data in `Projects.tsx`
- Project screenshots in `public/`
- Smooth scroll-triggered animations

---

## Phase 2 — Contact Form (Backend)

**Goal:** Make the contact form actually send emails.

### Plans

1. **2.1 — Choose service** — Integrate EmailJS or Formspree (no backend required)
2. **2.2 — Form validation** — Add client-side validation + loading/success/error states

**Deliverables:**

- Working contact form
- Success/error feedback UI

---

## Phase 3 — Dark Mode Toggle

**Goal:** Add a user-controlled dark/light mode toggle that persists via `localStorage`.

### Plans

1. **3.1 — Theme Context** — Create `ThemeContext` or use `next-themes`
2. **3.2 — Toggle Button** — Add toggle to Header with sun/moon icon

**Deliverables:**

- Dark/light mode toggle in Header
- Preference persists across page refreshes

---

## Phase 4 — Footer & Social Links

**Goal:** Replace or enhance the Footer with real social links (GitHub, LinkedIn, email).

### Plans

1. **4.1 — Footer Redesign** — Social icons, copyright, quick nav links

---

## Phase 5 — SEO & Performance

**Goal:** Score ≥ 90 on Lighthouse, proper Open Graph metadata.

### Plans

1. **5.1 — Metadata** — Add `metadata` export to `layout.tsx`, OG image
2. **5.2 — Image Optimization** — Audit `next/image` usage, add `sizes`, `priority` where appropriate
3. **5.3 — Lighthouse Audit** — Run audit, address CLS, LCP, INP issues

---

## Phase 6 — Deployment

**Goal:** Ship to Vercel, verify production build.

### Plans

1. **6.1 — Vercel Deploy** — Connect repo, configure env vars
2. **6.2 — Custom Domain** — (Optional) point domain to Vercel

---

_Last updated: 2026-02-27_
