'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, MapPin, Star, ShieldCheck } from 'lucide-react'
import { Testimonial } from '../data/testimonials'

interface AppleWalletStackProps {
  testimonials: Testimonial[]
}

// Preset color themes for passes (Clean modern gradients)
const CARD_THEMES: Record<string, string> = {
  amber: 'from-[#1c1917] via-[#292524] to-[#451a03] text-amber-200 border-amber-500/30',
  pink: 'from-[#1f132b] via-[#331842] to-[#500738] text-pink-200 border-pink-500/30',
  cyan: 'from-[#0b192c] via-[#1e293b] to-[#0284c7] text-cyan-200 border-cyan-500/30',
  purple: 'from-[#170f2c] via-[#2d1b4e] to-[#6b21a8] text-purple-200 border-purple-500/30',
  rose: 'from-[#1c131a] via-[#3b1225] to-[#881337] text-rose-200 border-rose-500/30',
  slate: 'from-[#0f172a] via-[#1e293b] to-[#334155] text-slate-200 border-slate-400/30',
  emerald: 'from-[#062c22] via-[#064e3b] to-[#047857] text-emerald-200 border-emerald-500/30',
}

// Multi-directional scatter vectors for fanned-out deck positions (Desktop only)
const FAN_OFFSETS = [
  { x: 0, y: 0, rotate: 0, scale: 1 }, // Center Top Active
  { x: -160, y: 35, rotate: -12, scale: 0.96 }, // Left Fan
  { x: 170, y: 45, rotate: 10, scale: 0.96 }, // Right Fan
  { x: -260, y: 100, rotate: -20, scale: 0.92 }, // Far Left Fan
  { x: 270, y: 110, rotate: 18, scale: 0.92 }, // Far Right Fan
  { x: -110, y: 160, rotate: -7, scale: 0.9 }, // Lower Left Fan
  { x: 120, y: 175, rotate: 8, scale: 0.9 }, // Lower Right Fan
]

export default function AppleWalletStack({ testimonials }: AppleWalletStackProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFanned, setIsFanned] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activeCardRef = useRef<HTMLDivElement>(null)

  // Screen size check for mobile stacked view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 3D Motion values for Active Top Card Pointer Tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 260, damping: 22 })
  const mouseY = useSpring(y, { stiffness: 260, damping: 22 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12])
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !activeCardRef.current) return
    const rect = activeCardRef.current.getBoundingClientRect()
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    x.set(mouseXPos / rect.width - 0.5)
    y.set(mouseYPos / rect.height - 0.5)
  }

  const handleCardMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHoveredIndex(null)
  }

  const handleContainerMouseEnter = () => {
    if (!isMobile) setIsFanned(true)
  }

  const handleContainerMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHoveredIndex(null)
    if (!isMobile) setIsFanned(false)
  }

  // Calculate stack index relative to active card
  const orderedTestimonials = testimonials.map((item, originalIdx) => {
    const position =
      (originalIdx - activeIndex + testimonials.length) % testimonials.length
    return { ...item, originalIdx, position }
  })

  // On mobile, never disperse to avoid off-screen clipping; keep stacked deck
  const activeFanned = !isMobile && isFanned

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* ==================== CARD DECK CONTAINER ==================== */}
      <div
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
        className={`relative w-full flex justify-center items-start transition-all duration-500 ${
          activeFanned
            ? 'h-[720px] sm:h-[680px]'
            : 'h-[520px] sm:h-[480px]'
        }`}
      >
        {orderedTestimonials.map((t) => {
          const themeClass =
            CARD_THEMES[t.categoryColor || 'amber'] || CARD_THEMES.amber
          const pos = t.position // 0 = active front card
          const isTop = pos === 0
          const isHovered = hoveredIndex === t.originalIdx

          // Multi-directional scatter offset when fanned (desktop only)
          const fanOffset = FAN_OFFSETS[pos % FAN_OFFSETS.length]

          // Stacked position offsets (Optimized for mobile peeking visibility & clickability)
          const stackedY = pos * (isMobile ? 48 : 45)
          const stackedScale = Math.max(0.82, 1 - pos * (isMobile ? 0.025 : 0.035))
          const stackedRotate = (pos % 2 === 0 ? 1 : -1) * (pos * (isMobile ? 1.5 : 3))
          const zIndex = testimonials.length - pos

          const targetX = activeFanned ? fanOffset.x : 0
          const targetY = activeFanned ? fanOffset.y : stackedY + (isHovered && !isTop ? -12 : 0)
          const targetRotate = activeFanned ? fanOffset.rotate : stackedRotate
          const targetScale = activeFanned ? fanOffset.scale : stackedScale

          return (
            <motion.div
              key={t.id}
              layout
              ref={isTop ? activeCardRef : undefined}
              onMouseMove={isTop ? handleMouseMove : undefined}
              onMouseEnter={() => setHoveredIndex(t.originalIdx)}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setActiveIndex(t.originalIdx)}
              initial={false}
              animate={{
                x: targetX,
                y: targetY,
                rotate: targetRotate,
                scale: targetScale,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 25,
              }}
              style={
                isTop && !isMobile
                  ? {
                      rotateX,
                      rotateY,
                      transformStyle: 'preserve-3d',
                    }
                  : undefined
              }
              className={`absolute w-[94%] sm:w-[460px] rounded-3xl p-5 sm:p-7 overflow-hidden cursor-pointer bg-gradient-to-br ${themeClass} border shadow-2xl transition-shadow duration-300 group select-none ${
                isTop ? 'shadow-orange-500/30 ring-1 ring-white/30' : 'hover:brightness-110'
              }`}
            >
              {/* Brushed Metallic Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Dynamic Specular Reflection Gloss Layer for Active Card */}
              {isTop && !isMobile && (
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.12) 45%, transparent 70%)`,
                  }}
                />
              )}

              {/* FULL TESTIMONIAL QUOTE & 5-STAR RATING */}
              <div className="relative z-10 my-1">
                <div className="bg-black/30 p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-inner">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-mono font-bold text-white ml-1">5.0 ★</span>
                  </div>

                  {/* Quote text */}
                  <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed font-normal">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              </div>

              {/* CLIENT FOOTER */}
              <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white/60 shrink-0 shadow-md">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-base tracking-tight text-white flex items-center gap-1">
                      <span className="truncate max-w-[130px] sm:max-w-none">{t.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 font-mono truncate max-w-[140px] sm:max-w-none">
                      {t.role || 'Client'} • {t.location}
                    </p>
                  </div>
                </div>

                <a
                  href={t.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-xs shrink-0"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
