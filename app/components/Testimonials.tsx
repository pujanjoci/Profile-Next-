'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import AppleWalletStack from './AppleWalletStack'

export interface TestimonialsProps {
  id?: string
}

export default function Testimonials({ id = 'testimonials' }: TestimonialsProps) {
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-slate-50/70 py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-200/80 dark:border-white/5"
    >
      {/* Decorative ambient background mesh & glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-purple-500/10 blur-3xl opacity-60 dark:opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[600px] h-[350px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-orange-600/5 to-pink-500/10 blur-3xl opacity-50 dark:opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl tracking-tight">
            Client Testimonials
          </h2>

          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            Hover or click on the card deck to disperse and inspect reviews from clients, corporate partners, and web projects.
          </p>
        </motion.div>

        {/* Multi-directional Card Stack Component */}
        <AppleWalletStack testimonials={testimonials} />
      </div>
    </section>
  )
}
