'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Terminal,
  Monitor,
  Laptop,
  ExternalLink,
  X,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  Play,
} from 'lucide-react'
import Image from 'next/image'
import {
  EditorialReveal,
  EditorialSectionHeader,
} from './editorial/EditorialMotion'

interface Experience {
  id: 'standard' | 'windows' | 'terminal'
  index: string
  title: string
  subtitle: string
  description: string
  url: string
  icon: typeof Monitor
  badge: string
  features: string[]
}

export default function PortfolioExperiences({
  id = 'experiences',
}: {
  id?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '100px' })

  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null)
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(true)

  // CLI Terminal Animation Simulation State
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'pujan@portfolio:~$ cat pujan.json',
    '{\n  "name": "Pujan Joshi",\n  "status": "building_cool_stuff"\n}',
  ])

  useEffect(() => {
    if (!isInView) return

    const scripts = [
      { type: 'input', text: 'cat pujan.json' },
      {
        type: 'output',
        text: '{\n  "name": "Pujan Joshi",\n  "status": "building_cool_stuff",\n  "city": "Kathmandu, NP"\n}',
      },
      { type: 'input', text: 'ping -c 2 pujan-joshi.com.np' },
      {
        type: 'output',
        text: '64 bytes from np: icmp_seq=1 ttl=64 time=4.2ms\n64 bytes from np: icmp_seq=2 ttl=64 time=4.5ms',
      },
      { type: 'input', text: 'neofetch' },
      {
        type: 'output',
        text: 'OS: Pujan-OS v1.2\nKernel: React-19-Tailwind-4\nUptime: 24/7',
      },
      { type: 'clear', text: '' },
    ]

    let scriptIndex = 0
    let charIndex = 0
    let currentInput = ''
    let timeoutId: NodeJS.Timeout | null = null

    const runTerminalSimulation = () => {
      if (scriptIndex >= scripts.length) {
        scriptIndex = 0
      }
      const currentStep = scripts[scriptIndex]

      if (currentStep.type === 'clear') {
        setTerminalLines([])
        scriptIndex++
        timeoutId = setTimeout(runTerminalSimulation, 500)
        return
      }

      if (currentStep.type === 'input') {
        if (charIndex < currentStep.text.length) {
          currentInput += currentStep.text[charIndex]
          setTerminalLines((prev) => {
            const list = [...prev]
            if (charIndex === 0) {
              list.push(`pujan@portfolio:~$ ${currentInput}`)
            } else {
              list[list.length - 1] = `pujan@portfolio:~$ ${currentInput}`
            }
            return list
          })
          charIndex++
          timeoutId = setTimeout(runTerminalSimulation, 80)
        } else {
          charIndex = 0
          currentInput = ''
          scriptIndex++
          timeoutId = setTimeout(runTerminalSimulation, 600)
        }
      } else if (currentStep.type === 'output') {
        const outputLines = currentStep.text.split('\n')
        setTerminalLines((prev) => [...prev, ...outputLines])
        scriptIndex++
        timeoutId = setTimeout(runTerminalSimulation, 1800)
      }
    }

    timeoutId = setTimeout(runTerminalSimulation, 800)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isInView])

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
      id: 'windows',
      index: '01',
      title: 'Windows Portfolio OS',
      subtitle: 'window.pujan-joshi.com.np',
      description:
        'A fully interactive browser environment styled like Windows 11. Includes custom draggable and resizable window panels, desktop folders, mini-games, and a built-in VS Code & notepad environment.',
      url: 'https://window.pujan-joshi.com.np',
      icon: Monitor,
      badge: 'Interactive Desktop OS',
      features: [
        'Draggable Multi-Window OS',
        'Interactive Desktop Icons',
        'Custom Themes & Wallpapers',
        'VS Code & Browser Simulation',
      ],
    },
    {
      id: 'terminal',
      index: '02',
      title: 'Interactive Portfolio Terminal',
      subtitle: 'terminal.pujan-joshi.com.np',
      description:
        'A retro developer-friendly command line interface. Browse files, invoke shell commands, inspect directories, and unlock hidden system easter eggs via keyboard input.',
      url: 'https://terminal.pujan-joshi.com.np',
      icon: Terminal,
      badge: 'Command-Line Shell',
      features: [
        'Full Custom CLI Engine',
        'Recursive File Browsing',
        'Help Command System',
        'Hidden Retro Games & ASCII Art',
      ],
    },
    {
      id: 'standard',
      index: '03',
      title: 'Modern Portfolio',
      subtitle: 'pujan-joshi.com.np',
      description:
        'The primary editorial edition centered around typographic hierarchy, visual performance, and purposeful interactions. Tailored for creative directors, founders, and engineering teams.',
      url: 'https://pujan-joshi.com.np',
      icon: Laptop,
      badge: 'Active Edition',
      features: [
        'Next.js 16 App Router',
        'Editorial Grid Architecture',
        'Tailwind CSS v4 Tokens',
        'Adaptive Dark / Light Modes',
      ],
    },
  ]

  const openPreview = (url: string, title: string) => {
    setActiveIframeUrl(url)
    setIframeTitle(title)
    setIframeLoading(true)
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className="editorial-section relative w-full py-24 md:py-32 border-t border-[var(--ed-border)] transition-colors duration-300"
    >
      <div className="editorial-container">
        <EditorialSectionHeader
          index="06"
          label="Interactive Editions"
          title="Alternative portfolio"
          accentWord="paradigms."
          subtitle="Beyond this editorial edition, explore two self-contained interactive environments—a browser-based Windows 11 desktop operating system and a keyboard-driven retro command-line terminal."
        />

        {/* Editorial Showcase Rows */}
        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon
            const isCurrent = exp.id === 'standard'

            return (
              <EditorialReveal key={exp.id} delay={idx * 0.06}>
                <article className="group border border-[var(--ed-border)] bg-[var(--ed-surface)] p-6 sm:p-8 lg:p-10 transition-colors hover:border-[var(--ed-border-strong)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Large Visual Preview Stage (7 Cols) */}
                    <div
                      className={`lg:col-span-7 ${
                        idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--ed-border)] bg-neutral-950">
                        {exp.id === 'windows' && (
                          <div className="relative w-full h-full overflow-hidden group/preview">
                            <Image
                              src="/projects/window.webp"
                              alt="Windows 11 OS Portfolio Simulation preview"
                              fill
                              sizes="(max-width: 1024px) 100vw, 720px"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent flex items-end justify-between p-4 sm:p-6">
                              <div className="flex items-center gap-2 text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15">
                                <Monitor size={13} className="text-orange-400" />
                                <span>window.pujan-joshi.com.np</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => openPreview(exp.url, exp.title)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                              >
                                <Play size={11} className="fill-current" />
                                <span>Boot Sandbox</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {exp.id === 'terminal' && (
                          <div className="w-full h-full bg-[#090B0E] p-5 sm:p-7 font-mono text-xs sm:text-sm text-emerald-400 leading-relaxed overflow-hidden flex flex-col justify-between select-none">
                            {/* Terminal Window Header */}
                            <div className="flex justify-between items-center text-slate-400 border-b border-white/10 pb-3 mb-3 text-[11px]">
                              <div className="flex items-center gap-2">
                                <Terminal size={13} className="text-emerald-400" />
                                <span>bash — pujan@terminal: ~ (80×24)</span>
                              </div>
                              <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                              </div>
                            </div>

                            {/* Live Animated CLI Output */}
                            <div className="flex-1 flex flex-col justify-end space-y-1.5 overflow-hidden">
                              {terminalLines.slice(-6).map((line, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="whitespace-pre-wrap font-mono text-xs sm:text-[13px] text-emerald-400/95"
                                >
                                  {line}
                                </div>
                              ))}
                              <div className="flex items-center gap-1 text-emerald-300">
                                <span>pujan@portfolio:~$</span>
                                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
                              </div>
                            </div>

                            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                              <span>Interactive Shell Ready</span>
                              <button
                                type="button"
                                onClick={() => openPreview(exp.url, exp.title)}
                                className="text-emerald-400 hover:underline uppercase tracking-wider font-semibold cursor-pointer"
                              >
                                [Launch Interactive CLI →]
                              </button>
                            </div>
                          </div>
                        )}

                        {exp.id === 'standard' && (
                          <div className="relative w-full h-full bg-[var(--ed-bg)] p-6 sm:p-8 flex flex-col justify-between border-inner">
                            <div className="flex items-center justify-between border-b border-[var(--ed-border)] pb-4">
                              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-orange-500 font-semibold">
                                EDITION 03 / MODERN PORTFOLIO
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Active Viewport
                              </span>
                            </div>

                            <div className="my-auto py-4 space-y-3">
                              <p className="font-serif-accent italic text-2xl sm:text-3xl md:text-4xl text-[var(--ed-text)] leading-tight">
                                Typography, grid architecture &amp; purposeful motion.
                              </p>
                              <p className="text-xs sm:text-sm font-mono text-[var(--ed-muted)]">
                                Designed for seamless reading across desktop, tablet, and mobile viewports.
                              </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--ed-border)] text-[10px] font-mono uppercase tracking-wider text-[var(--ed-muted)]">
                              <div>12-Col Grid</div>
                              <div>Dark / Light Theme</div>
                              <div>23 Case Studies</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specification & Controls Column (5 Cols) */}
                    <div
                      className={`lg:col-span-5 space-y-6 ${
                        idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-[var(--ed-border)] pb-3">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                          EXPERIENCE / {exp.index}
                        </span>
                        <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-orange-500/30 bg-orange-500/10 text-orange-500 font-semibold">
                          {exp.badge}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-orange-500 shrink-0" />
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--ed-text)] tracking-tight">
                            {exp.title}
                          </h3>
                        </div>
                        <p className="text-xs font-mono text-[var(--ed-muted)]">
                          {exp.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-[var(--ed-muted)] leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {exp.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-center gap-2 text-xs font-mono text-[var(--ed-text)] bg-[var(--ed-bg)] border border-[var(--ed-border)] px-3 py-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-muted)]">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>Currently Viewing This Edition</span>
                          </span>
                        ) : (
                          <>
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-colors"
                              title={`Launch live experience: ${exp.title}`}
                            >
                              <span>Launch Live Experience</span>
                              <ArrowUpRight
                                size={14}
                                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                              />
                            </a>

                            <button
                              type="button"
                              onClick={() => openPreview(exp.url, exp.title)}
                              className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.16em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
                            >
                              <span>Interactive Preview</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </EditorialReveal>
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
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl h-[85vh] border border-slate-200 dark:border-white/15 bg-white dark:bg-neutral-900 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Window TitleBar controls */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveIframeUrl(null)}
                    className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group cursor-pointer"
                    aria-label="Close simulator"
                  >
                    <X className="w-2.5 h-2.5 text-red-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/70" />
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/70" />
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 px-4 py-1.5 border border-slate-300/30 dark:border-white/10">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Simulator: {iframeTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeIframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors"
                    title="Open full page in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveIframeUrl(null)}
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                    title="Close preview"
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
                      <p className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Booting Portfolio Experience...
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs px-4">
                        Initializing live sandbox connection to {iframeTitle}.
                      </p>
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
              <div className="px-4 py-2 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-950 flex items-center justify-between text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Interactive Sandbox Mode</span>
                </div>
                <span>Press ESC to Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
