'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, MapPin, Star, RotateCw, Sparkles } from 'lucide-react'
import { Testimonial } from '../data/testimonials'

interface AppleCardTestimonialProps {
  testimonial: Testimonial
  index?: number
}

// Preset dynamic category mesh gradients (Pastel Apple Card spending category palettes)
const MESH_GRADIENTS: Record<string, string> = {
  amber:
    'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.25), transparent 50%), radial-gradient(circle at 50% 50%, rgba(253, 230, 138, 0.2), transparent 60%)',
  pink:
    'radial-gradient(circle at 30% 20%, rgba(244, 114, 182, 0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.25), transparent 50%), radial-gradient(circle at 50% 90%, rgba(251, 207, 232, 0.25), transparent 60%)',
  cyan:
    'radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.35), transparent 50%), radial-gradient(circle at 75% 85%, rgba(14, 165, 233, 0.25), transparent 50%), radial-gradient(circle at 60% 20%, rgba(186, 230, 253, 0.25), transparent 60%)',
  purple:
    'radial-gradient(circle at 25% 25%, rgba(192, 132, 252, 0.35), transparent 50%), radial-gradient(circle at 85% 75%, rgba(168, 85, 247, 0.25), transparent 50%), radial-gradient(circle at 50% 30%, rgba(233, 213, 255, 0.25), transparent 60%)',
  rose:
    'radial-gradient(circle at 20% 30%, rgba(251, 113, 133, 0.35), transparent 50%), radial-gradient(circle at 80% 70%, rgba(225, 29, 72, 0.25), transparent 50%), radial-gradient(circle at 40% 80%, rgba(254, 205, 211, 0.25), transparent 60%)',
  slate:
    'radial-gradient(circle at 30% 20%, rgba(148, 163, 184, 0.35), transparent 50%), radial-gradient(circle at 70% 80%, rgba(71, 85, 105, 0.25), transparent 50%), radial-gradient(circle at 50% 50%, rgba(226, 232, 240, 0.25), transparent 60%)',
  emerald:
    'radial-gradient(circle at 20% 20%, rgba(52, 211, 153, 0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.25), transparent 50%), radial-gradient(circle at 50% 70%, rgba(167, 243, 208, 0.25), transparent 60%)',
}

