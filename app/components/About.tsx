'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileText, MapPin } from 'lucide-react'
import defaultProfileImage from '@/public/chatgpt-headshot.webp'
import {
  EditorialReveal,
  EditorialSectionHeader,
  MagneticWrapper,
} from './editorial/EditorialMotion'

export interface AboutProps {
  id?: string
  name?: string
  bio?: string
  skills?: string[]
  profileImage?: string | StaticImageData
  headingLevel?: 'h1' | 'h2'
  showExtendedBio?: boolean
}

const JOURNEY_TIMELINE = [
  {
    period: '2025 — Present',
    role: 'Freelance Web Developer & UI Designer',
    organization: 'Independent Client Solutions · Remote',
    summary:
      'Architecting bespoke web applications, brand systems, and enterprise portals including White Zebra Consulting, Credit Scoring Appraisal systems, and VAT & Inventory dashboards.',
  },
  {
    period: 'May 2025 — Nov 2025',
    role: 'Web & Graphic Designer',
    organization: 'Professional Edge Global · Kathmandu, Nepal',
    summary:
      'Designed, developed, and maintained corporate web portals for the primary enterprise and sister companies while leading digital campaign systems and internal IT operations.',
  },
  {
    period: 'Nov 2024 — Feb 2025',
    role: 'Graphic & Motion Graphic Designer (Intern)',
    organization: 'Chainge Digital · Kathmandu, Nepal',
    summary:
      'Produced digital interface assets and motion graphics across marketing campaigns using Figma, Photoshop, Illustrator, Premiere Pro, and After Effects.',
  },
  {
    period: 'Jul 2024 — Sep 2024',
    role: 'Web Designer (Internship)',
    organization: 'Bisava Technology · Nepal',
    summary:
      'Formulated brand style guidelines and responsive frontend frameworks with a focus on typographic scale and color harmony.',
  },
  {
    period: 'Academic Foundation',
    role: 'Bachelors in Information Management (BIM)',
    organization: 'Nepal Commerce Campus · Tribhuvan University',
    summary:
      'Comprehensive degree bridging Software Engineering, Database Management, System Analysis, and Information Technology.',
  },
]

export default function About({
  id = 'about',
  bio,
  profileImage = defaultProfileImage,
  headingLevel = 'h2',
}: AboutProps) {
  return (
    <section
      id={id}
      className="editorial-section relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="01"
          label="Biography & Trajectory"
          title="Bridging frontend architecture with"
          accentWord="editorial craft."
          headingLevel={headingLevel}
          rightContent={
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-muted)]">
              <MapPin size={14} className="text-orange-500" />
              <span>Bhaktapur, Nepal · 27.6710° N</span>
            </div>
          }
        />

        {/* Asymmetric 12-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 Cols): Architectural Portrait Frame + Philosophy Pull Quote */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <EditorialReveal>
              <figure className="border border-[var(--ed-border)] bg-[var(--ed-surface)] p-3 sm:p-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
                  <Image
                    src={profileImage}
                    alt="Pujan Joshi portrait photograph"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 pt-3 border-t border-[var(--ed-border)] flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[var(--ed-muted)]">
                  <span>FIG. 01 — PUJAN JOSHI</span>
                  <span className="inline-flex items-center gap-2 text-[var(--ed-text)] font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Select Work
                  </span>
                </figcaption>
              </figure>
            </EditorialReveal>

            {/* Editorial Philosophy Note */}
            <EditorialReveal delay={0.1}>
              <div className="border-l-2 border-orange-500 pl-5 py-1 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-500 block">
                  Design Ethos
                </span>
                <p className="font-serif-accent italic text-xl sm:text-2xl text-[var(--ed-text)] leading-snug">
                  &ldquo;Every interface should feel intentional—fast to load, effortless to read, and engineered down to the last micro-interaction.&rdquo;
                </p>
              </div>
            </EditorialReveal>

            {/* Action Bar */}
            <EditorialReveal delay={0.15} className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticWrapper>
                <Link
                  href="/resume"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                >
                  <FileText size={14} />
                  <span>Curriculum Vitae</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </MagneticWrapper>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-3.5 border border-[var(--ed-border-strong)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>Initiate Dialogue</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </EditorialReveal>
          </div>

          {/* Right Column (7 Cols): Editorial Biography & Career Trajectory */}
          <div className="lg:col-span-7 space-y-14">
            {/* Narrative Biography */}
            <EditorialReveal delay={0.05} className="space-y-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                01.A / OVERVIEW
              </div>

              <p className="font-display text-xl sm:text-2xl md:text-[26px] font-medium text-[var(--ed-text)] leading-[1.4] tracking-[-0.01em]">
                {bio ||
                  'I am a developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-[15px] text-[var(--ed-muted)] leading-relaxed">
                <p>
                  With a background that bridges frontend engineering and visual communication, I build digital products that balance structural clarity with expressive interaction. My primary stack centers on Next.js, React, TypeScript, and Tailwind CSS.
                </p>
                <p>
                  From interactive browser operating systems (like a full Windows 11 desktop simulation) and real-time multiplayer Socket.io games to high-converting corporate portals, I approach every project with rigorous design-system thinking.
                </p>
              </div>
            </EditorialReveal>

            {/* Key Practice Pillars */}
            <EditorialReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 border-y border-[var(--ed-border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--ed-border)]">
                <div className="py-5 sm:pr-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-orange-500 block mb-1">
                    Architecture
                  </span>
                  <p className="font-display font-bold text-base text-[var(--ed-text)]">
                    Next.js & React Systems
                  </p>
                  <p className="text-xs text-[var(--ed-muted)] mt-1 leading-relaxed">
                    SSR, static generation, and type-safe component libraries.
                  </p>
                </div>
                <div className="py-5 sm:px-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-orange-500 block mb-1">
                    Interface Craft
                  </span>
                  <p className="font-display font-bold text-base text-[var(--ed-text)]">
                    Editorial UI/UX Design
                  </p>
                  <p className="text-xs text-[var(--ed-muted)] mt-1 leading-relaxed">
                    Intentional typography, grid systems, and Figma prototyping.
                  </p>
                </div>
                <div className="py-5 sm:pl-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-orange-500 block mb-1">
                    Engineering
                  </span>
                  <p className="font-display font-bold text-base text-[var(--ed-text)]">
                    Performance & SEO
                  </p>
                  <p className="text-xs text-[var(--ed-muted)] mt-1 leading-relaxed">
                    Semantic markup, Core Web Vitals, and structured schemas.
                  </p>
                </div>
              </div>
            </EditorialReveal>

            {/* Professional Journey Timeline */}
            <EditorialReveal delay={0.15} className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                  01.B / PROFESSIONAL JOURNEY
                </span>
                <Link
                  href="/resume"
                  className="text-xs font-mono uppercase tracking-widest text-orange-500 hover:underline inline-flex items-center gap-1"
                >
                  <span>Full History</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>

              <div className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]">
                {JOURNEY_TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className="group py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-colors hover:bg-[var(--ed-surface)]/60 px-2 -mx-2"
                  >
                    <div className="sm:col-span-4 text-xs font-mono text-[var(--ed-muted)] group-hover:text-orange-500 transition-colors">
                      {item.period}
                    </div>
                    <div className="sm:col-span-8 space-y-1.5">
                      <h3 className="font-display text-base sm:text-lg font-bold text-[var(--ed-text)]">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-wider text-orange-500">
                        {item.organization}
                      </p>
                      <p className="text-sm text-[var(--ed-muted)] leading-relaxed pt-1">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
