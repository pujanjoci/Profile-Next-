'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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
  
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [cardWidth, setCardWidth] = useState(360)
  const [maxScroll, setMaxScroll] = useState(0)

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

  // Update card width and max scroll constraints dynamically
  const updateConstraints = () => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
    if (containerRef.current && trackRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const trackWidth = trackRef.current.scrollWidth
      setMaxScroll(Math.max(0, trackWidth - containerWidth))
    }
  }

  useEffect(() => {
    updateConstraints()
    // Set a short timeout to let layout settle
    const timer = setTimeout(updateConstraints, 150)
    window.addEventListener('resize', updateConstraints)
    return () => {
      window.removeEventListener('resize', updateConstraints)
      clearTimeout(timer)
    }
  }, [filteredProjects, activeIndex])

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  // Magnetic snap logic on drag release
  const handleDragEnd = (event: any, info: any) => {
    const step = cardWidth + 24 // cardWidth + gap
    const offset = info.offset.x
    const velocity = info.velocity.x

    let indexChange = 0
    if (offset < -80 || velocity < -400) {
      indexChange = 1
    } else if (offset > 80 || velocity > 400) {
      indexChange = -1
    }

    const nextIndex = Math.max(0, Math.min(filteredProjects.length - 1, activeIndex + indexChange))
    setActiveIndex(nextIndex)
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

  const activeTranslation = -activeIndex * (cardWidth + 24)

  return (
    <section
      id={id}
      className="relative min-h-screen w-full overflow-hidden bg-slate-50 py-20 transition-colors duration-300 dark:bg-neutral-950 md:py-28"
    >
      {/* Background ambient light matching the active project color */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: selectedProject.glowColor }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-orange-500">
              My Work
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl">
              Projects
            </h2>
            <div className="h-1 w-20 mt-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
          </motion.div>

          {/* Top Panel Controls */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Slide Index Counter */}
            <div className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500 select-none">
              <span className="text-slate-950 dark:text-white">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1 text-slate-400">/</span>
              <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            </div>

            {/* Pagination Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous project"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={handleNext}
                disabled={activeIndex === filteredProjects.length - 1}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Category Filters Tab-Bar */}
        <motion.div 
          className="flex flex-wrap justify-start gap-2 mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-neutral-900/80">
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

        {/* Draggable Deck Viewport */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-visible py-4"
        >
          {/* Glass Fade overlays on bounds to mask the exit slides */}
          <div className="pointer-events-none absolute inset-y-0 -left-4 w-12 sm:w-20 bg-gradient-to-r from-slate-50 to-transparent dark:from-neutral-950 z-20" />
          <div className="pointer-events-none absolute inset-y-0 -right-4 w-12 sm:w-20 bg-gradient-to-l from-slate-50 to-transparent dark:from-neutral-950 z-20" />

          {/* Draggable sliding row track */}
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{ x: activeTranslation }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing w-max px-2"
          >
            {filteredProjects.map((project, idx) => {
              const isActive = idx === activeIndex
              const projectSlug = getProjectSlug(project)
              
              return (
                <motion.div
                  key={project.title}
                  ref={idx === 0 ? cardRef : undefined}
                  className={`w-[290px] xs:w-[320px] sm:w-[360px] flex-shrink-0 flex flex-col justify-between rounded-[2rem] border overflow-hidden transition-all duration-500 bg-white/80 backdrop-blur-md shadow-lg group select-none dark:bg-neutral-900/80 ${
                    isActive
                      ? 'border-slate-300 scale-[1.01] dark:border-neutral-700'
                      : 'border-slate-200/60 opacity-60 scale-95 dark:border-neutral-800/60'
                  }`}
                  style={{
                    borderColor: isActive ? project.glowColor : undefined,
                    boxShadow: isActive ? `0 20px 40px ${project.glowColor}15` : undefined
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: isActive ? 1.02 : 0.97,
                    borderColor: project.glowColor,
                    boxShadow: `0 25px 50px ${project.glowColor}20`
                  }}
                >
                  {/* Top Part: Mockup Browser Box */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200/60 dark:bg-neutral-800 dark:border-neutral-800/60">
                    {/* Mockup Top Header */}
                    <div className="h-7 bg-slate-200/50 px-3 flex items-center gap-1 border-b border-slate-200/40 dark:bg-neutral-800/50 dark:border-neutral-700/30">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <div className="mx-auto w-[65%] h-4 rounded bg-white/70 flex items-center justify-center text-[8px] font-mono text-slate-400 truncate dark:bg-neutral-950/70 dark:text-neutral-500">
                        pujan-joshi.com.np/{projectSlug}
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative w-full h-[calc(100%-1.75rem)] overflow-hidden bg-slate-50 dark:bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Dark Overlay with Launch helper */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white border border-white/20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                          Drag / Swipe
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow min-h-[220px]">
                    <div className="space-y-3">
                      {/* Tech stack details */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {project.category}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                        <span className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                          {project.title}
                        </span>
                      </h3>

                      {/* Snippet */}
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 mt-auto">
                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-white/5 dark:bg-white/5 dark:text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[9px] font-semibold text-slate-400 self-center">
                            +{project.tech.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100/80 pt-4 dark:border-neutral-800/80">
                        <Link
                          href={`/projects/${projectSlug}`}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-bold text-slate-800 transition hover:bg-slate-100 hover:border-slate-300 active:scale-95 cursor-pointer dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={12} />
                        </Link>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[11px] font-bold text-white transition shadow-md active:scale-95 cursor-pointer glimmer-btn"
                          style={{ 
                            backgroundColor: project.glowColor,
                            boxShadow: `0 4px 10px ${project.glowColor}30`
                          }}
                        >
                          <ExternalLink size={12} />
                          <span>{project.category === 'Designs' ? 'View Designs' : 'Live Demo'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Sync Pagination Dots Indicators */}
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {filteredProjects.map((project, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={project.title}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? '' : 'bg-slate-300 dark:bg-neutral-800'
                }`}
                style={{
                  width: isActive ? '24px' : '8px',
                  backgroundColor: isActive ? selectedProject.glowColor : undefined,
                }}
                title={`Go to project ${idx + 1}`}
              />
            )
          })}
        </div>

        {/* Explore All Bottom CTA Buttons */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-4 text-center"
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
