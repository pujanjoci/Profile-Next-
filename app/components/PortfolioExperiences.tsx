'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Monitor, Laptop, ExternalLink, X, Maximize2, Loader2, Sparkles, AlertCircle, ChevronRight } from 'lucide-react'

interface Experience {
  id: string
  title: string
  subtitle: string
  description: string
  url: string
  icon: typeof Monitor
  badge?: string
  glowColor: string
  borderGlow: string
  features: string[]
  color: string
}

export default function PortfolioExperiences({ id = 'experiences' }: { id?: string }) {
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null)
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(true)

  // 1. CLI Terminal Animation Simulation State
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const terminalIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const scripts = [
      { type: 'input', text: 'cat pujan.json' },
      { type: 'output', text: '{\n  "name": "Pujan Joshi",\n  "status": "building_cool_stuff",\n  "city": "Kathmandu, NP"\n}' },
      { type: 'input', text: 'ping -c 2 pujan-joshi.com.np' },
      { type: 'output', text: '64 bytes from np: icmp_seq=1 ttl=64 time=4.2ms\n64 bytes from np: icmp_seq=2 ttl=64 time=4.5ms' },
      { type: 'input', text: 'neofetch' },
      { type: 'output', text: 'OS: Pujan-OS v1.2\nKernel: React-19-Tailwind-4\nUptime: 24/7' },
      { type: 'clear', text: '' }
    ]

    let scriptIndex = 0
    let charIndex = 0
    let currentInput = ''

    const runTerminalSimulation = () => {
      if (scriptIndex >= scripts.length) {
        scriptIndex = 0
      }
      const currentStep = scripts[scriptIndex]

      if (currentStep.type === 'clear') {
        setTerminalLines([])
        scriptIndex++
        setTimeout(runTerminalSimulation, 500)
        return
      }

      if (currentStep.type === 'input') {
        if (charIndex < currentStep.text.length) {
          currentInput += currentStep.text[charIndex]
          setTerminalLines(prev => {
            const list = [...prev]
            if (charIndex === 0) {
              list.push(`pujan@portfolio:~$ ${currentInput}`)
            } else {
              list[list.length - 1] = `pujan@portfolio:~$ ${currentInput}`
            }
            return list
          })
          charIndex++
          setTimeout(runTerminalSimulation, 70)
        } else {
          // Finished typing input, pause then show output
          charIndex = 0
          currentInput = ''
          scriptIndex++
          setTimeout(runTerminalSimulation, 400)
        }
      } else if (currentStep.type === 'output') {
        const outputLines = currentStep.text.split('\n')
        setTerminalLines(prev => [...prev, ...outputLines])
        scriptIndex++
        setTimeout(runTerminalSimulation, 1500)
      }
    }

    runTerminalSimulation()

    return () => {
      if (terminalIntervalRef.current) clearInterval(terminalIntervalRef.current)
    }
  }, [])

  // Lock scroll when modal is active
  useEffect(() => {
    if (activeIframeUrl) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIframeUrl])

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIframeUrl(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const experiences: Experience[] = [
    {
      id: 'standard',
      title: 'Modern Responsive',
      subtitle: 'Current Site',
      description: 'A polished, minimalist design centered around readability, visual performance, and sleek animations. Tailored for corporate clients and modern developers.',
      url: 'https://pujan-joshi.com.np',
      icon: Laptop,
      badge: 'Active Mode',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      borderGlow: 'group-hover:border-orange-500/30',
      color: 'from-orange-500 to-amber-400',
      features: ['Next.js App Router', 'React Three Fiber (3D)', 'Tailwind CSS v4', 'Dark / Light modes']
    },
    {
      id: 'windows',
      title: 'Windows OS Simulation',
      subtitle: 'window.pujan-joshi.com.np',
      description: 'A fully interactive browser environment styled like Windows 11. Includes custom draggable window panels, desktop folders, games, and built-in text editor.',
      url: 'https://window.pujan-joshi.com.np',
      icon: Monitor,
      badge: 'Interactive OS',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      borderGlow: 'group-hover:border-blue-500/30',
      color: 'from-blue-600 to-cyan-400',
      features: ['Draggable Multi-Window OS', 'Interactive Desktop Icons', 'Custom Themes & Wallpapers', 'VS Code & Browser simulation']
    },
    {
      id: 'terminal',
      title: 'Retro CLI Terminal',
      subtitle: 'terminal.pujan-joshi.com.np',
      description: 'A retro developer-friendly command line interface. Browse files, invoke actions, search directories, and unlock system easter eggs via keyboard commands.',
      url: 'https://terminal.pujan-joshi.com.np',
      icon: Terminal,
      badge: 'Command Line',
      glowColor: 'rgba(34, 197, 94, 0.15)',
      borderGlow: 'group-hover:border-emerald-500/30',
      color: 'from-emerald-500 to-teal-400',
      features: ['Full Custom CLI Engine', 'Recursive File Browsing', 'Help Command System', 'Hidden retro games & ASCII art']
    }
  ]

  const openPreview = (url: string, title: string) => {
    setActiveIframeUrl(url)
    setIframeTitle(title)
    setIframeLoading(true)
  }

  return (
    <section id={id} className="relative w-full overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 md:py-28 border-t border-slate-100 dark:border-white/5">
      {/* Decorative Blur Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl opacity-40 dark:opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-orange-500">
            <Sparkles size={12} className="text-orange-500 animate-pulse" />
            02 / Portfolio Views
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-slate-950 dark:text-white md:text-5xl tracking-tight">
            Alternative Experiences
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            I explore multiple layouts and interactive paradigms. Choose the aesthetic that fits your style, or preview my other full-fledged portfolios right here.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </motion.div>

        {/* 3-Column Experience Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {experiences.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-neutral-900 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Glow Background behind the active card */}
                <div
                  className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: exp.glowColor }}
                />

                {/* Top Section */}
                <div className="relative z-10">
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-800 dark:text-white">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    {exp.badge && (
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-orange-500/10 text-orange-500 dark:bg-orange-500/20`}>
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white mb-1">
                    <span className={`bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                      {exp.title}
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">{exp.subtitle}</p>
                  
                  {/* Visual Mockups */}
                  <div className="relative aspect-video rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200/60 dark:border-white/5 overflow-hidden mb-6 flex flex-col justify-between">
                    {exp.id === 'standard' && (
                      <div className="w-full h-full p-4 flex flex-col gap-2 relative">
                        {/* Simulated Current Portfolio Wireframe layout */}
                        <div className="flex justify-between items-center pb-2 border-b border-slate-300/40 dark:border-white/10">
                          <div className="w-8 h-2 rounded bg-slate-400/40" />
                          <div className="flex gap-1.5">
                            <div className="w-3 h-2 rounded bg-slate-400/30" />
                            <div className="w-3 h-2 rounded bg-slate-400/30" />
                            <div className="w-3 h-2 rounded bg-slate-400/30" />
                          </div>
                        </div>
                        <div className="flex gap-3 h-full items-stretch pt-2">
                          <div className="w-1/3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center">
                            <Laptop className="w-6 h-6 text-orange-500/50" />
                          </div>
                          <div className="flex-1 flex flex-col gap-1.5 justify-center">
                            <div className="w-full h-3 rounded bg-slate-400/40" />
                            <div className="w-5/6 h-2 rounded bg-slate-400/20" />
                            <div className="w-4/5 h-2 rounded bg-slate-400/20" />
                          </div>
                        </div>
                        <div className="absolute right-2 bottom-2 rounded-full w-4 h-4 bg-orange-500 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        </div>
                      </div>
                    )}

                    {exp.id === 'windows' && (
                      <div className="w-full h-full bg-gradient-to-tr from-blue-900/40 to-cyan-800/20 p-2 relative flex flex-col justify-between font-sans">
                        {/* Windows Mock Layout */}
                        <div className="flex-1 flex items-center justify-center">
                          {/* Simulated mini desktop window */}
                          <div className="w-24 h-16 rounded-md bg-neutral-900/80 border border-white/20 shadow-lg p-1 flex flex-col">
                            <div className="flex justify-between items-center pb-1 border-b border-white/15">
                              <span className="text-[5px] text-white/70">portfolio.txt</span>
                              <div className="flex gap-0.5">
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="w-1 h-1 rounded-full bg-red-500/70" />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-0.5 pt-1">
                              <div className="w-8 h-1 rounded bg-blue-400/80" />
                              <div className="w-12 h-1.5 rounded bg-white/30" />
                            </div>
                          </div>
                        </div>
                        {/* Bottom Taskbar */}
                        <div className="h-4 bg-white/10 backdrop-blur-md border-t border-white/15 rounded-b-lg flex justify-center items-center gap-1.5">
                          <div className="w-2 h-2 rounded bg-blue-500" />
                          <div className="w-1.5 h-1.5 rounded-sm bg-cyan-400" />
                          <div className="w-1.5 h-1.5 rounded-sm bg-white/50" />
                          <div className="w-1.5 h-1.5 rounded-sm bg-white/50" />
                        </div>
                      </div>
                    )}

                    {exp.id === 'terminal' && (
                      <div className="w-full h-full bg-black p-3 font-mono text-[9px] text-emerald-400 leading-normal overflow-hidden flex flex-col select-none">
                        {/* Animated CLI elements */}
                        <div className="flex justify-between items-center text-slate-500 border-b border-white/5 pb-1 mb-1.5 text-[7px]">
                          <span>bash - pujan@terminal</span>
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                          {terminalLines.slice(-4).map((line, lIdx) => (
                            <div key={lIdx} className="whitespace-pre-wrap font-mono">
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features and Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {exp.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <ChevronRight className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="relative z-10 flex flex-col sm:flex-row gap-2 mt-auto">
                  {exp.id === 'standard' ? (
                    <button
                      disabled
                      className="w-full inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 dark:bg-white/5 dark:border-white/5 text-xs font-bold text-slate-400 dark:text-slate-500 cursor-default"
                    >
                      Currently Active
                    </button>
                  ) : (
                    <>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-xs font-bold text-white transition-all shadow-md shadow-orange-500/10 cursor-pointer glimmer-btn"
                        title={`Launch live demo of ${exp.title}`}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                      <button
                        onClick={() => openPreview(exp.url, exp.title)}
                        className="inline-flex h-11 px-4 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
                        title="Launch Preview"
                      >
                        <span>Preview</span>
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Embedded Iframe Preview Simulator Modal */}
      <AnimatePresence>
        {activeIframeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl h-[85vh] rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Window TitleBar controls */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950">
                {/* Simulated window action bubbles */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveIframeUrl(null)}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
                    aria-label="Close simulator"
                  >
                    <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/70" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/70" />
                </div>

                {/* Center Title */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 font-mono tracking-tight bg-slate-200/50 dark:bg-white/5 px-4 py-1.5 rounded-full border border-slate-350/10">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Simulator: {iframeTitle}</span>
                </div>

                {/* Right side helper link */}
                <div className="flex items-center gap-2">
                  <a
                    href={activeIframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"
                    title="Open full page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveIframeUrl(null)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Iframe content + Loading overlay */}
              <div className="flex-1 relative bg-black">
                {iframeLoading && (
                  <div className="absolute inset-0 z-30 bg-neutral-950 flex flex-col items-center justify-center gap-4 text-center">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-white">Booting Portfolio Experience...</p>
                      <p className="text-xs text-slate-400 max-w-xs px-4">Initializing connection to secure host server sandbox.</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={activeIframeUrl}
                  className="w-full h-full border-0 select-none pointer-events-auto"
                  onLoad={() => setIframeLoading(false)}
                  title={`Live Preview of ${iframeTitle}`}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>

              {/* Statusbar footer */}
              <div className="px-4 py-2 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Iframe Sandbox Enabled</span>
                </div>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
