'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github
} from 'lucide-react'
import Link from 'next/link'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

export default function Projects({ id = 'projects' }: { id?: string }) {
  const categories = ['All', 'Web Apps', 'Games', 'UI/UX', 'Designs'] as const
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const selectedProject = filteredProjects[activeIndex] || filteredProjects[0] || projects[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[activeIndex]) {
      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeIndex])

  // Drag handlers for swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      handleNext()
    } else if (info.offset.x > swipeThreshold) {
      handlePrev()
    }
  }

  // Resolve project case study slug
  const getProjectSlug = (project: Project) => {
    let slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (project.title === 'Modern E-Commerce') slug = 'ecommerce-website'
    if (project.title === 'Personal Portfolio') slug = 'terminal-portfolio'
    if (project.title === 'Windows 11 Simulation') slug = 'windows-portfolio'
    if (project.title === 'House Locator') slug = 'house-locator'
    return slug
  }

  const slug = getProjectSlug(selectedProject)

  return (
    <section
      id={id}
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 py-20 transition-colors duration-300 dark:bg-neutral-950 md:py-28"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange-500">
            My Work
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl">
            Projects
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </motion.div>

        {/* Category Filters Tab-Bar */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-neutral-900/80">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-bold rounded-full cursor-pointer transition-colors duration-300 z-10 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {category}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Main Carousel Display Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full mb-10">
          
          {/* Left Panel: Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] border border-slate-200/80 bg-white shadow-xl relative overflow-hidden min-h-[460px] lg:order-first order-last dark:border-white/10 dark:bg-neutral-900 dark:shadow-2xl">
            {/* Dynamic Corner Gradient Shadow */}
            <div 
              className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-20 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: selectedProject.glowColor }}
            />

            {/* Pagination / Featured Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {selectedProject.category} Project
              </span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sm font-bold text-slate-950 dark:text-white">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-slate-500">/</span>
                <span className="text-xs text-slate-400 font-medium">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Animated Details Block */}
            <div className="relative z-10 my-auto py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${activeIndex}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                    <span className={`bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}>
                      {selectedProject.title}
                    </span>
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed sm:text-base">
                    {selectedProject.description}
                  </p>
                  
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 cursor-default dark:border-white/5 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Bottom Control Bars */}
            <div className="relative z-10 space-y-6">
              {/* Progress Line */}
              <div className="h-[2px] w-full bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full"
                  style={{ 
                    width: `${((activeIndex + 1) / filteredProjects.length) * 100}%`,
                    backgroundColor: selectedProject.glowColor
                  }}
                  layoutId="carouselProgressBar"
                  transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
              </div>

              {/* Interaction Row */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Arrow Navs */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous project"
                    onClick={handlePrev}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition hover:bg-slate-100 hover:scale-105 active:scale-95 cursor-pointer dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next project"
                    onClick={handleNext}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition hover:bg-slate-100 hover:scale-105 active:scale-95 cursor-pointer dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${slug}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-xs font-bold text-slate-800 transition hover:bg-slate-100 hover:border-slate-300 active:scale-95 cursor-pointer dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                    title={`View case study of ${selectedProject.title}`}
                  >
                    Case Study
                  </Link>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold text-white transition shadow-lg active:scale-95 cursor-pointer glimmer-btn"
                    style={{ 
                      backgroundColor: selectedProject.glowColor,
                      boxShadow: `0 4px 14px ${selectedProject.glowColor}40`
                    }}
                    title={`Launch live demo of ${selectedProject.title}`}
                  >
                    <ExternalLink size={14} />
                    <span>{selectedProject.category === 'Designs' ? 'View Designs' : 'Live Demo'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Premium Screenshot Frame with Drag/Swipe */}
          <div className="lg:col-span-7 relative flex items-center justify-center rounded-[2rem] border border-slate-200 bg-slate-100 overflow-hidden shadow-xl group/canvas lg:order-last order-first min-h-[380px] sm:min-h-[460px] dark:border-white/10 dark:bg-neutral-900 dark:shadow-2xl">
            {/* Dynamic Background Glow */}
            <div 
              className="absolute -inset-10 opacity-20 blur-3xl rounded-full transition-all duration-1000 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${selectedProject.glowColor} 0%, transparent 70%)`
              }}
            />

            {/* Mac-Style Glass Browser Mockup */}
            <motion.div 
              className="relative w-[90%] aspect-[16/10] rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing dark:border-white/10 dark:bg-neutral-950/70"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 0.98 }}
            >
              {/* Browser Header Bar */}
              <div className="h-8 border-b border-slate-200/60 bg-slate-100/60 px-4 flex items-center gap-1.5 select-none dark:border-neutral-800/60 dark:bg-neutral-900/60">
                {/* Dots */}
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                
                {/* Address Bar */}
                <div className="mx-auto w-[60%] h-5 rounded bg-white/80 border border-slate-200/60 flex items-center justify-center text-[9px] font-mono text-slate-400 truncate px-2 select-none dark:bg-neutral-900/80 dark:border-neutral-800/60 dark:text-neutral-500">
                  pujan-joshi.com.np/projects/{slug}
                </div>
              </div>

              {/* Active Screenshot */}
              <div className="relative w-full h-[calc(100%-2rem)] overflow-hidden bg-slate-50 dark:bg-neutral-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${selectedCategory}-${activeIndex}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03]"
                  />
                </AnimatePresence>
                
                {/* Gesture Swipe Helper Badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider text-slate-300 font-bold opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                  Swipe Left/Right to Navigate
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <motion.div
          className="w-full mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-neutral-800 scroll-smooth">
            {filteredProjects.map((project, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={project.title}
                  ref={(el) => {
                    thumbnailRefs.current[idx] = el
                  }}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex-shrink-0 w-32 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 group ${
                    isActive 
                      ? 'scale-105' 
                      : 'border-slate-200 opacity-55 hover:opacity-100 dark:border-neutral-800'
                  }`}
                  style={{
                    borderColor: isActive ? project.glowColor : undefined,
                    boxShadow: isActive ? `0 4px 12px ${project.glowColor}25` : undefined
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Minimal Title Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <span className="text-[9px] text-white font-bold truncate w-full">
                      {project.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Explore All Bottom CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 font-bold text-black shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            View all projects
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="https://github.com/pujanjoci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 active:scale-95 cursor-pointer dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <Github size={18} />
            View on GitHub
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
