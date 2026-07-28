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

  // Track scroll progress across a generous scroll distance runway for Desktop view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Viscous, ultra-smooth continuous spring physics (zero stop-jumping)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 22,
    damping: 24,
    mass: 1.5,
    restDelta: 0.000001,
  })

  // 2-Point continuous mathematical mapping [0, 1] for Desktop depth transforms
  const contactScale = useTransform(smoothProgress, [0, 1], [1, 0.92])
  const contactOpacity = useTransform(smoothProgress, [0, 1], [1, 0.55])
  const contactRotateX = useTransform(smoothProgress, [0, 1], [0, 4.5])
  const contactBorderRadius = useTransform(smoothProgress, [0, 1], ['0px', '32px'])
  const contactY = useTransform(smoothProgress, [0, 1], [0, -40])

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
         1. Mobile View (block md:hidden): Normal document flow footer
         Just like the classic footer before depth view effect!
      ───────────────────────────────────────────────────────────── */}
      <div className="block md:hidden w-full bg-slate-950 text-white">
        <ContactSection id={contactId} />
        <Footer />
      </div>

      {/* ─────────────────────────────────────────────────────────────
         2. Desktop View (hidden md:block): 3D Depth Layer Parallax
      ───────────────────────────────────────────────────────────── */}
      <div 
        ref={containerRef} 
        className="hidden md:block relative w-full min-h-[180vh] bg-slate-950 text-white"
      >
        {/* ── Sticky Contact Section (Pins on screen, recedes into 3D Z-depth with viscous lerp) ── */}
        <div 
          className="sticky top-0 z-10 w-full min-h-screen flex flex-col justify-start pointer-events-none"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            style={{
              scale: contactScale,
              opacity: contactOpacity,
              rotateX: contactRotateX,
              borderRadius: contactBorderRadius,
              y: contactY,
              transformOrigin: 'top center',
              willChange: 'transform, opacity, border-radius',
            }}
            className="w-full pointer-events-auto transform-gpu overflow-hidden shadow-2xl"
          >
            <ContactSection id={contactId} />
          </motion.div>
        </div>

        {/* ── Compact 80% Viewport Height Footer (Slides UP over Sticky Contact) ── */}
        <div className="relative z-20 w-full bg-slate-950 shadow-[0_-30px_100px_rgba(0,0,0,0.95)]">
          <Footer scrollProgress={smoothProgress} />
        </div>
      </div>
    </>
  )
}
