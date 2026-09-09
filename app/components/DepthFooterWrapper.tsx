'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ContactSection from './ContactSection'
import Footer from './Footer'

interface DepthFooterWrapperProps {
  contactId?: string
}

export default function DepthFooterWrapper({ contactId = 'contact' }: DepthFooterWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress as the user reaches the bottom transition zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  // Smooth continuous spring physics for footer reveal
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 25,
    restDelta: 0.001,
  })

  // Subtle 3D depth scaling and opacity fade when scrolling into the footer
  const contactScale = useTransform(smoothProgress, [0.6, 1], [1, 0.96])
  const contactOpacity = useTransform(smoothProgress, [0.6, 1], [1, 0.85])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-slate-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* ── Contact Section (Always fully rendered and visible without viewport cutoff) ── */}
      <motion.div
        style={{
          scale: contactScale,
          opacity: contactOpacity,
          transformOrigin: 'top center',
        }}
        className="w-full relative z-10"
      >
        <ContactSection id={contactId} />
      </motion.div>

      {/* ── Footer: Slides UP smoothly with rich top shadow and parallax ── */}
      <div className="relative z-20 w-full bg-slate-950 shadow-[0_-30px_100px_rgba(0,0,0,0.95)]">
        <Footer scrollProgress={smoothProgress} />
      </div>
    </div>
  )
}
