'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Search,
  Sparkles,
  X,
  Code,
  FolderGit2,
  Tv,
  Gamepad,
  Palette,
  Layers,
} from 'lucide-react'
import Link from 'next/link'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

const CATEGORIES = ['All', 'Web Apps', 'Games', 'UI/UX', 'Designs'] as const
type Category = typeof CATEGORIES[number]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Dynamically calculate category counts
  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = cat === 'All'
        ? projects.length
        : projects.filter((p) => p.category === cat).length
      return acc
    }, {} as Record<Category, number>)
  }, [])

  // Filter projects based on search query and category tab selection
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some((t) => t.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Get category icon
  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case 'All':
        return <Layers className="w-4 h-4" />
      case 'Web Apps':
        return <Tv className="w-4 h-4" />
      case 'Games':
        return <Gamepad className="w-4 h-4" />
      case 'UI/UX':
        return <Palette className="w-4 h-4 text-orange-400" />
      case 'Designs':
        return <FolderGit2 className="w-4 h-4" />
      default:
        return <FolderGit2 className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white font-sans selection:bg-orange-500/30 selection:text-orange-400 overflow-hidden relative">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute right-[15%] top-[25%] h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[130px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute left-[30%] bottom-[10%] h-[550px] w-[550px] rounded-full bg-cyan-500/5 blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-20 border-b border-white/5 bg-neutral-950/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-300 active:scale-95 cursor-pointer hover:text-white hover:border-white/20"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-400">
              Portfolio Directory
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Showcase Directory
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              All Creations
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-[3px] w-28 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 mt-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            A high-fidelity folder of my designs, retro & multiplayer games, dynamic web applications, and professional enterprise portals.
          </motion.p>
        </div>

        {/* Search & Filter Section */}
        <section className="space-y-6 mb-12 relative z-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 order-last md:order-first">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-black border-transparent shadow-lg shadow-orange-500/20'
                        : 'bg-neutral-900/60 border-white/5 text-slate-400 hover:text-white hover:bg-neutral-800/80 hover:border-white/10'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive ? 'bg-black/20 text-black' : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/60 border border-white/5 rounded-full py-2.5 pl-10 pr-9 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20 transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 px-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
          <div>
            Showing {filteredProjects.length} of {projects.length} Projects
          </div>
          {searchQuery && (
            <div>
              Search Match: &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Grid List */}
        <motion.section 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.02 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
              >
                {/* Glow Overlay behind the card */}
                <div
                  className="absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none"
                  style={{ backgroundColor: project.glowColor }}
                />

                {/* Card Top: Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Category Pill Tag on Image */}
                  <span className="absolute top-4 left-4 rounded-full bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-slate-300">
                    {project.category}
                  </span>
                </div>

                {/* Card Body: Info */}
                <div className="flex flex-col flex-grow p-6 sm:p-7 justify-between relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-white">
                      <span className={`bg-gradient-to-r ${project.color} bg-clip-text text-transparent group-hover:opacity-100 transition-opacity`}>
                        {project.title}
                      </span>
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags and Buttons Container */}
                  <div className="mt-6 space-y-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Links */}
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs font-bold text-white transition hover:bg-white/15 hover:border-white/20 active:scale-95 cursor-pointer"
                      >
                        <Github size={13} />
                        <span>Code</span>
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold text-white transition shadow-lg active:scale-95 cursor-pointer hover:opacity-95"
                        style={{
                          backgroundColor: project.glowColor,
                          boxShadow: `0 4px 12px ${project.glowColor}30`,
                        }}
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-neutral-900/10 rounded-3xl border border-white/5 border-dashed mt-8 max-w-lg mx-auto"
          >
            <FolderGit2 className="w-12 h-12 mx-auto text-slate-600 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-white mb-2">No Projects Found</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto px-4">
              We couldn&apos;t find any projects matching &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category. Try typing something else!
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 cursor-pointer"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-neutral-950 py-10 mt-20 text-center text-xs text-slate-500 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Pujan Joshi. Built with Next.js, Framer Motion, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
