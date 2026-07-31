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

  // Track scroll progress across the exact depth parallax scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Viscous, ultra-smooth continuous spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 26,
    mass: 1.2,
    restDelta: 0.000001,
  })

  // 2-Point continuous mathematical mapping across [0, 1] scroll range
  const contactScale = useTransform(smoothProgress, [0, 1], [1, 0.93])
  const contactOpacity = useTransform(smoothProgress, [0, 1], [1, 0.5])
  const contactRotateX = useTransform(smoothProgress, [0, 1], [0, 3])
  const contactY = useTransform(smoothProgress, [0, 1], [0, -35])

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
         1. Mobile View (block md:hidden): Standard document flow
      ───────────────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full bg-slate-50 dark:bg-neutral-950">
        <ContactSection id={`${contactId}-mobile`} />
        <Footer />
      </div>

      {/* ─────────────────────────────────────────────────────────────
         2. Desktop View (hidden md:block): 3D Depth Layer Parallax
      ───────────────────────────────────────────────────────────── */}
      <div 
        ref={containerRef} 
        className="hidden md:block relative w-full min-h-[175vh] bg-slate-50 dark:bg-neutral-950 transition-colors duration-300"
      >
        {/* ── Sticky Contact Section ── */}
        <div 
          className="sticky top-0 z-10 w-full h-screen flex flex-col justify-start pointer-events-none overflow-hidden"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            style={{
              scale: contactScale,
              opacity: contactOpacity,
              rotateX: contactRotateX,
              y: contactY,
              transformOrigin: 'top center',
              willChange: 'transform, opacity',
            }}
            className="w-full h-full pointer-events-auto transform-gpu overflow-hidden"
          >
            <ContactSection id={contactId} />
          </motion.div>
        </div>

        {/* ── Footer (Slides UP over Sticky Contact to fill the bottom) ── */}
        <div className="relative z-20 w-full bg-slate-950 shadow-[0_-30px_100px_rgba(0,0,0,0.95)]">
          <Footer scrollProgress={smoothProgress} />
        </div>
      </div>
    </>
  )
}
