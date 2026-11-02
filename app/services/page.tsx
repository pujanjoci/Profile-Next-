'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Layout,
  Code2,
  ShoppingBag,
  Terminal,
  Search,
  Gauge,
  ArrowUpRight,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../seo'
import {
  EditorialReveal,
  EditorialSectionHeader,
} from '../components/editorial/EditorialMotion'

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: 'ui-ux',
      number: '01',
      icon: Layout,
      title: 'UI/UX & Interface Design',
      tagline: 'Editorial Systems & User-Centric Mockups',
      description:
        'I create intuitive web layouts and comprehensive design systems using Figma. Every visual decision—from typographic scale to layout spacing and micro-interactions—is purposefully chosen to match your brand and engage target users.',
      deliverables: [
        'Custom Figma Design Systems',
        'Typography & Color Token Architecture',
        'Interactive High-Fidelity Prototypes',
        'Responsive Multi-Breakpoint Grids',
      ],
      exampleProjectSlug: 'school-ui-ux-template',
      exampleProjectTitle: 'School UI/UX Template',
    },
    {
      id: 'architecture',
      number: '02',
      icon: Code2,
      title: 'Custom React & Next.js Development',
      tagline: 'High-Performance Frontend Architecture',
      description:
        'I build clean, accessible, and fast web applications using React, Next.js (App Router), TypeScript, and Tailwind CSS. Specializing in semantic markup and optimized server-side and static page generation for search engine visibility.',
      deliverables: [
        'Next.js App Router Architecture',
        'Strict TypeScript Component Systems',
        'Accessible (WCAG) Semantic Markup',
        'Framer Motion Layout Choreographies',
      ],
      exampleProjectSlug: 'novel-editor',
      exampleProjectTitle: 'Novel Editor',
    },
    {
      id: 'web-apps',
      number: '03',
      icon: ShoppingBag,
      title: 'E-Commerce Integrations',
      tagline: 'Scalable Digital Storefronts',
      description:
        'I develop online storefronts built to scale. From customized catalog navigation and advanced search filters to secure checkout systems and inventory panels, I ensure your store loads instantaneously.',
      deliverables: [
        'Dynamic Shopping Cart Systems',
        'Streamlined Checkout Workflows',
        'Database & Inventory Integration (Supabase / MySQL)',
        'Catalog Filtering & Management Panels',
      ],
      exampleProjectSlug: 'ecommerce-website',
      exampleProjectTitle: 'Modern E-Commerce',
    },
    {
      id: 'performance',
      number: '04',
      icon: Terminal,
      title: 'Simulations & Interactive Concept Sites',
      tagline: 'Bespoke Interactive Web Environments',
      description:
        'I design and engineer custom interactive web experiences, including browser-based operating system simulations and terminal-themed command-line portfolios that elevate user engagement and brand memorability.',
      deliverables: [
        'Custom CLI Command Engines',
        'Multi-Window Desktop Layout Managers',
        'Real-Time Synchronization (Socket.io)',
        'Interactive Canvas & State Systems',
      ],
      exampleProjectSlug: 'windows-portfolio',
      exampleProjectTitle: 'Windows 11 Simulation',
    },
    {
      id: 'seo',
      number: '05',
      icon: Search,
      title: 'Search Engine Optimization (SEO)',
      tagline: 'Technical Visibility & Structured Data',
      description:
        'I apply high-impact technical SEO to web platforms. By configuring semantic document hierarchies, canonical tags, automated sitemaps/robots rules, and structured JSON-LD schemas, I help your digital presence rank higher.',
      deliverables: [
        'Automated Sitemap & Robots Configuration',
        'Structured JSON-LD Graph Schemas',
        'Canonical URL & OpenGraph Architecture',
        'Semantic Heading & Metadata Audits',
      ],
      exampleProjectSlug: 'developer-blog',
      exampleProjectTitle: 'Developer Blog',
    },
    {
      id: 'audits',
      number: '06',
      icon: Gauge,
      title: 'Performance Optimization & Audits',
      tagline: 'Core Web Vitals Engineering',
      description:
        'I audit and resolve performance bottlenecks on slow-loading websites. By optimizing font delivery, lazy-loading below-the-fold media, and eliminating Cumulative Layout Shift (CLS), I ensure fast load times across devices.',
      deliverables: [
        'Lighthouse & Core Web Vitals Optimization',
        'Next/Image & WebP Asset Pipelines',
        'Zero-CLS Layout Stabilization',
        'Bundle Splitting & Hydration Tuning',
      ],
      exampleProjectSlug: 'archio-designs',
      exampleProjectTitle: 'Archio Designs',
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
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
            name: 'Services',
            item: `${siteConfig.url}/services`,
          },
        ],
      },
      ...serviceDetails.map((service) => ({
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'Person',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: 'Worldwide',
      })),
    ],
  }

  return (
    <main className="min-h-screen editorial-section transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <div className="editorial-container pt-28 pb-24">
        {/* Top Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[var(--ed-border)] mb-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-orange-500 font-semibold">
                Services
              </li>
            </ol>
          </nav>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:text-orange-500 transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>
        </div>

        <EditorialSectionHeader
          index="PRACTICE"
          label="Capabilities & Deliverables"
          title="Detailed design & engineering"
          accentWord="services."
          subtitle="Bespoke frontend architectures, design systems, and full-stack web solutions engineered for speed, clarity, and conversion."
          headingLevel="h1"
          rightContent={
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              <span>Request a Consultation</span>
              <ArrowUpRight size={14} />
            </Link>
          }
        />

        {/* Editorial Numbered Service Specifications */}
        <div className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon
            return (
              <EditorialReveal key={service.title} delay={index * 0.04}>
                <section
                  id={service.id}
                  className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-28"
                >
                  {/* Left Column (4 Cols): Index, Icon & Tagline */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-orange-500">
                        /{service.number}
                      </span>
                      <span className="h-px w-6 bg-[var(--ed-border-strong)]" />
                      <Icon size={16} className="text-[var(--ed-muted)]" />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs font-mono uppercase tracking-[0.16em] text-orange-500">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Middle Column (4 Cols): Narrative & Case Study Link */}
                  <div className="lg:col-span-4 space-y-6">
                    <p className="text-sm sm:text-base text-[var(--ed-muted)] leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-semibold text-orange-500 hover:underline"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowUpRight size={13} />
                      </Link>
                      {service.exampleProjectSlug && (
                        <Link
                          href={`/projects/${service.exampleProjectSlug}`}
                          className="inline-flex items-center gap-1.5 text-[var(--ed-text)] hover:text-orange-500 transition-colors"
                        >
                          <span>Example: {service.exampleProjectTitle}</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Column (4 Cols): Deliverables */}
                  <div className="lg:col-span-4 bg-[var(--ed-surface)] border border-[var(--ed-border)] p-6 space-y-4">
                    <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                      Primary Deliverables
                    </h3>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[var(--ed-text)] font-medium"
                        >
                          <span className="font-mono text-[11px] text-orange-500 font-bold mt-0.5">
                            0{i + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </EditorialReveal>
            )
          })}
        </div>

        {/* Bottom Collaboration CTA */}
        <section className="mt-20 border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-orange-500 block">
              COMMISSION A PROJECT
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
              Ready to elevate your digital presence?
            </h2>
            <p className="text-sm text-[var(--ed-muted)] leading-relaxed">
              Whether you need a complete web application, an editorial redesign, or a technical SEO and performance audit, let&apos;s discuss your requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              <span>Start Collaboration</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              <span>View Work Archive</span>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
