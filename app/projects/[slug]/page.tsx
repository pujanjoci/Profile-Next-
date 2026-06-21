import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { projects } from '../../data/projects'
import { getProjectDetail } from '../../data/projectDetails'
import { createPageMetadata, siteConfig } from '../../seo'
import { ArrowLeft, ExternalLink, Github, Sparkles, Terminal, ShieldAlert } from 'lucide-react'

// Define slugs mappings explicitly
const slugMap: Record<string, string> = {
  'ecommerce-website': 'Modern E-Commerce',
  'terminal-portfolio': 'Personal Portfolio',
  'windows-portfolio': 'Windows 11 Simulation',
  'house-locator': 'House Locator',
  'music-player-ui': 'Music Player UI',
  'imposter-game': 'Imposter Game',
  'novel-editor': 'Novel Editor',
  'developer-blog': 'Developer Blog',
  'digital-wedding-invitation': 'Digital Wedding Invitation',
  'white-zebra-consulting': 'White Zebra Consulting',
  'the-grand': 'The Grand',
  'sewayatra': 'SewaYatra',
  'professional-edge-global': 'Professional Edge Global',
  'everest-claims': 'Everest Claims',
  'ssuresh-associates': 'SSuresh & Associates',
  'graphic-designs-projects': 'Graphic Designs Projects',
  'school-ui-ux-template': 'School UI/UX Template',
  'school-website-template': 'School Website Template',
  'clothes-selling-site': 'Clothes Selling Site',
  'snake-game': 'Snake Game',
  'sudoku-game': 'Sudoku Game',
  'tictactoe-game': 'TicTacToe Game',
  'personal-blog-site': 'Personal Blog-Site',
}

function getProjectBySlug(slug: string) {
  const mappedTitle = slugMap[slug]
  if (mappedTitle) {
    return projects.find((p) => p.title === mappedTitle)
  }
  return projects.find((p) => {
    const projectSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return projectSlug === slug
  })
}

export async function generateStaticParams() {
  return projects.map((project) => {
    let slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (project.title === 'Modern E-Commerce') slug = 'ecommerce-website'
    if (project.title === 'Personal Portfolio') slug = 'terminal-portfolio'
    if (project.title === 'Windows 11 Simulation') slug = 'windows-portfolio'
    if (project.title === 'House Locator') slug = 'house-locator'
    return { slug }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)
  if (!project) return {}

  return createPageMetadata({
    title: `${project.title} | Pujan Joshi - Web Development Portfolio`,
    description: `Explore the project details, features, tech stack, and case study of "${project.title}" - built by Pujan Joshi, web designer and developer from Nepal.`,
    path: `/projects/${resolvedParams.slug}`,
  })
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)
  
  if (!project) {
    notFound()
  }

  const detail = getProjectDetail(project.title, project.description)

  // Breadcrumb schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": `${siteConfig.url}/projects`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `${siteConfig.url}/projects/${resolvedParams.slug}`
      }
    ]
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Header />

      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow behind the active theme */}
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] opacity-10 pointer-events-none"
          style={{ backgroundColor: project.glowColor }}
        />

        <div className="max-w-4xl mx-auto">
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
              <span className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
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
              alt={`${project.title} project by Pujan Joshi`}
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
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-350 leading-relaxed font-light">
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
                <p className="text-sm text-slate-655 dark:text-slate-400 leading-relaxed font-normal">
                  {detail.whatWasBuilt}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500">
                  Problem & Solution
                </h3>
                <p className="text-sm text-slate-655 dark:text-slate-400 leading-relaxed font-normal">
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

          {/* Contact Banner CTA */}
          <div className="mt-20 border border-slate-200 bg-white/70 p-8 sm:p-12 rounded-[2.5rem] dark:border-white/5 dark:bg-neutral-900/50 backdrop-blur-sm shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-3 text-slate-950 dark:text-white">
              Interested in similar systems?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              If you want custom frontend layout design, high-fidelity React components, or payment integrations, contact me for your next web application.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
            >
              Contact Pujan Joshi
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
