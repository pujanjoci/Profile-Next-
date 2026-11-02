'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import {
  EditorialReveal,
  EditorialSectionHeader,
  MagneticWrapper,
} from './editorial/EditorialMotion'

export interface ServicesProps {
  id?: string
}

const SERVICES = [
  {
    number: '01',
    title: 'UI/UX & Web Design',
    summary:
      'Crafting editorial user interfaces, high-fidelity mockups, and structured design systems in Figma.',
    details:
      'Focused on typographic hierarchy, asymmetric grid layouts, accessible color contrast, and purposeful micro-interactions. Every interface is designed from first principles rather than generic templates.',
    deliverables: [
      'Figma Design Systems & Component Tokens',
      'Interactive Wireframes & High-Fidelity Prototypes',
      'Responsive Multi-Breakpoint Grid Architecture',
      'Brand Visual Direction & Typography Pairing',
    ],
    caseStudySlug: 'archio-designs',
    caseStudyLabel: 'Archio Designs Case Study',
    anchor: '/services#ui-ux',
  },
  {
    number: '02',
    title: 'Custom Web Development',
    summary:
      'Building fast, production-ready web applications using React, Next.js (App Router), TypeScript, and Tailwind CSS.',
    details:
      'Engineered with clean, modular, and semantic code structures. Combining Server Components, static generation, and fluid client-side transitions for strong Core Web Vitals and search visibility.',
    deliverables: [
      'Next.js App Router & TypeScript Architecture',
      'Semantic HTML5, WCAG Accessibility & Technical SEO',
      'Real-Time WebSockets (Socket.io) & API Integrations',
      'Performance Auditing & Core Web Vitals Optimization',
    ],
    caseStudySlug: 'novel-editor',
    caseStudyLabel: 'Novel Editor Case Study',
    anchor: '/services#architecture',
  },
  {
    number: '03',
    title: 'E-Commerce Solutions',
    summary:
      'Developing high-performance, secure online storefronts with dynamic carts, catalog filtering, and streamlined checkout flows.',
    details:
      'Built to eliminate checkout friction and sluggish catalog loads. Combines server-rendered product directories with responsive cart drawers and structured inventory views.',
    deliverables: [
      'Dynamic Cart State & Multi-Layer Catalog Filters',
      'Streamlined Checkout & Order Workflows',
      'Database Schema & Inventory Modeling',
      'Custom Product & Order Management Views',
    ],
    caseStudySlug: 'ecommerce-website',
    caseStudyLabel: 'Modern E-Commerce Case Study',
    anchor: '/services#web-apps',
  },
  {
    number: '04',
    title: 'Interactive Experiences',
    summary:
      'Designing bespoke web simulations and creative concepts—such as browser OS environments and CLI portfolios.',
    details:
      'Captivating digital experiences that stand out from standard static websites. Built with custom window managers, command-line parsers, and smooth interactive physics.',
    deliverables: [
      'Multi-Window Desktop OS Simulations (Zustand)',
      'Custom Retro CLI Terminal Engines & Parsers',
      'Choreographed Scroll & Gesture Interactions',
      'Multiplayer Browser Game Loops',
    ],
    caseStudySlug: 'windows-portfolio',
    caseStudyLabel: 'Windows 11 Simulation Case Study',
    anchor: '/services#performance',
  },
]

export default function ServicesSection({ id = 'services' }: ServicesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleService = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      id={id}
      className="editorial-surface relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="05"
          label="What I Offer"
          title="Professional"
          accentWord="services."
          subtitle="High-fidelity digital interfaces and full-stack web systems tailored for ambitious brands, startups, and corporate partners."
          rightContent={
            <MagneticWrapper>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>Detailed Service Specifications</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </MagneticWrapper>
          }
        />

        {/* Numbered Editorial Accordion List */}
        <div className="divide-y divide-[var(--ed-border)] border-t border-b border-[var(--ed-border)]">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedIndex === index

            return (
              <EditorialReveal key={service.number} delay={index * 0.05}>
                <div className="group transition-colors duration-200">
                  {/* Clickable Row Header */}
                  <button
                    type="button"
                    onClick={() => toggleService(index)}
                    aria-expanded={isExpanded}
                    className="w-full py-8 md:py-10 text-left grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline cursor-pointer focus:outline-none"
                  >
                    {/* Service Number */}
                    <div className="md:col-span-2 flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-orange-500">
                        /{service.number}
                      </span>
                      <span className="h-px w-6 bg-[var(--ed-border-strong)] group-hover:w-10 group-hover:bg-orange-500 transition-all duration-300" />
                    </div>

                    {/* Service Title */}
                    <div className="md:col-span-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] group-hover:text-orange-500 transition-colors tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-5">
                      <p className="text-sm sm:text-base text-[var(--ed-muted)] leading-relaxed">
                        {service.summary}
                      </p>
                    </div>

                    {/* Expand / Collapse Indicator */}
                    <div className="md:col-span-1 flex md:justify-end items-center">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center border transition-colors duration-200 ${
                          isExpanded
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-[var(--ed-border-strong)] text-[var(--ed-text)] group-hover:border-orange-500 group-hover:text-orange-500'
                        }`}
                      >
                        {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
                      </span>
                    </div>
                  </button>

                  {/* Expandable Editorial Specification Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[var(--ed-border)]/60">
                          <div className="hidden md:block md:col-span-2" />

                          {/* Extended Narrative */}
                          <div className="md:col-span-4 space-y-5">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-subtle)] block">
                              Approach & Methodology
                            </span>
                            <p className="text-sm text-[var(--ed-muted)] leading-relaxed">
                              {service.details}
                            </p>
                            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono uppercase tracking-wider">
                              <Link
                                href={service.anchor}
                                className="inline-flex items-center gap-1.5 font-semibold text-orange-500 hover:underline"
                              >
                                <span>Service Specification</span>
                                <ArrowUpRight size={13} />
                              </Link>
                              <Link
                                href={`/projects/${service.caseStudySlug}`}
                                className="inline-flex items-center gap-1.5 text-[var(--ed-text)] hover:text-orange-500 transition-colors"
                              >
                                <span>{service.caseStudyLabel}</span>
                                <ArrowUpRight size={13} />
                              </Link>
                            </div>
                          </div>

                          {/* Deliverables Matrix */}
                          <div className="md:col-span-6 space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ed-subtle)] block">
                              Key Deliverables
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.deliverables.map((item, i) => (
                                <li
                                  key={item}
                                  className="p-3.5 border border-[var(--ed-border)] bg-[var(--ed-bg)] flex items-start gap-3 text-xs sm:text-sm text-[var(--ed-text)]"
                                >
                                  <span className="font-mono text-[11px] text-orange-500 font-bold mt-0.5">
                                    0{i + 1}
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </EditorialReveal>
            )
          })}
        </div>

        {/* Bottom Consultation Strip */}
        <EditorialReveal delay={0.15}>
          <div className="mt-14 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="font-display text-lg font-bold text-[var(--ed-text)]">
                Need a custom feature architecture, performance audit, or search ranking boost?
              </p>
              <p className="text-sm text-[var(--ed-muted)]">
                Available for freelance engagements, technical consulting, and end-to-end product builds.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                <span>Commission a Project</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>All 6 Service Domains</span>
              </Link>
            </div>
          </div>
        </EditorialReveal>
      </div>
    </section>
  )
}
