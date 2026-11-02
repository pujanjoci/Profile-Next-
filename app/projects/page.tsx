'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Search,
  X,
  FolderGit2,
  LayoutGrid,
  List,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { getProjectSlug } from '../utils/slug'
import {
  EditorialReveal,
  EditorialSectionHeader,
} from '../components/editorial/EditorialMotion'

const CATEGORIES = [
  'All',
  'Company Websites',
  'Web Apps',
  'Games',
  'UI/UX',
  'Designs',
] as const
type Category = (typeof CATEGORIES)[number]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid')

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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen w-full editorial-section transition-colors duration-300">
      <Header />

      <main className="editorial-container pt-28 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-orange-500 font-semibold">
              Projects Directory
            </li>
          </ol>
        </nav>

        <EditorialSectionHeader
          index="ARCHIVE"
          label={`Complete Work Index (${projects.length} Projects)`}
          title="All digital products &"
          accentWord="case studies."
          subtitle="A comprehensive archive of corporate portals, full-stack web applications, multiplayer games, UI/UX design systems, and brand graphics."
          headingLevel="h1"
          rightContent={
            <div className="inline-flex items-center border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                }`}
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  viewMode === 'index'
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                }`}
              >
                <List size={13} />
                <span>Index</span>
              </button>
            </div>
          }
        />

        {/* Filter & Search Bar */}
        <EditorialReveal className="mb-10 pb-6 border-b border-[var(--ed-border)] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Project categories"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 text-xs font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer border ${
                      isActive
                        ? 'border-orange-500 bg-orange-500 text-white font-semibold'
                        : 'border-[var(--ed-border)] bg-[var(--ed-surface)] text-[var(--ed-muted)] hover:text-[var(--ed-text)] hover:border-[var(--ed-border-strong)]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`ml-2 text-[10px] ${
                        isActive ? 'text-white/90' : 'text-[var(--ed-subtle)]'
                      }`}
                    >
                      [{String(categoryCounts[cat]).padStart(2, '0')}]
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ed-muted)]" />
              <input
                type="text"
                placeholder="Search title, stack, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
                className="w-full bg-[var(--ed-surface)] border border-[var(--ed-border-strong)] py-2.5 pl-10 pr-9 text-sm text-[var(--ed-text)] placeholder:text-[var(--ed-subtle)] outline-none focus:border-orange-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[var(--ed-muted)]">
            <div>
              Showing{' '}
              <span className="text-[var(--ed-text)] font-bold">
                {String(filteredProjects.length).padStart(2, '0')}
              </span>{' '}
              of {String(projects.length).padStart(2, '0')} Works
            </div>
            {searchQuery && <div>Filter Query: &ldquo;{searchQuery}&rdquo;</div>}
          </div>
        </EditorialReveal>

        {/* Directory Listing */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center border border-dashed border-[var(--ed-border-strong)] bg-[var(--ed-surface)] max-w-xl mx-auto my-8 px-6"
            >
              <FolderGit2 className="w-10 h-10 mx-auto text-orange-500 mb-4" />
              <h2 className="font-display text-xl font-bold text-[var(--ed-text)] mb-2">
                No Matching Works Found
              </h2>
              <p className="text-sm text-[var(--ed-muted)] mb-6">
                No projects matched &ldquo;{searchQuery}&rdquo; within{' '}
                {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="px-5 py-2.5 bg-orange-500 text-white text-xs font-mono uppercase tracking-widest font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.section
              key={`grid-${selectedCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
            >
              {filteredProjects.map((project, index) => {
                const slug = getProjectSlug(project)
                const isDesign = project.category === 'Designs'

                return (
                  <article
                    key={project.title}
                    className="group flex flex-col justify-between border-b border-[var(--ed-border)] pb-8"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[var(--ed-muted)] mb-3">
                        <span>NO. {String(index + 1).padStart(2, '0')}</span>
                        <span className="text-orange-500 font-semibold">
                          {project.category}
                        </span>
                      </div>

                      <Link
                        href={`/projects/${slug}`}
                        className="relative block aspect-[16/10] w-full overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-surface)] mb-5"
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} project by Pujan Joshi`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-end justify-end p-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center bg-slate-950 text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight size={16} />
                          </span>
                        </div>
                      </Link>

                      <h2 className="font-display text-xl font-bold text-[var(--ed-text)] tracking-tight mb-2 group-hover:text-orange-500 transition-colors">
                        <Link href={`/projects/${slug}`}>{project.title}</Link>
                      </h2>

                      <p className="text-sm text-[var(--ed-muted)] leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-[var(--ed-border)] bg-[var(--ed-surface)] text-[var(--ed-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

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
                              title={`View GitHub repository of ${project.title}`}
                            >
                              <Github size={13} />
                              <span>Code</span>
                            </a>
                          )}
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-orange-500 font-semibold hover:underline"
                            title={`Launch live demo of ${project.title}`}
                          >
                            <span>
                              {isDesign ? 'Designs' : 'Live Demo'}
                            </span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </motion.section>
          ) : (
            <motion.section
              key={`index-${selectedCategory}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]"
            >
              {filteredProjects.map((project, idx) => {
                const slug = getProjectSlug(project)
                const isDesign = project.category === 'Designs'
                return (
                  <div
                    key={project.title}
                    className="group py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-[var(--ed-surface)] transition-colors px-3 -mx-3"
                  >
                    <div className="md:col-span-1 text-xs font-mono text-[var(--ed-muted)]">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="md:col-span-4 flex items-center gap-4">
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden border border-[var(--ed-border)] bg-[var(--ed-surface)] hidden sm:block">
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
                        <p className="text-xs text-[var(--ed-muted)] line-clamp-1 mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-xs font-mono uppercase tracking-wider text-orange-500">
                      {project.category}
                    </div>

                    <div className="md:col-span-3 hidden md:flex flex-wrap gap-1">
                      {project.tech.slice(0, 4).map((t) => (
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
                        >
                          <Github size={14} />
                        </a>
                      )}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Live</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
