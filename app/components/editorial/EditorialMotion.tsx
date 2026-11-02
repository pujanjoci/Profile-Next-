'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   A. Clip-Path / Mask Text Reveal for Selected Headings
───────────────────────────────────────────────────────────── */
export function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3'
}) {
  const MotionTag = motion[Tag]

  return (
    <span className="block overflow-hidden pb-1 -mb-1">
      <MotionTag
        initial={{ y: '102%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={className}
      >
        {children}
      </MotionTag>
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   B. Subtle Section / Element Reveal
───────────────────────────────────────────────────────────── */
export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  y = 18,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   C. Subtle Magnetic Wrapper (Desktop Only, Disabled on Touch)
───────────────────────────────────────────────────────────── */
export function MagneticWrapper({
  children,
  className = '',
  strength = 0.22,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    // Clamp movement to a subtle range (-8px to 8px)
    setPosition({
      x: Math.max(-8, Math.min(8, deltaX)),
      y: Math.max(-8, Math.min(8, deltaY)),
    })
  }

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   D. Reusable Editorial Section Index Header
───────────────────────────────────────────────────────────── */
export function EditorialSectionHeader({
  index,
  label,
  title,
  accentWord,
  subtitle,
  headingLevel = 'h2',
  rightContent,
}: {
  index: string
  label: string
  title: string
  accentWord?: string
  subtitle?: string
  headingLevel?: 'h1' | 'h2'
  rightContent?: React.ReactNode
}) {
  const HeadingTag = headingLevel

  return (
    <div className="mb-12 md:mb-16 border-b border-[var(--ed-border)] pb-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <EditorialReveal y={10}>
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-[var(--ed-muted)]">
              <span className="text-orange-500 font-semibold">{index}</span>
              <span className="h-px w-6 bg-[var(--ed-border-strong)]" aria-hidden="true" />
              <span>{label}</span>
            </div>
          </EditorialReveal>

          <HeadingTag className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-[var(--ed-text)] leading-[1.08]">
            <RevealText as="span">
              {title}{' '}
              {accentWord && (
                <span className="font-serif-accent italic font-normal text-orange-500">
                  {accentWord}
                </span>
              )}
            </RevealText>
          </HeadingTag>

          {subtitle && (
            <EditorialReveal delay={0.1}>
              <p className="text-base sm:text-lg text-[var(--ed-muted)] leading-relaxed max-w-2xl font-normal">
                {subtitle}
              </p>
            </EditorialReveal>
          )}
        </div>

        {rightContent && (
          <EditorialReveal delay={0.15} className="shrink-0">
            {rightContent}
          </EditorialReveal>
        )}
      </div>
    </div>
  )
}
