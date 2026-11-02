'use client'

import { EditorialReveal, EditorialSectionHeader } from './editorial/EditorialMotion'

interface SkillItem {
  name: string
  detail: string
}

interface SkillCategory {
  index: string
  title: string
  subtitle: string
  items: SkillItem[]
}

const SKILL_GROUPS: SkillCategory[] = [
  {
    index: '01',
    title: 'Frontend Development',
    subtitle: 'Component architecture, state orchestration & responsive rendering',
    items: [
      { name: 'Next.js (App Router)', detail: 'SSR, SSG, Server Actions & routing' },
      { name: 'React 19', detail: 'Hooks, concurrent UI & modular state' },
      { name: 'TypeScript', detail: 'Strict type safety & domain modeling' },
      { name: 'Tailwind CSS', detail: 'Design tokens & responsive grid systems' },
      { name: 'JavaScript (ES6+)', detail: 'Asynchronous engines & DOM APIs' },
      { name: 'HTML5 / CSS3', detail: 'Semantic accessibility & modern layouts' },
    ],
  },
  {
    index: '02',
    title: 'Backend & Database',
    subtitle: 'Data persistence, authentication & real-time synchronization',
    items: [
      { name: 'Node.js & Express', detail: 'Server-side logic & API routing' },
      { name: 'Supabase', detail: 'Backend-as-a-Service & authentication' },
      { name: 'MySQL', detail: 'Relational database design & queries' },
      { name: 'Socket.io', detail: 'Low-latency multiplayer synchronization' },
    ],
  },
  {
    index: '03',
    title: 'Design & Creative Tools',
    subtitle: 'Visual systems, interface prototyping & brand identity',
    items: [
      { name: 'Figma', detail: 'Design systems, auto-layout & prototypes' },
      { name: 'UI/UX Architecture', detail: 'Wireframing, user flows & editorial grids' },
      { name: 'Adobe Photoshop', detail: 'Image compositing & visual retouching' },
      { name: 'Adobe Illustrator', detail: 'Vector identity & custom iconography' },
      { name: 'Canva', detail: 'Rapid brand collateral & social systems' },
      { name: 'Prototyping & Wireframing', detail: 'Interactive user journey mapping' },
    ],
  },
  {
    index: '04',
    title: 'Development Workflow',
    subtitle: 'Version control, technical SEO & production deployment',
    items: [
      { name: 'Git & GitHub', detail: 'Branch workflows, code reviews & CI/CD' },
      { name: 'Technical SEO', detail: 'JSON-LD schemas, sitemaps & OpenGraph' },
      { name: 'Core Web Vitals', detail: 'Asset optimization, zero-CLS & fast LCP' },
      { name: 'Vercel & Netlify', detail: 'Edge network deployment & analytics' },
    ],
  },
]

export default function SkillsSection({ id = 'skills' }: { id?: string }) {
  return (
    <section
      id={id}
      className="editorial-section relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="04"
          label="Capabilities & Specification"
          title="Technical stack &"
          accentWord="disciplines."
          subtitle="Organized by functional domain—combining modern frontend engineering, backend data pipelines, and visual design tools."
        />

        <div className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]">
          {SKILL_GROUPS.map((group, groupIdx) => (
            <EditorialReveal key={group.index} delay={groupIdx * 0.05}>
              <div className="py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Group Title Column (4 Cols) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-orange-500">
                    <span>/{group.index}</span>
                    <span className="h-px w-5 bg-orange-500/40" aria-hidden="true" />
                    <span>Domain</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--ed-text)] tracking-tight">
                    {group.title}
                  </h3>
                  <p className="text-sm text-[var(--ed-muted)] leading-relaxed pr-4">
                    {group.subtitle}
                  </p>
                </div>

                {/* Technology Matrix (8 Cols) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--ed-border)] border border-[var(--ed-border)]">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group bg-[var(--ed-bg)] hover:bg-[var(--ed-surface)] p-4 sm:p-5 transition-colors duration-200 flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-sm sm:text-base text-[var(--ed-text)] group-hover:text-orange-500 transition-colors">
                          {skill.name}
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[var(--ed-border-strong)] group-hover:bg-orange-500 transition-colors shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs text-[var(--ed-muted)] leading-relaxed">
                        {skill.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
