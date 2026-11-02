'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  LayoutGrid,
  List,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { projects, type Project } from '../data/projects'
import { getProjectSlug } from '../utils/slug'
import {
  EditorialReveal,
  EditorialSectionHeader,
  MagneticWrapper,
} from './editorial/EditorialMotion'

const CATEGORIES = [
  'All',
  'Company Websites',
  'Web Apps',
  'Games',
  'UI/UX',
  'Designs',
] as const

type Category = (typeof CATEGORIES)[number]

// Curated flagship titles for Section 02 (spanning Web Apps, Company Websites, UI/UX, and Games)
const FEATURED_TITLES = [
  'Windows 11 Simulation',
  'Archio Designs',
  'Modern E-Commerce',
  'Imposter Game',
  'Novel Editor',
  'White Zebra Consulting',
]

export default function Projects({ id = 'projects' }: { id?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [directoryView, setDirectoryView] = useState<'grid' | 'index'>('grid')

  // Curated Featured Projects from actual project data
  const featuredProjects = useMemo(() => {
    return FEATURED_TITLES.map((title) =>
      projects.find((p) => p.title === title)
    ).filter((p): p is Project => Boolean(p))
  }, [])

  // Category counts across all 23 projects
  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce(
      (acc, cat) => {
        acc[cat] =
          cat === 'All'
            ? projects.length
            : projects.filter((p) => p.category === cat).length
        return acc
      },
      {} as Record<Category, number>
    )
  }, [])

  // Filtered projects for Section 03 Complete Project Directory
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section
      id={id}
      className="editorial-surface relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        {/* ═════════════════════════════════════════════════════════════
            SECTION 02 — SELECTED PROJECTS (Curated Asymmetric Showcase)
        ═════════════════════════════════════════════════════════════ */}
        <EditorialSectionHeader
          index="02"
          label="Selected Works"
          title="Curated digital products &"
          accentWord="interactive systems."
          subtitle="A selection of flagship engineering and design work spanning browser operating systems, corporate platforms, e-commerce architecture, and multiplayer web games."
          rightContent={
            <MagneticWrapper>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>Open Full Archive ({projects.length})</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </MagneticWrapper>
          }
        />

        <div className="space-y-20 md:space-y-28">
          {/* Featured 01 — Wide Asymmetric Flagship (7 Cols Image / 5 Cols Editorial Spec) */}
          {featuredProjects[0] && (
            <FeaturedWideComposition
              project={featuredProjects[0]}
              index="01"
              reversed={false}
            />
          )}

          {/* Featured 02 — Reversed Asymmetric Flagship (5 Cols Spec / 7 Cols Image) */}
          {featuredProjects[1] && (
            <FeaturedWideComposition
              project={featuredProjects[1]}
              index="02"
              reversed={true}
            />
          )}

          {/* Featured 03 & 04 — Asymmetric Offset Duo (7 Cols + 5 Cols Vertical Stagger) */}
          {featuredProjects[2] && featuredProjects[3] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start pt-4 border-t border-[var(--ed-border)]">
              <div className="lg:col-span-7">
                <FeaturedEditorialColumn
                  project={featuredProjects[2]}
                  index="03"
                  aspectClass="aspect-[16/10]"
                />
              </div>
              <div className="lg:col-span-5 lg:mt-20">
                <FeaturedEditorialColumn
                  project={featuredProjects[3]}
                  index="04"
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>
          )}

          {/* Featured 05 & 06 — Counter-Balanced Duo (5 Cols + 7 Cols Vertical Stagger) */}
          {featuredProjects[4] && featuredProjects[5] && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start pt-4 border-t border-[var(--ed-border)]">
              <div className="lg:col-span-5 lg:mt-16">
                <FeaturedEditorialColumn
                  project={featuredProjects[4]}
                  index="05"
                  aspectClass="aspect-[4/3]"
                />
              </div>
              <div className="lg:col-span-7">
                <FeaturedEditorialColumn
                  project={featuredProjects[5]}
                  index="06"
                  aspectClass="aspect-[16/10]"
                />
              </div>
            </div>
          )}
        </div>

        {/* ═════════════════════════════════════════════════════════════
            SECTION 03 — COMPLETE PROJECT DIRECTORY (All 23 Projects)
        ═════════════════════════════════════════════════════════════ */}
        <div className="mt-28 md:mt-36 pt-20 border-t-2 border-[var(--ed-border-strong)]">
          <EditorialSectionHeader
            index="03"
            label={`Complete Project Directory (${projects.length} Works)`}
            title="Full index of"
            accentWord="creations."
            subtitle="Browse the complete archive across all five disciplines: Company Websites, Web Apps, Games, UI/UX Systems, and Graphic Design."
            rightContent={
              <div className="inline-flex items-center border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] p-1">
                <button
                  type="button"
                  onClick={() => setDirectoryView('grid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    directoryView === 'grid'
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={13} />
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDirectoryView('index')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    directoryView === 'index'
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                  }`}
                  aria-label="Index list view"
                >
                  <List size={13} />
                  <span>Index</span>
                </button>
              </div>
            }
          />

          {/* Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--ed-border)]">
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Project categories"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer border ${
                      isActive
                        ? 'border-orange-500 bg-orange-500 text-white font-semibold'
                        : 'border-[var(--ed-border)] bg-[var(--ed-bg)] text-[var(--ed-muted)] hover:text-[var(--ed-text)] hover:border-[var(--ed-border-strong)]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`ml-2 text-[10px] ${
                        isActive ? 'text-white/90' : 'text-[var(--ed-subtle)]'
                      }`}
                    >
                      [{String(categoryCounts[category]).padStart(2, '0')}]
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="text-xs font-mono uppercase tracking-widest text-[var(--ed-muted)]">
              Showing{' '}
              <span className="text-[var(--ed-text)] font-bold">
                {String(filteredProjects.length).padStart(2, '0')}
              </span>{' '}
              / {String(projects.length).padStart(2, '0')} Entries
            </div>
          </div>

          {/* Directory Content: Smooth Transitions between Categories & Views */}
          <AnimatePresence mode="wait">
            {directoryView === 'grid' ? (
              <motion.div
                key={`grid-${selectedCategory}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              >
                {filteredProjects.map((project, idx) => {
                  const slug = getProjectSlug(project)
                  const isDesign = project.category === 'Designs'
                  return (
                    <article
                      key={project.title}
                      className="group flex flex-col justify-between border-b border-[var(--ed-border)] pb-8"
                    >
                      <div>
                        {/* Meta Header */}
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[var(--ed-muted)] mb-3">
                          <span>
                            NO. {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-orange-500 font-medium">
                            {project.category}
                          </span>
                        </div>

                        {/* Image Preview */}
                        <Link
                          href={`/projects/${slug}`}
                          className="relative block aspect-[16/10] w-full overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-bg)] mb-5"
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-end justify-end p-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center bg-slate-950 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <ArrowUpRight size={16} />
                            </span>
                          </div>
                        </Link>

                        {/* Title & Description */}
                        <h3 className="font-display text-xl font-bold text-[var(--ed-text)] tracking-tight mb-2 group-hover:text-orange-500 transition-colors">
                          <Link href={`/projects/${slug}`}>{project.title}</Link>
                        </h3>

                        <p className="text-sm text-[var(--ed-muted)] leading-relaxed line-clamp-3 mb-4">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {/* Tech list */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-[var(--ed-border)] bg-[var(--ed-bg)] text-[var(--ed-muted)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Links Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--ed-border)] text-xs font-mono uppercase tracking-wider">
                          <Link
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-1 font-semibold text-[var(--ed-text)] hover:text-orange-500 transition-colors"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight size={13} />
                          </Link>

                          <div className="flex items-center gap-4">
                            {!isDesign && project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors"
                                title={`View ${project.title} source code`}
                              >
                                <Github size={13} />
                                <span>Code</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-orange-500 font-semibold hover:underline"
                                title={`Launch ${project.title}`}
                              >
                                <span>{isDesign ? 'Drive' : 'Live'}</span>
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </motion.div>
            ) : (
              /* Compact Editorial Index Table View */
              <motion.div
                key={`index-${selectedCategory}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]"
              >
                {filteredProjects.map((project, idx) => {
                  const slug = getProjectSlug(project)
                  const isDesign = project.category === 'Designs'
                  return (
                    <div
                      key={project.title}
                      className="group py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-[var(--ed-bg)] transition-colors px-3 -mx-3"
                    >
                      <div className="md:col-span-1 text-xs font-mono text-[var(--ed-muted)]">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="md:col-span-4 flex items-center gap-4">
                        <div className="relative h-12 w-20 shrink-0 overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-bg)] hidden sm:block">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/projects/${slug}`}
                            className="font-display font-bold text-base text-[var(--ed-text)] group-hover:text-orange-500 transition-colors"
                          >
                            {project.title}
                          </Link>
                          <p className="text-xs text-[var(--ed-muted)] line-clamp-1 md:hidden mt-0.5">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-2 text-xs font-mono uppercase tracking-wider text-orange-500">
                        {project.category}
                      </div>

                      <div className="md:col-span-3 hidden md:flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-[10px] font-mono border border-[var(--ed-border)] text-[var(--ed-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-4 text-xs font-mono uppercase tracking-wider">
                        <Link
                          href={`/projects/${slug}`}
                          className="text-[var(--ed-text)] hover:text-orange-500 font-semibold inline-flex items-center gap-1"
                        >
                          <span>Study</span>
                          <ArrowUpRight size={12} />
                        </Link>
                        {!isDesign && project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--ed-muted)] hover:text-[var(--ed-text)]"
                            title="GitHub Repository"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 font-semibold inline-flex items-center gap-1 hover:underline"
                          >
                            <span>Live</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Archive & GitHub CTA */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[var(--ed-border)]">
            <p className="text-sm text-[var(--ed-muted)]">
              Looking for additional open-source repositories, experiments, or source code?
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                <span>Dedicated Projects Directory</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://github.com/pujanjoci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <Github size={14} />
                <span>GitHub (@pujanjoci)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Subcomponent: Wide Asymmetric Featured Project Composition
───────────────────────────────────────────────────────────── */
function FeaturedWideComposition({
  project,
  index,
  reversed,
}: {
  project: Project
  index: string
  reversed: boolean
}) {
  const slug = getProjectSlug(project)

  return (
    <EditorialReveal>
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Preview Column (7 Cols) */}
        <div
          className={`lg:col-span-7 ${
            reversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <Link
            href={`/projects/${slug}`}
            className="group relative block aspect-[16/10] w-full overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-bg)] p-2 sm:p-3"
          >
            <div className="relative h-full w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
              <Image
                src={project.image}
                alt={`${project.title} showcase`}
                fill
                sizes="(max-width: 1024px) 100vw, 740px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </Link>
        </div>

        {/* Editorial Specification Column (5 Cols) */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            reversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--ed-border)] pb-3 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
            <span>FEATURED / {index}</span>
            <span className="text-orange-500 font-semibold">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--ed-text)]">
            <Link
              href={`/projects/${slug}`}
              className="hover:text-orange-500 transition-colors"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-base text-[var(--ed-muted)] leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-subtle)] block">
              Architecture & Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono border border-[var(--ed-border)] bg-[var(--ed-bg)] text-[var(--ed-text)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${slug}`}
              className="group inline-flex items-center gap-2 px-5 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono uppercase tracking-[0.16em] font-semibold hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
            >
              <span>Read Case Study</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.16em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors px-2 py-2"
                title="View GitHub Repository"
              >
                <Github size={15} />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </EditorialReveal>
  )
}

/* ─────────────────────────────────────────────────────────────
   Subcomponent: Asymmetric Staggered Column Project
───────────────────────────────────────────────────────────── */
function FeaturedEditorialColumn({
  project,
  index,
  aspectClass = 'aspect-[16/10]',
}: {
  project: Project
  index: string
  aspectClass?: string
}) {
  const slug = getProjectSlug(project)

  return (
    <EditorialReveal>
      <article className="group space-y-5">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
          <span>FEATURED / {index}</span>
          <span className="text-orange-500 font-semibold">
            {project.category}
          </span>
        </div>

        <Link
          href={`/projects/${slug}`}
          className={`relative block ${aspectClass} w-full overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-bg)] p-2 sm:p-3`}
        >
          <div className="relative h-full w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
            <Image
              src={project.image}
              alt={`${project.title} showcase`}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        <div className="space-y-3 pt-1">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight group-hover:text-orange-500 transition-colors">
              <Link href={`/projects/${slug}`}>{project.title}</Link>
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[var(--ed-muted)] leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] font-mono border border-[var(--ed-border)] bg-[var(--ed-bg)] text-[var(--ed-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-3 border-t border-[var(--ed-border)] text-xs font-mono uppercase tracking-wider">
            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--ed-text)] hover:text-orange-500 transition-colors"
            >
              <span>Case Study</span>
              <ArrowUpRight size={13} />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-orange-500 font-semibold hover:underline"
              >
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors ml-auto"
              >
                <Github size={13} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </article>
    </EditorialReveal>
  )
}
