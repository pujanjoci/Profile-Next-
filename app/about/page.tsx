'use client'

import About from '../components/About'
import SkillsSection from '../components/SkillsSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { siteConfig } from '../seo'

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteConfig.url}/about#aboutpage`,
        url: `${siteConfig.url}/about`,
        name: 'About Pujan Joshi - Web Designer & Developer',
        description:
          'Learn about Pujan Joshi, his full-stack development experience, design skills, tools, and philosophy.',
        mainEntity: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
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
            name: 'About',
            item: `${siteConfig.url}/about`,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen editorial-section transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Top Breadcrumb Bar */}
      <div className="pt-28 pb-2 editorial-container">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-orange-500 font-semibold">
              About
            </li>
          </ol>
        </nav>
      </div>

      <About
        name="Pujan"
        bio="I am a developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."
        skills={[
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'HTML',
          'CSS',
          'JS',
          'MySQL',
          'Supabase',
          'Figma',
          'Git/GitHub',
          'Canva',
          'Photoshop',
        ]}
        headingLevel="h1"
      />

      <SkillsSection id="skills" />

      {/* Editorial Closing CTA Strip */}
      <section className="editorial-surface py-20 border-t border-[var(--ed-border)]">
        <div className="editorial-container flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-orange-500 block">
              NEXT STEP
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
              Review full credentials or explore selected works.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-mono uppercase tracking-[0.18em] font-semibold hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
            >
              <FileText size={14} />
              <span>View Resume</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              <span>Browse 23 Projects</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