export default function AppleCardTestimonial({ testimonial, index = 0 }: AppleCardTestimonialProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Framer Motion 3D tilt mouse tracking
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for rotation & glossy shine coordinates
  const mouseX = useSpring(x, { stiffness: 250, damping: 22 })
  const mouseY = useSpring(y, { stiffness: 250, damping: 22 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [14, -14])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-14, 14])

  // Specular sheen light sweep translation
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  // Dynamic box shadow depth based on tilt pitch/roll
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-15, 15])
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [15, 30])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top

    // Normalize from -0.5 to 0.5
    const normalizedX = mouseXPos / width - 0.5
    const normalizedY = mouseYPos / height - 0.5

    x.set(normalizedX)
    y.set(normalizedY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const meshGradient = MESH_GRADIENTS[testimonial.categoryColor || 'amber'] || MESH_GRADIENTS.amber

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 w-full py-4 flex justify-center"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[420px] aspect-[1.586/1] cursor-pointer group rounded-2xl select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Motion Container with 3D Flip */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full rounded-2xl shadow-2xl transition-shadow duration-300"
        >
          {/* ==================== FRONT SIDE OF APPLE CARD ==================== */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden border border-slate-300/60 dark:border-white/20 bg-gradient-to-br from-[#F6F6F8] via-[#EAEAEF] to-[#D8D8DF] dark:from-[#1C1C1E] dark:via-[#252528] dark:to-[#121214] text-slate-900 dark:text-white shadow-lg"
          >
            {/* Base Metallic Texture & Dynamic Pastel Mesh Gradient */}
            <div
              className="absolute inset-0 pointer-events-none opacity-80 dark:opacity-60 mix-blend-multiply dark:mix-blend-soft-light transition-opacity duration-300"
              style={{ background: meshGradient }}
            />

            {/* Brushed Titanium Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Dynamic Specular Sheen Gloss Layer following pointer */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
              }}
            />

            {/* TOP BAR: Logo & Contactless Payment Icon */}
            <div className="relative z-10 flex items-center justify-between">
              {/* Apple Card Style Minimal Logo */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 fill-slate-900 dark:fill-white opacity-90 drop-shadow-xs"
                  viewBox="0 0 170 170"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.06-3.18-2.62-7.07-7.23-11.68-13.84-6.3-9.02-11.33-18.77-15.09-29.25-3.76-10.49-5.64-20.73-5.64-30.73 0-14.07 3.59-25.75 10.77-35.03 7.18-9.28 16.29-14.02 27.33-14.23 4.23 0 9.07 1.13 14.52 3.38 5.45 2.26 9.3 3.39 11.55 3.39 2.03 0 5.96-1.13 11.78-3.39 5.83-2.25 10.37-3.33 13.62-3.23 10.14.47 18.66 4.31 25.56 11.52-9.3 5.61-13.84 13.43-13.62 23.46.21 7.74 3.07 14.27 8.58 19.59 5.51 5.32 12.22 8.35 20.13 9.09-2.22 6.72-4.99 13.15-8.31 19.29zM119.22 31.95c0-6.72 2.39-13.06 7.17-19.03 4.78-5.96 10.82-9.61 18.12-10.94.63 7.18-1.74 13.78-7.11 19.79-5.37 6.02-11.55 9.53-18.54 10.53-.13-.13-.33-.23-.64-.35z" />
                </svg>
                <span className="font-semibold text-xs tracking-widest uppercase opacity-80 font-mono">
                  {testimonial.company ? 'Corporate Card' : 'Client Card'}
                </span>
              </div>

              {/* EMV Chip & NFC Contactless graphic */}
              <div className="flex items-center gap-3">
                {/* Contactless Icon */}
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 14.5A4.5 4.5 0 0 0 8.5 9.5" />
                  <path d="M12 17a8 8 0 0 0 0-10" />
                  <path d="M15.5 19.5a11.5 11.5 0 0 0 0-15" />
                </svg>

                {/* Metallic Gold EMV Chip Graphic */}
                <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-[1.5px] shadow-sm relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 rounded-[4px] relative flex flex-col justify-between p-1">
                    <div className="w-full h-[1px] bg-amber-700/50" />
                    <div className="w-full h-[1px] bg-amber-700/50" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-700/50 -translate-y-1/2" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-700/50 -translate-x-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE CONTENT: Testimonial Snippet & Client Avatar */}
            <div className="relative z-10 my-auto pt-2 pb-1 flex items-center gap-3.5">
              {/* Profile Image / Project Thumbnail */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/80 dark:border-white/30 shadow-md">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="overflow-hidden">
                <p className="text-xs sm:text-sm font-medium line-clamp-2 italic text-slate-800 dark:text-slate-100 leading-snug">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mt-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM BAR: Cardholder Name & Flip Hint */}
            <div className="relative z-10 flex items-end justify-between pt-1 border-t border-slate-400/20 dark:border-white/10">
              <div>
                <p className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-900 dark:text-white drop-shadow-xs">
                  {testimonial.name}
                </p>
                <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                  {testimonial.role || 'Verified Client'}
                </p>
              </div>

              {/* Interactive Flip Badge */}
              <div className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-white/60 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-500/30 group-hover:scale-105 transition-transform">
                <RotateCw className="w-3 h-3 animate-spin-slow" />
                <span>Flip</span>
              </div>
            </div>
          </div>

          {/* ==================== BACK SIDE OF APPLE CARD ==================== */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden border border-slate-300/60 dark:border-white/20 bg-gradient-to-br from-[#EAEAEF] via-[#DFDFE5] to-[#D0D0D8] dark:from-[#141416] dark:via-[#1D1D20] dark:to-[#0F0F11] text-slate-900 dark:text-white shadow-lg"
          >
            {/* Brushed Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top Dark Magnetic Stripe */}
            <div className="absolute top-4 left-0 right-0 h-9 bg-neutral-900 dark:bg-black shadow-inner" />

            {/* Holographic Signature & CVV Bar */}
            <div className="relative z-10 mt-10 flex items-center gap-3">
              {/* Multi-color Holographic Shimmer Bar */}
              <div className="h-7 flex-1 rounded bg-gradient-to-r from-pink-400 via-purple-400 via-indigo-400 via-teal-300 to-amber-300 opacity-90 p-1 flex items-center justify-between overflow-hidden shadow-inner">
                <span className="font-mono text-[9px] text-slate-900 font-bold tracking-widest opacity-60">
                  SECURITY SIGNATURE VERIFIED
                </span>
              </div>
              {/* CVV / Rating Badge */}
              <div className="h-7 px-2.5 rounded bg-white dark:bg-neutral-800 border border-slate-300 dark:border-white/20 flex items-center justify-center font-mono text-xs font-bold text-slate-900 dark:text-white shadow-xs">
                5.0 ★
              </div>
            </div>

            {/* Full Testimonial Body */}
            <div className="relative z-10 my-auto py-1">
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>

            {/* Back Footer: Location & External CTA */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-400/20 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate max-w-[140px]">{testimonial.location}</span>
              </div>

              {/* Visit Link */}
              <a
                href={testimonial.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
              >
                <span>Visit Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
