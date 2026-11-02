'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Quote,
} from 'lucide-react'
import { testimonials } from '../data/testimonials'
import {
  EditorialReveal,
  EditorialSectionHeader,
} from './editorial/EditorialMotion'

export interface TestimonialsProps {
  id?: string
}

export default function Testimonials({
  id = 'testimonials',
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const current = testimonials[activeIndex] || testimonials[0]

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      id={id}
      className="editorial-surface relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="07"
          label="Client Endorsements"
          title="Words from partners &"
          accentWord="collaborators."
          subtitle="Verified feedback from corporate partners, consulting firms, and individual clients across Nepal and international engagements."
          rightContent={
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--ed-muted)] mr-2">
                <strong className="text-[var(--ed-text)]">
                  {String(activeIndex + 1).padStart(2, '0')}
                </strong>{' '}
                / {String(testimonials.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          }
        />

        {/* Asymmetric 12-Column Editorial Quotation + Client Ledger */}
        <EditorialReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-[var(--ed-border)] bg-[var(--ed-bg)]">
            {/* Left Column (7 Cols): Featured Editorial Quotation Stage */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--ed-border)] min-h-[380px]">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] mb-8">
                <span>
                  ENDORSEMENT NO. {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <Quote size={20} className="text-orange-500" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="my-auto space-y-8"
                >
                  <blockquote className="font-serif-accent italic text-2xl sm:text-3xl md:text-[34px] text-[var(--ed-text)] leading-[1.35] tracking-[-0.01em]">
                    &ldquo;{current.text}&rdquo;
                  </blockquote>

                  {/* Client Metadata & Live Project Link */}
                  <div className="pt-6 border-t border-[var(--ed-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] shrink-0">
                        <Image
                          src={current.image}
                          alt={current.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-[var(--ed-text)]">
                          {current.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--ed-muted)] mt-0.5">
                          <span className="text-orange-500 font-semibold">
                            {current.role || 'Client'}
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={11} />
                            {current.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {current.portfolioUrl && (
                      <a
                        href={current.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--ed-border-strong)] text-xs font-mono uppercase tracking-[0.16em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors self-start sm:self-auto"
                      >
                        <span>Inspect Live Project</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column (5 Cols): Interactive Client Directory Ledger */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--ed-surface)]/50">
              <div className="px-6 py-4 border-b border-[var(--ed-border)] text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)] flex items-center justify-between">
                <span>Client Index ({testimonials.length})</span>
                <span>Select to Read</span>
              </div>

              <div className="divide-y divide-[var(--ed-border)]">
                {testimonials.map((item, idx) => {
                  const isSelected = idx === activeIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--ed-bg)] border-l-2 border-l-orange-500'
                          : 'hover:bg-[var(--ed-bg)]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={`text-xs font-mono ${
                            isSelected
                              ? 'text-orange-500 font-bold'
                              : 'text-[var(--ed-subtle)]'
                          }`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="relative h-9 w-9 overflow-hidden border border-[var(--ed-border)] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`font-display text-sm font-bold truncate ${
                              isSelected
                                ? 'text-orange-500'
                                : 'text-[var(--ed-text)]'
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="text-[11px] font-mono text-[var(--ed-muted)] truncate">
                            {item.role} · {item.location}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        className={`shrink-0 transition-transform ${
                          isSelected
                            ? 'text-orange-500 translate-x-0.5'
                            : 'text-[var(--ed-subtle)]'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </EditorialReveal>
      </div>
    </section>
  )
}
