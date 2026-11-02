'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Quote, FileText } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

export default function Hero() {
  // Typing effect state with pre-rendered initial value for instantaneous SSR paint
  const roles = useMemo(() => ['Web Designer', 'Web Developer', 'Graphic Designer', 'Gamer'], [])
  const [displayText, setDisplayText] = useState('Web Designer')
  const [isDeleting, setIsDeleting] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(2000)

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex]
      const isTyping = !isDeleting

      if (isTyping) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
          setTypingSpeed(150)
        } else {
          setTypingSpeed(2000)
          setIsDeleting(true)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1))
          setTypingSpeed(100)
        } else {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(500)
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, roles, typingSpeed])

  return (
    <section className="relative h-[100dvh] min-h-[560px] max-h-[1200px] w-full overflow-hidden bg-white dark:bg-neutral-950 font-sans flex flex-col justify-end items-center pt-20 sm:pt-24 md:pt-0 md:block">

      {/* Text Content - Responsive scaling for low-res & smaller screens */}
      <div className="relative z-30 w-full px-4 text-center mt-auto mb-9 xs:mb-10 sm:mb-11 md:mt-0 md:mb-0 md:absolute md:left-0 md:right-0 md:top-[10%] lg:top-[14%] xl:top-[16%] 2xl:top-[18%] pointer-events-none shrink-0">
        <div className="mb-2 sm:mb-3 lg:mb-4 pointer-events-auto">
          <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-gray-900/10 dark:border-white/20 text-xs sm:text-sm font-medium bg-white/50 backdrop-blur-sm dark:bg-white/5 shadow-sm">
            Hello!
          </span>
        </div>

        <h1 className="text-center tracking-tight text-neutral-900 dark:text-neutral-50 drop-shadow-sm md:drop-shadow-none">
          <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-1">
            I&apos;m <span className="text-orange-500">Pujan</span>,
          </span>
          <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-neutral-800 dark:text-neutral-200 bangers-regular min-h-[1.2em] leading-tight">
            {displayText}
            <span className="animate-pulse inline-block" aria-hidden="true">|</span>
          </span>
        </h1>
      </div>

      {/* Image & Buttons Container */}
      <div className="relative flex-1 max-h-[58dvh] xs:max-h-[60dvh] sm:max-h-[64dvh] md:max-h-none w-full flex items-end justify-center min-h-0 md:absolute md:bottom-0 md:left-0 md:right-0 md:flex md:justify-center overflow-visible pointer-events-none">
        <div className="relative w-full flex justify-center items-end h-full md:h-[65vh] lg:h-[75vh] xl:h-[80vh] max-h-[1020px]">

          {/* Background Shape Accent */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 aspect-square rounded-full bg-orange-200/90 dark:bg-orange-600/20 translate-y-1/4 blur-2xl md:blur-3xl w-[180%] sm:w-[140%] md:w-[800px] lg:w-[1000px] pointer-events-none" />

          {/* Profile Image & Buttons Wrapper */}
          <div className="relative z-40 flex items-end justify-center w-full h-full pointer-events-auto pb-0">
            <div className="relative aspect-[4/5] h-full md:h-[92%] lg:h-[95%] w-[128vw] xs:w-[118vw] sm:w-[540px] md:w-auto max-w-none md:max-w-[580px] lg:max-w-[700px] xl:max-w-[760px] flex-shrink-0">
              <Image
                src="/Pujan(Profile)-hero.webp"
                alt="Pujan Joshi portrait"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 600px, 760px"
                quality={80}
                className="object-contain object-bottom drop-shadow-2xl -translate-y-2.5 md:translate-y-0"
                priority
                fetchPriority="high"
              />

              {/* Mobile Floating Quote - positioned above the portrait with dotted line coming from top of image */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute z-40 md:hidden -top-0.5 sm:-top-2 left-1/2 -translate-x-1/2 w-56 sm:w-64 flex flex-col items-center pointer-events-none"
              >
                <div className="bg-white/30 dark:bg-neutral-900/40 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-xl border border-white/20 dark:border-white/10 transform -rotate-1 w-full">
                  <Quote className="text-orange-500 mb-1 fill-orange-500" size={14} />
                  <p className="text-[11px] xs:text-xs text-gray-700 dark:text-gray-200 leading-snug font-medium">
                    Mom, look I&apos;m on the internet!
                  </p>
                </div>
                {/* Dotted line coming from the top of the image up to the quote card */}
                <svg
                  className="text-orange-400 w-7 h-7 xs:w-8 xs:h-8 -mt-0.5 pointer-events-none"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                >
                  <path
                    d="M20 38 Q 27 19 20 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
              </motion.div>

              {/* Floating Testimonial (Desktop) - positioned beside the mid-torso / jacket matching 2nd image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute z-40
                           hidden md:block
                           md:-left-24 lg:-left-32 xl:-left-40
                           top-[46%] sm:top-[48%] md:top-[50%] lg:top-[52%]
                           w-48 sm:w-52 md:w-56 lg:w-64"
              >
                <div className="bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-white/5 transform -rotate-2">
                  <Quote className="text-orange-500 mb-1.5 sm:mb-2 md:mb-3 fill-orange-500" size={18} />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    Mom, look I&apos;m on the internet!
                  </p>
                </div>
                {/* Dashed arrow pointing smoothly to the jacket */}
                <svg
                  className="absolute -right-8 sm:-right-10 md:-right-14 top-1/2 -translate-y-1/2 text-orange-400 w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 hidden sm:block pointer-events-none"
                  viewBox="0 0 50 50"
                  aria-hidden="true"
                >
                  <path
                    d="M0 25 Q 25 25 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
              </motion.div>

              {/* Floating Action Buttons */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-auto max-w-[95vw] p-1 bg-white/25 dark:bg-black/50 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-full shadow-lg flex items-center justify-center gap-1 overflow-hidden z-50">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors gap-1 sm:gap-1.5 text-xs sm:text-sm whitespace-nowrap shadow-md shadow-orange-500/20 glimmer-btn"
                >
                  Portfolio
                  <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2.5 text-neutral-800 dark:text-neutral-200 hover:bg-white/20 dark:hover:bg-white/10 rounded-full font-medium transition-colors text-xs sm:text-sm whitespace-nowrap gap-1 sm:gap-1.5"
                >
                  <FileText size={14} className="text-orange-500 dark:text-orange-400 sm:w-4 sm:h-4" />
                  Resume
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2.5 text-neutral-800 dark:text-neutral-200 hover:bg-white/20 dark:hover:bg-white/10 rounded-full font-medium transition-colors text-xs sm:text-sm whitespace-nowrap"
                >
                  Hire me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
