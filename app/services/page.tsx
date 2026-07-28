'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Layout, Code2, ShoppingBag, Terminal, Search, Gauge, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ServicesPage() {
  const serviceDetails = [
    {
      icon: Layout,
      title: 'UI/UX & Interface Design',
      tagline: 'Aesthetic, User-Centric Mockups',
      description:
        'I create beautiful, intuitive web layouts and comprehensive design systems using Figma. Every visual aspect—from typography selections to layout spacing and micro-animations—is purposefully chosen to match your brand and engage target users.',
      deliverables: ['Custom Figma files', 'Design System tokens', 'Interactive prototypes', 'Responsive layout grids'],
    },
    {
      icon: Code2,
      title: 'Custom React & Next.js Development',
      tagline: 'High Performance Frontend Architecture',
      description:
        'I build clean, accessible, and fast web applications using React, Next.js (App Router), TypeScript, and Tailwind CSS. Specializing in semantic markup and optimized server-side and static page generation for search engine visibility.',
      deliverables: ['Next.js App Router setup', 'TypeScript component architecture', 'Accessible (WCAG) markup', 'Framer Motion animations'],
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce Integrations',
      tagline: 'Robust Sales Platforms',
      description:
        'I develop online storefronts built to scale. From customized catalog navigation and advanced search filters to secure payment gateway integrations (Stripe, etc.) and custom checkout systems, I ensure your shop loads instantly.',
      deliverables: ['Shopping cart systems', 'Stripe checkout flow', 'Database integration (Prisma/PostgreSQL)', 'Product management panels'],
    },
    {
      icon: Terminal,
      title: 'Simulations & Interactive Concept Sites',
      tagline: 'Bespoke Gamified Experiences',
      description:
        'I design and implement custom interactive experiences, including browser-based operating system simulations and terminal-themed retro command line portfolios. These unique designs boost user session duration and build solid viral potential.',
      deliverables: ['Custom CLI engines', 'Multi-Window layout managers', 'Real-time sync (Socket.io)', 'Tailwind custom layouts'],
    },
    {
      icon: Search,
      title: 'Search Engine Optimization (SEO)',
      tagline: 'Increased Visibility & Rank',
      description:
        'I apply high-impact technical SEO to websites. By configuring semantic layouts, setting canonical tags, generating sitemaps/robots files, building structured JSON-LD schemes, and improving page metadata, I help your brand rank higher.',
      deliverables: ['Sitemap & Robots setups', 'Structured JSON-LD schemas', 'Canonical URL setup', 'Meta tags configuration'],
    },
    {
      icon: Gauge,
      title: 'Performance Optimization & Audits',
      tagline: 'Core Web Vitals Boost',
      description:
        'I audit and fix performance bottlenecks on slow-loading websites. By optimizing font rendering, lazy-loading non-critical assets, and reducing layout shifts (CLS), I guarantee a higher PageSpeed score and a smoother user experience.',
      deliverables: ['Lighthouse performance optimization', 'Lazy loading asset setup', 'Image optimization configuration', 'CLS & FID bug-fixes'],
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
      <Header />

      {/* Hero section */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/10 blur-[130px]" />
          <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-[0.2em] mb-6 group cursor-pointer"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Detailed Services
          </h1>
          <div className="mx-auto h-[3px] w-24 rounded-full bg-orange-500 mb-6" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            I build bespoke frontend experiences and full-stack solutions. Explore the specifics of my design and programming services.
          </p>
        </div>
      </section>

      {/* Services List Detail grid */}
      <section className="py-12 px-6 sm:px-12 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white mb-6">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>

                  {/* Title & Tagline */}
                  <h2 className="text-xl font-bold tracking-tight mb-1 text-slate-950 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400 mb-4">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Primary Deliverables
                    </h3>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>Inquire for project</span>
                    <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 text-center px-6 relative z-10">
        <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white/70 p-8 sm:p-12 dark:border-white/5 dark:bg-neutral-900/50 backdrop-blur-sm shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-slate-950 dark:text-white">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Need a professional web layout, design systems integration, performance audit, or search ranking improvements? Contact me to discuss your ideas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
            >
              Start Collaboration
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
