'use client'

import { motion } from 'framer-motion'
import { Layout, Code2, ShoppingBag, Terminal, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export interface ServicesProps {
  id?: string
}

export default function ServicesSection({ id = 'services' }: ServicesProps) {
  const services = [
    {
      icon: Layout,
      title: 'UI/UX & Web Design',
      description:
        'Crafting premium user interfaces, high-fidelity mockups, and interactive design systems in Figma. Focus on micro-animations, typography, and intuitive visual hierarchies.',
      color: 'from-orange-500 to-amber-400',
      glow: 'rgba(249, 115, 22, 0.15)',
    },
    {
      icon: Code2,
      title: 'Custom Web Development',
      description:
        'Building lightning-fast, production-ready web applications using React, Next.js (App Router), TypeScript, and Tailwind CSS with clean, modular, and semantic code structure.',
      color: 'from-blue-600 to-cyan-400',
      glow: 'rgba(59, 130, 246, 0.15)',
    },
    {
      icon: ShoppingBag,
      title: 'E-Commerce Solutions',
      description:
        'Developing high-performance, secure online storefronts featuring dynamic carts, Stripe payment gateway integrations, catalog filters, and customized management panels.',
      color: 'from-purple-600 to-pink-500',
      glow: 'rgba(168, 85, 247, 0.15)',
    },
    {
      icon: Terminal,
      title: 'Interactive Experiences',
      description:
        'Designing bespoke web simulations and creative concepts (such as Windows OS simulators and retro command-line portfolios) that captivate visitors and rank higher.',
      color: 'from-emerald-500 to-teal-400',
      glow: 'rgba(16, 185, 129, 0.15)',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-100 dark:border-white/5"
    >
      {/* Decorative premium background light effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-gradient-to-t from-orange-500/5 to-transparent blur-3xl opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-500">
            What I Offer
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl tracking-tight">
            Professional Services
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            I deliver high-fidelity digital interfaces and optimized fullstack web systems that combine creative design aesthetics with modern frontend technologies.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-neutral-900 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Glow Background effect */}
                <div
                  className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: service.glow }}
                />

                <div className="space-y-4">
                  {/* Icon Block */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white transition-colors duration-350">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.title}
                    </span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-orange-500 transition-colors duration-200">
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Banners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Looking for custom feature design, performance tuning, or search ranking boost?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
            >
              Get in touch
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full font-semibold text-slate-800 dark:text-slate-300 transition-colors text-sm cursor-pointer"
            >
              View detailed services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
