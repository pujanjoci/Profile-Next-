import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { projects } from '../../data/projects'
import { getProjectDetail } from '../../data/projectDetails'
import { createPageMetadata, siteConfig } from '../../seo'
import { getProjectBySlug, getAllProjectSlugs, getProjectSlug } from '../../utils/slug'
import { ArrowLeft, ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const detail = getProjectDetail(project.title, project.description)
  const isSoftware = project.category === 'Web Apps' || project.category === 'Games'

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
          applicationCategory: project.category === 'Games' ? 'GameApplication' : 'WebApplication',
          operatingSystem: 'Any',
        }
      : {}),
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    dateModified: project.updatedAt || '2026-07-30',
  }

  // Related projects in the same category or other featured projects
  const relatedProjects = projects
    .filter((p) => p.title !== project.title)
    .filter((p) => p.category === project.category || p.tech.some((t) => project.tech.includes(t)))
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectLd) }}
      />

      <Header />

      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow behind the active theme */}
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] opacity-10 pointer-events-none"
          style={{ backgroundColor: project.glowColor }}
        />

        <div className="max-w-4xl mx-auto">
          {/* Accessible Semantic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400">/</li>
              <li>
                <Link href="/projects" className="hover:text-orange-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400">/</li>
              <li aria-current="page" className="text-orange-500 font-bold truncate max-w-[200px] sm:max-w-none">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-[0.25em] mb-8 group cursor-pointer"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Showcase
          </Link>

          {/* Header block */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-orange-500">
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Sparkles size={11} className="text-orange-400" />
                <span>Case Study</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-orange-500">
                {project.title}
              </span>
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Role: {detail.role}
            </p>
          </div>

          {/* Screenshot Card */}
          <div className="relative aspect-[16/10] w-full rounded-[2rem] border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-neutral-900 overflow-hidden shadow-2xl mb-12">
            <Image
              src={project.image}
              alt={`${project.title} project interface by Pujan Joshi`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              className="object-cover"
            />
          </div>

          {/* Summary / Links grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12 border-b border-slate-200 dark:border-white/10 pb-10">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Brief Overview
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 space-y-5 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/5 p-6 rounded-2xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Project Resources
              </h3>
              <div className="flex flex-col gap-2.5">
                {project.category !== 'Designs' && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-800 transition hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/15 cursor-pointer"
                    title={`View ${project.title} source code on GitHub`}
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold text-white transition shadow-lg hover:opacity-95 cursor-pointer glimmer-btn"
                  style={{
                    backgroundColor: project.glowColor,
                    boxShadow: `0 4px 12px ${project.glowColor}25`,
                  }}
                  title={`View Live Demo of ${project.title}`}
                >
                  <ExternalLink size={14} />
                  <span>{project.category === 'Designs' ? 'View Designs' : 'Launch Project'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Structured Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  What Was Built
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {detail.whatWasBuilt}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  Problem & Solution
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {detail.problemSolved}
                </p>
              </div>
            </div>

            {/* Features and Tech stacks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-white/10">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {detail.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  Technologies Applied
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 dark:border-white/5 dark:bg-neutral-900 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Internal Linking */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    Discover More Work
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white mt-1">
                    Related Projects
                  </h3>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider"
                >
                  <span>All Projects</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => {
                  const relSlug = getProjectSlug(rel)
                  return (
                    <Link
                      key={rel.title}
                      href={`/projects/${relSlug}`}
                      className="group block rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-neutral-900/60 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-neutral-950">
                        <Image
                          src={rel.image}
                          alt={`${rel.title} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-orange-500 transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Contact & Services Banner CTA */}
          <div className="mt-16 border border-slate-200 bg-white/70 p-8 sm:p-12 rounded-[2.5rem] dark:border-white/5 dark:bg-neutral-900/50 backdrop-blur-sm shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-3 text-slate-950 dark:text-white">
              Interested in similar systems?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              Explore my{' '}
              <Link href="/services" className="text-orange-500 hover:underline font-medium">
                web design and development services
              </Link>{' '}
              or get in touch to discuss your next application.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                Contact Pujan Joshi
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-white/10 hover:border-orange-500 text-slate-800 dark:text-white font-bold rounded-full transition-all duration-300 active:scale-95 cursor-pointer text-sm"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
