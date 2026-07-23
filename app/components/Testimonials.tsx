'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, ExternalLink, MapPin, Star, Sparkles } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export interface TestimonialsProps {
  id?: string
}

export default function Testimonials({ id = 'testimonials' }: TestimonialsProps) {
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
      className="relative w-full overflow-hidden bg-slate-50/50 py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-200/60 dark:border-white/5"
    >
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent blur-3xl opacity-60 dark:opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[500px] h-[300px] rounded-full bg-gradient-to-bl from-orange-600/10 via-amber-400/5 to-transparent blur-3xl opacity-50 dark:opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-500">
            <Sparkles className="w-3.5 h-3.5" /> Client Feedback
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl tracking-tight">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            See what clients and collaborators have to say about working with me on their personal portfolios, domain setup, and web applications.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-orange-500/40 dark:hover:bg-white/[0.05]"
            >
              {/* Decorative Quote Icon Background */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-200/60 dark:text-white/5 transition-colors group-hover:text-orange-500/20 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="relative z-10 mb-8 text-slate-700 dark:text-slate-300 text-base leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Client Profile Footer */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {/* Avatar image wrapped in clickable portfolio link */}
                  <a
                    href={testimonial.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group/avatar shrink-0 focus:outline-none"
                    title={`Visit ${testimonial.name}'s Portfolio`}
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/30 group-hover/avatar:border-orange-500 transition-colors shadow-md">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                      />
                    </div>
                  </a>

                  <div>
                    <a
                      href={testimonial.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-slate-900 dark:text-white text-lg hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5 group/name"
                    >
                      {testimonial.name}
                    </a>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                {/* Visit Portfolio CTA */}
                <a
                  href={testimonial.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-xs"
                >
                  <span>Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
