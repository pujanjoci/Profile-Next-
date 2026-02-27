'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import Link from 'next/link'

/* ────────────────────────────────────────────────────────────
   Project data — swap in your real projects here
──────────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'Portfolio 2025',
    description: 'Minimalist, high-performance portfolio built with Next.js and Tailwind CSS.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/1/600/400',
  },
  {
    title: 'EcoTrack',
    description: 'Mobile-first app to track your carbon footprint with personalised tips.',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/20/600/400',
  },
  {
    title: 'TaskFlow',
    description: 'Team productivity tool with real-time updates and Kanban boards.',
    tech: ['Vue.js', 'Firebase', 'Tailwind'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/48/600/400',
  },
  {
    title: 'SnapStore',
    description: 'E-commerce platform with a seamless checkout experience and Stripe integration.',
    tech: ['Next.js', 'Stripe', 'Prisma'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/96/600/400',
  },
  {
    title: 'DevBlog',
    description: 'Personal blog powered by MDX with syntax highlighting and reading progress.',
    tech: ['Next.js', 'MDX', 'Tailwind'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/100/600/400',
  },
  {
    title: 'WeatherNow',
    description: 'Real-time weather dashboard with interactive charts and location search.',
    tech: ['React', 'OpenWeather API', 'Chart.js'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/137/600/400',
  },
  {
    title: 'ChatSpace',
    description: 'Real-time chat application with rooms, typing indicators, and emoji support.',
    tech: ['Socket.io', 'Express', 'React'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/160/600/400',
  },
  {
    title: 'ArtFolio',
    description: 'Gallery app for digital artists with masonry layout and lazy loading.',
    tech: ['React', 'Cloudinary', 'Masonry.js'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/200/600/400',
  },
  {
    title: 'CryptoTracker',
    description: 'Live crypto price tracker with portfolio management and alerts.',
    tech: ['React', 'CoinGecko API', 'Recharts'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/250/600/400',
  },
  {
    title: 'FitPlan',
    description: 'Workout planner and progress tracker with animated exercise demos.',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    image: 'https://picsum.photos/id/300/600/400',
  },
]

const TOTAL = projects.length          // 10
const ANGLE_STEP = 360 / TOTAL         // 36 deg per item
const RADIUS = 400                     // px — 20% smaller than original 500
const AUTO_SPEED = 0.125               // degrees per frame — 50% slower than original 0.25

/* ────────────────────────────────────────────────────────────
   3-D ring carousel (No GSAP — pure React + CSS transforms)
──────────────────────────────────────────────────────────── */
function ProjectCarousel() {
  const ringRef = useRef<HTMLDivElement>(null)
  const rotationY = useRef(180)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const rafId = useRef<number | null>(null)
  const isPlayingRef = useRef(true)          // mutable — read in RAF loop
  const directionRef = useRef<1 | -1>(1)    // +1 = forward, -1 = backward
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)      // for button UI
  const [direction, setDirection] = useState<1 | -1>(1) // for button UI

  /** Apply the ring rotation and parallax to each image */
  const applyTransform = useCallback(() => {
    const ring = ringRef.current
    if (!ring) return
    ring.style.transform = `rotateY(${rotationY.current}deg)`
    const imgs = ring.querySelectorAll<HTMLDivElement>('.carousel-img')
    imgs.forEach((img, i) => {
      const pos =
        100 -
        (((rotationY.current - 180 - i * ANGLE_STEP) % 360 + 360) % 360) / 360 * 500
      img.style.backgroundPosition = `${pos}px center`
    })
  }, [])

  /** Animate loop */
  const animate = useCallback(() => {
    if (!isDragging.current && isPlayingRef.current) {
      rotationY.current += AUTO_SPEED * directionRef.current
    }
    applyTransform()
    rafId.current = requestAnimationFrame(animate)
  }, [applyTransform])

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate)
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  /* ── drag handlers ── */
  const onDragStart = (clientX: number) => {
    isDragging.current = true
    lastX.current = clientX
  }
  const onDragMove = (clientX: number) => {
    if (!isDragging.current) return
    const delta = clientX - lastX.current
    rotationY.current += delta * 0.4
    lastX.current = clientX
  }
  const onDragEnd = () => { isDragging.current = false }

  /* ── control handlers ── */
  const togglePlay = () => {
    isPlayingRef.current = !isPlayingRef.current
    setIsPlaying(isPlayingRef.current)
  }
  const stepLeft = () => {
    rotationY.current -= ANGLE_STEP
    applyTransform()
  }
  const stepRight = () => {
    rotationY.current += ANGLE_STEP
    applyTransform()
  }
  const toggleDirection = () => {
    directionRef.current = directionRef.current === 1 ? -1 : 1
    setDirection(directionRef.current)
  }

  return (
    <div
      className="relative w-full select-none"
      style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
    >
      {/* 3-D Ring — 20% smaller: 240×336px */}
      <div
        className="relative mx-auto"
        style={{ width: '240px', height: '336px', transformStyle: 'preserve-3d' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          ref={ringRef}
          style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', cursor: 'grab' }}
        >
          {projects.map((project, i) => {
            const angle = i * ANGLE_STEP
            const isHovered = hoveredIndex === i
            const isActive = activeIndex === i

            return (
              <div
                key={project.title}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                  transition: 'opacity 0.3s ease',
                  opacity: hoveredIndex !== null && !isHovered ? 0.45 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : i)}
              >
                {/* Card */}
                <div
                  className={`
                    relative w-full h-full rounded-2xl overflow-hidden
                    border border-white/20 dark:border-white/10
                    shadow-2xl cursor-pointer
                    transition-all duration-300
                    ${isHovered ? 'shadow-orange-400/30 scale-[1.03]' : ''}
                  `}
                >
                  {/* Background image with parallax */}
                  <div
                    className="carousel-img absolute inset-0"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: '600px 420px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1 drop-shadow-sm">
                      {project.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white/15 backdrop-blur-sm text-white/90 text-xs rounded-full border border-white/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links — visible on hover */}
                    <div
                      className={`flex gap-3 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold rounded-full transition-colors shadow-md"
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-full transition-colors backdrop-blur-sm border border-white/20"
                      >
                        <Github size={12} />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Drag hint */}
      <p className="text-center text-slate-600 text-xs mt-26 select-none pointer-events-none">
        ← drag to spin →
      </p>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Projects Section
──────────────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-neutral-950 py-20 md:py-28 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Drag the carousel to explore — a selection of things I&apos;ve built.
          </p>
        </motion.div>

        {/* 3-D Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <ProjectCarousel />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm shadow-lg"
          >
            <Github size={18} />
            View all on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  )
}