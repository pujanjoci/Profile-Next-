import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { projects } from '../../data/projects'
import { getProjectDetail } from '../../data/projectDetails'
import { createPageMetadata, siteConfig } from '../../seo'
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getProjectSlug,
} from '../../utils/slug'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
} from 'lucide-react'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)
  if (!project) return {}

  const detail = getProjectDetail(project.title, project.description)

  return createPageMetadata({
    title: `${project.title} | Case Study by Pujan Joshi`,
    description: `${project.title} — ${detail.role} project built with ${project.tech.slice(0, 4).join(', ')}. ${project.description}`,
    path: `/projects/${resolvedParams.slug}`,
    image: project.image,
    imageAlt: `${project.title} project showcase by Pujan Joshi`,
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.title === project.title)
  const prevProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1]
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0]

  const detail = getProjectDetail(project.title, project.description)
  const isSoftware =
    project.category === 'Web Apps' || project.category === 'Games'
  const isDesign = project.category === 'Designs'

  // Breadcrumb schema
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${siteConfig.url}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${siteConfig.url}/projects/${resolvedParams.slug}`,
      },
    ],
  }

  // Project creative work or software application schema
  const projectLd = {
    '@context': 'https://schema.org',
    '@type': isSoftware ? 'SoftwareApplication' : 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${resolvedParams.slug}`,
    image: `${siteConfig.url}${project.image}`,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: project.tech.join(', '),
    ...(isSoftware
      ? {
          applicationCategory:
            project.category === 'Games' ? 'GameApplication' : 'WebApplication',
          operatingSystem: 'Any',
        }
      : {}),
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    dateModified: project.updatedAt || '2026-07-30',
  }

  // Related projects in the same category or shared stack
  const relatedProjects = projects
    .filter((p) => p.title !== project.title)
    .filter(
      (p) =>
        p.category === project.category ||
        p.tech.some((t) => project.tech.includes(t))
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen editorial-section transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />

      <Header />

      <article className="editorial-container pt-28 pb-24">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[var(--ed-border)] mb-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-orange-500 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="text-orange-500 font-semibold truncate max-w-[220px] sm:max-w-none"
              >
                {project.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:text-orange-500 transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Project Directory</span>
          </Link>
        </div>

        {/* 1. Editorial Case Study Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
              <span className="text-orange-500 font-semibold">
                CASE STUDY {String(currentIndex + 1).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="h-px w-6 bg-[var(--ed-border-strong)]" />
              <span>{project.category}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] text-[var(--ed-text)] leading-[1.06]">
              {project.title}
            </h1>
          </div>

          {/* Action Links in Header */}
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                <span>{isDesign ? 'View Design Folder' : 'Launch Live Demo'}</span>
                <ExternalLink size={13} />
              </a>
            )}
            {!isDesign && project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <Github size={14} />
                <span>Repository</span>
              </a>
            )}
          </div>
        </header>

        {/* Metadata Ledger Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[var(--ed-border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--ed-border)] mb-12 bg-[var(--ed-surface)]/40">
          <div className="p-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block mb-1">
              Role & Responsibility
            </span>
            <p className="font-display font-bold text-sm text-[var(--ed-text)]">
              {detail.role}
            </p>
          </div>
          <div className="p-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block mb-1">
              Discipline
            </span>
            <p className="font-display font-bold text-sm text-orange-500">
              {project.category}
            </p>
          </div>
          <div className="p-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block mb-1">
              Core Stack
            </span>
            <p className="font-mono text-xs text-[var(--ed-text)] truncate">
              {project.tech.slice(0, 3).join(' · ')}
            </p>
          </div>
          <div className="p-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block mb-1">
              Status & Verification
            </span>
            <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              Production · Deployed ({project.updatedAt || '2026'})
            </p>
          </div>
        </div>

        {/* 2. Large Project Cover Image */}
        <figure className="mb-16 border border-[var(--ed-border)] bg-[var(--ed-surface)] p-3 sm:p-5">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-neutral-900">
            <Image
              src={project.image}
              alt={`${project.title} project interface by Pujan Joshi`}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3 pt-3 border-t border-[var(--ed-border)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-widest text-[var(--ed-muted)]">
            <span>
              FIG 01. — {project.title.toUpperCase()} INTERFACE OVERVIEW
            </span>
            <span>{project.liveUrl}</span>
          </figcaption>
        </figure>

        {/* 3, 4, 5. Project Overview, Objectives & Challenges/Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Sticky Summary & Resources (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="border border-[var(--ed-border)] bg-[var(--ed-surface)] p-6 space-y-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-500 block">
                01 / EXECUTIVE SUMMARY
              </span>
              <p className="text-sm sm:text-base text-[var(--ed-text)] leading-relaxed">
                {project.description}
              </p>

              <div className="pt-4 border-t border-[var(--ed-border)] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] block">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
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

              <div className="pt-4 border-t border-[var(--ed-border)] flex flex-col gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono uppercase tracking-[0.16em] font-semibold hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
                  >
                    <span>
                      {isDesign ? 'Open Design Archive' : 'Open Live Application'}
                    </span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {!isDesign && project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.16em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
                  >
                    <span>Inspect Source Code</span>
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Right Editorial Narrative (8 Cols) */}
          <div className="lg:col-span-8 space-y-14">
            {/* Section: What Was Built / Project Objectives */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-orange-500">
                <span>02 / ARCHITECTURE & OBJECTIVES</span>
                <span className="h-px flex-1 bg-[var(--ed-border)]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                What Was Built
              </h2>
              <p className="text-base sm:text-lg text-[var(--ed-muted)] leading-relaxed">
                {detail.whatWasBuilt}
              </p>
            </section>

            {/* Section: Challenges & Engineering Solutions */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-orange-500">
                <span>03 / CHALLENGES & SOLUTIONS</span>
                <span className="h-px flex-1 bg-[var(--ed-border)]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                Engineering & Design Resolution
              </h2>
              <p className="text-base sm:text-lg text-[var(--ed-muted)] leading-relaxed">
                {detail.problemSolved}
              </p>
            </section>

            {/* Section: Key Features & Implementation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-orange-500">
                <span>04 / KEY CAPABILITIES & DELIVERABLES</span>
                <span className="h-px flex-1 bg-[var(--ed-border)]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                System Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail.features.map((feat, idx) => (
                  <div
                    key={feat}
                    className="p-5 border border-[var(--ed-border)] bg-[var(--ed-surface)] flex items-start gap-3.5"
                  >
                    <span className="font-mono text-xs font-bold text-orange-500 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="text-sm text-[var(--ed-text)] leading-relaxed font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* 10. Previous & Next Sequential Project Navigation */}
        <nav
          aria-label="Sequential project navigation"
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--ed-border)] border border-[var(--ed-border)] mb-20"
        >
          {prevProject && (
            <Link
              href={`/projects/${getProjectSlug(prevProject)}`}
              className="group bg-[var(--ed-bg)] hover:bg-[var(--ed-surface)] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] group-hover:text-orange-500 transition-colors">
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                <span>Previous Case Study</span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-orange-500 block mb-1">
                  {prevProject.category}
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold text-[var(--ed-text)]">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              href={`/projects/${getProjectSlug(nextProject)}`}
              className="group bg-[var(--ed-bg)] hover:bg-[var(--ed-surface)] p-6 sm:p-8 flex flex-col justify-between gap-4 md:items-end md:text-right transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] group-hover:text-orange-500 transition-colors">
                <span>Next Case Study</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-orange-500 block mb-1">
                  {nextProject.category}
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold text-[var(--ed-text)]">
                  {nextProject.title}
                </p>
              </div>
            </Link>
          )}
        </nav>

        {/* 11. Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-12 border-t border-[var(--ed-border)]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-orange-500 block mb-2">
                  SIMILAR ARCHITECTURE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                  Related Works
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:text-orange-500 transition-colors"
              >
                <span>All {projects.length} Projects</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rel) => {
                const relSlug = getProjectSlug(rel)
                return (
                  <Link
                    key={rel.title}
                    href={`/projects/${relSlug}`}
                    className="group block border border-[var(--ed-border)] bg-[var(--ed-surface)] p-4 transition-colors hover:border-orange-500"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-neutral-900 mb-4">
                      <Image
                        src={rel.image}
                        alt={`${rel.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-500">
                      {rel.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[var(--ed-text)] mt-1 group-hover:text-orange-500 transition-colors">
                      {rel.title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Commission CTA Banner */}
        <section className="mt-20 border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-orange-500 block">
              COLLABORATION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
              Interested in commissioning a similar platform?
            </h2>
            <p className="text-sm text-[var(--ed-muted)] leading-relaxed">
              Explore my{' '}
              <Link
                href="/services"
                className="text-orange-500 hover:underline font-medium"
              >
                design and development services
              </Link>{' '}
              or initiate a direct conversation regarding your project scope.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              <span>Contact Pujan Joshi</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              <span>View Services</span>
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
