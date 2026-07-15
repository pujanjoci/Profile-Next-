'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Quote, FileText } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

export default function Hero() {
  // Typing effect state
  const roles = useMemo(() => ['Web Designer', 'Web Developer', 'Graphic Designer', 'Gamer'], [])
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex]
      const isTyping = !isDeleting

      if (isTyping) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
          setTypingSpeed(150) // normal typing speed
        } else {
          // Finished typing, pause then start deleting
          setTypingSpeed(2000) // pause before deleting
          setIsDeleting(true)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1))
          setTypingSpeed(100) // faster deletion
        } else {
          // Deleted completely, move to next role
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          setTypingSpeed(500) // pause before typing next role
        }
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, roles, typingSpeed])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950 flex flex-col items-center justify-start md:block pt-[15vh] md:pt-0">
      
      {/* Text Content - Mobile: top padding, Desktop: absolute */}
      <div className="relative z-30 w-full px-4 text-center md:absolute md:left-0 md:right-0 md:top-[22%] md:block pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 pointer-events-auto"
        >
          <span className="inline-block px-6 py-2 rounded-full border border-gray-900/10 dark:border-white/20 text-sm font-medium bg-white/50 backdrop-blur-sm dark:bg-white/5 shadow-sm">
            Hello!
          </span>
        </motion.div>

        {/* Semantic H1 for SEO */}
        <h1 className="sr-only">Pujan Joshi — Web Designer & Developer</h1>

        <motion.div
          className="text-center tracking-tight text-neutral-900 dark:text-neutral-50 drop-shadow-sm md:drop-shadow-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="block text-6xl sm:text-7xl md:text-7xl lg:text-8xl mb-2 font-bold">
            I&apos;m <span className="text-orange-500">Pujan</span>,
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-800 dark:text-neutral-200 bangers-regular">
            {displayText}
            <span className="animate-pulse">|</span> {/* Blinking cursor */}
          </span>
        </motion.div>

        {/* SEO-friendly intro paragraph */}
        <p className="sr-only">
          I’m Pujan Joshi, a web designer and developer from Nepal. I create responsive websites, portfolio sites, e-commerce interfaces, and modern web applications using Next.js, React, Tailwind CSS, and JavaScript.
        </p>
      </div>

      {/* Image Container - always at bottom (unchanged) */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full overflow-visible pointer-events-none">
        <div className="relative w-full flex justify-center items-end 
                        h-[80vh] md:h-[65vh] lg:h-[75vh] 
                        max-h-[900px]">
                        
          {/* Background Shape */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 aspect-square rounded-full bg-orange-100/80 dark:bg-orange-900/20 translate-y-1/3 blur-xl md:blur-0
                          w-[180%] md:w-[900px]" />

          {/* Profile Image & Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-40 flex items-end justify-center w-full h-full pointer-events-auto pb-0"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] h-[75%] sm:h-[80%] md:h-[85%] lg:h-[90%] max-w-[650px] w-auto flex-shrink-0">
              <Image
                src="/Pujan(Profile)-hero.webp"
                alt="Pujan Profile"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 650px"
                quality={75}
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />

              {/* Floating Testimonial - near the image */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute z-40
                           -left-2 top-[10%] w-40
                           sm:-left-4 sm:top-[12%] sm:w-48 hidden md:block
                           md:-left-24 md:top-[15%] md:w-56 md:mt-[40%]
                           lg:-left-32 lg:top-[18%] lg:w-64"
              >
                <div className="bg-white/30 dark:bg-neutral-900/30 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 dark:border-white/5 transform -rotate-2">
                  <Quote className="text-orange-500 mb-1.5 sm:mb-2 md:mb-3 fill-orange-500" size={18} />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    This is my Personal Portfolio.
                  </p>
                </div>
                {/* Dashed arrow - hidden on mobile */}
                <svg
                  className="absolute -right-10 md:-right-16 top-1/2 text-orange-400 w-10 md:w-16 h-10 md:h-16 hidden sm:block"
                  viewBox="0 0 50 50"
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

              {/* Floating Buttons - smaller on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-auto p-1 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-full shadow-lg flex items-center justify-center gap-1 overflow-hidden"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors gap-2 text-sm whitespace-nowrap shadow-md shadow-orange-500/20 glimmer-btn"
                >
                  Portfolio
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-neutral-800 dark:text-neutral-200 hover:bg-white/20 dark:hover:bg-white/10 rounded-full font-medium transition-colors text-sm whitespace-nowrap gap-1.5"
                >
                  <FileText size={16} className="text-orange-500 dark:text-orange-400" />
                  Resume
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-neutral-800 dark:text-neutral-200 hover:bg-white/20 dark:hover:bg-white/10 rounded-full font-medium transition-colors text-sm whitespace-nowrap"
                >
                  Hire me
                </Link>

                
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
