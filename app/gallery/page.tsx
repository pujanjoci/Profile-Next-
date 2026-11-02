'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  X,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { siteConfig } from '../seo'
import {
  EditorialReveal,
  EditorialSectionHeader,
} from '../components/editorial/EditorialMotion'
import styles from './book.module.css'

interface GalleryPhoto {
  id: string
  src: string
  title: string
  caption: string
  aspect: 'portrait' | 'landscape' | 'square'
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: '01',
    src: '/images/profile-1.webp',
    title: 'Mountain View',
    caption: 'View from CCTV, Ghandruk, Nepal',
    aspect: 'portrait',
  },
  {
    id: '02',
    src: '/images/profile-2.webp',
    title: 'Party Selfi',
    caption: 'Selfi at a party',
    aspect: 'portrait',
  },
  {
    id: '03',
    src: '/images/profile-3.webp',
    title: 'Profile 1',
    caption: 'Portraiture',
    aspect: 'portrait',
  },
  {
    id: '04',
    src: '/images/profile-4.webp',
    title: 'Archery',
    caption: 'Nice to shoot some arrows in a while',
    aspect: 'portrait',
  },
  {
    id: '05',
    src: '/images/profile-5.webp',
    title: 'Profile 2',
    caption: 'Monochrome',
    aspect: 'portrait',
  },
  {
    id: '06',
    src: '/images/profile-6.webp',
    title: 'Profile 3 (small)',
    caption: 'Looked like a child here',
    aspect: 'portrait',
  },
  {
    id: '07',
    src: '/images/profile-7.webp',
    title: 'Profile 4',
    caption: 'looked clean here',
    aspect: 'portrait',
  },
  {
    id: '08',
    src: '/images/profile-8.webp',
    title: 'Profile 5',
    caption: 'Hve to travel more often tho',
    aspect: 'portrait',
  },
  {
    id: '09',
    src: '/images/profile-9.webp',
    title: 'Profile 6 (B&W)',
    caption: 'This photo has a vibe',
    aspect: 'portrait',
  },
]

function BookFlip({ mode }: { mode: 'portraits' | 'projects' }) {
  const portraitImages = [
    '/images/profile-1.webp',
    '/images/profile-2.webp',
    '/images/profile-3.webp',
    '/images/profile-4.webp',
    '/images/profile-5.webp',
  ]

  const projectImages = [
    '/projects/window.webp',
    '/projects/Ecommerce.webp',
    '/projects/imposter.webp',
    '/projects/novel.webp',
    '/projects/SewaYatra.webp',
  ]

  const images = mode === 'portraits' ? portraitImages : projectImages

  const style = {
    '--img-1': `url('${images[0]}')`,
    '--img-2': `url('${images[1]}')`,
    '--img-3': `url('${images[2]}')`,
    '--img-4': `url('${images[3]}')`,
    '--img-5': `url('${images[4]}')`,
  } as React.CSSProperties

  return (
    <div
      key={mode}
      className={`${styles.bookScene} scale-[0.72] xs:scale-[0.85] sm:scale-100 transition-transform duration-300`}
      style={style}
    >
      <div className={styles.imgLoader} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.book}>
          <div className={styles.gap} />
          <div className={styles.pages}>
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
          </div>
          <div className={styles.flips}>
            <div className={`${styles.flip} ${styles.flip1}`}>
              <div className={`${styles.flip} ${styles.flip2}`}>
                <div className={`${styles.flip} ${styles.flip3}`}>
                  <div className={`${styles.flip} ${styles.flip4}`}>
                    <div className={`${styles.flip} ${styles.flip5}`}>
                      <div className={`${styles.flip} ${styles.flip6}`}>
                        <div className={`${styles.flip} ${styles.flip7}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BayWindowRing({
  photos,
  onSelectPhoto,
}: {
  photos: GalleryPhoto[]
  onSelectPhoto: (index: number) => void
}) {
  const [rotationY, setRotationY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const startXRef = useRef(0)
  const currentRotationRef = useRef(0)
  const dragDistanceRef = useRef(0)

  const count = photos.length
  const stepAngle = 360 / count

  useEffect(() => {
    if (!autoRotate || isDragging) return
    let rafId: number
    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      setRotationY((prev) => {
        const next = prev - dt * 0.008
        currentRotationRef.current = next
        return next
      })
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [autoRotate, isDragging])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    startXRef.current = e.clientX
    dragDistanceRef.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const deltaX = e.clientX - startXRef.current
    dragDistanceRef.current += Math.abs(deltaX)
    startXRef.current = e.clientX
    setRotationY((prev) => {
      const next = prev + deltaX * 0.35
      currentRotationRef.current = next
      return next
    })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const rotateByStep = (direction: 1 | -1) => {
    setAutoRotate(false)
    setRotationY((prev) => {
      const next = Math.round((prev + direction * stepAngle) / stepAngle) * stepAngle
      currentRotationRef.current = next
      return next
    })
  }

  return (
    <div className="relative select-none">
      {/* Controls bar */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => rotateByStep(1)}
            className="inline-flex h-8 w-8 items-center justify-center border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
            aria-label="Rotate left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className="inline-flex items-center gap-1.5 h-8 px-3 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[10px] font-mono uppercase tracking-widest text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
          >
            {autoRotate ? <Pause size={11} /> : <Play size={11} />}
            <span>{autoRotate ? 'Pause Orbit' : 'Auto Orbit'}</span>
          </button>
          <button
            type="button"
            onClick={() => rotateByStep(-1)}
            className="inline-flex h-8 w-8 items-center justify-center border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
            aria-label="Rotate right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 3D Ring Viewport */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative w-full h-[380px] sm:h-[440px] bg-[var(--ed-bg)] border border-[var(--ed-border)] overflow-hidden flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        style={{ perspective: '1100px' }}
      >
        <div
          className="relative w-[200px] sm:w-[240px] h-[270px] sm:h-[320px] transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-340px) rotateY(${rotationY}deg)`,
          }}
        >
          {photos.map((photo, i) => {
            const angle = i * stepAngle
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i
            return (
              <div
                key={photo.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  if (dragDistanceRef.current < 8) {
                    onSelectPhoto(i)
                  }
                }}
                className="absolute inset-0 border border-white/20 bg-neutral-900 overflow-hidden shadow-xl transition-opacity duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(380px)`,
                  opacity: isDimmed ? 0.45 : 1,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="260px"
                  className="object-cover pointer-events-none"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] font-mono text-orange-400">
                      {photo.id}
                    </span>
                    <span className="block text-xs font-display font-bold leading-tight">
                      {photo.title}
                    </span>
                  </div>
                  <Maximize2 size={12} className="text-white/80 shrink-0" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [bookMode, setBookMode] = useState<'portraits' | 'projects'>('portraits')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
        )
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: `${siteConfig.url}/gallery`,
      },
    ],
  }

  const activePhoto =
    lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null

  return (
    <main className="min-h-screen editorial-section overflow-x-hidden transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />

      <div className="editorial-container pt-28 pb-24 space-y-20">
        <div>
          {/* Accessible Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-orange-500 font-semibold">
                Gallery
              </li>
            </ol>
          </nav>

          <EditorialSectionHeader
            index="EXHIBITION"
            label="Visual Archive & Kinetic Studies"
            title="Photography, 3D studies &"
            accentWord="visual ideas."
            subtitle="An interactive exhibition combining personal portrait photography with pure CSS 3D kinetic experiments and spatial galleries."
            headingLevel="h1"
            rightContent={
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors"
              >
                <span>All 23 Projects</span>
                <ArrowUpRight size={14} />
              </Link>
            }
          />
        </div>

        {/* Photography Grid */}
        <section aria-label="Photography Gallery" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.map((photo, index) => (
              <EditorialReveal key={photo.id} delay={(index % 3) * 0.06}>
                <figure
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer border border-[var(--ed-border)] bg-[var(--ed-surface)] p-3 hover:border-orange-500 transition-colors"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 h-8 w-8 bg-black/65 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={13} />
                    </div>
                  </div>
                  <figcaption className="pt-3 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm font-bold text-[var(--ed-text)] group-hover:text-orange-500 transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-[var(--ed-muted)]">
                        {photo.caption}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </EditorialReveal>
            ))}
          </div>
        </section>

        {/* Interactive 3D Bay-Window Ring Carousel */}
        <EditorialReveal>
          <div className="border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] p-4 sm:p-8">
            <BayWindowRing
              photos={GALLERY_PHOTOS}
              onSelectPhoto={(index) => setLightboxIndex(index)}
            />
          </div>
        </EditorialReveal>

        {/* Pure CSS 3D Book */}
        <EditorialReveal>
          <div className="border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] p-4 sm:p-8">
            <div className="flex items-center justify-end mb-4">
              <div className="inline-flex border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] p-0.5">
                <button
                  type="button"
                  onClick={() => setBookMode('portraits')}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${bookMode === 'portraits'
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                    }`}
                >
                  Portrait Folio
                </button>
                <button
                  type="button"
                  onClick={() => setBookMode('projects')}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${bookMode === 'projects'
                      ? 'bg-orange-500 text-white font-semibold'
                      : 'text-[var(--ed-muted)] hover:text-[var(--ed-text)]'
                    }`}
                >
                  Project Folio
                </button>
              </div>
            </div>

            <div className="relative py-10 px-4 bg-[var(--ed-bg)] border border-[var(--ed-border)] min-h-[420px] sm:min-h-[540px] flex items-center justify-center overflow-hidden">
              <BookFlip mode={bookMode} />
            </div>
          </div>
        </EditorialReveal>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-mono text-xs uppercase tracking-widest">
              <span className="text-orange-400 font-semibold">
                {activePhoto.id} / 09
              </span>
              <span className="mx-2 text-white/30">—</span>
              <span>{activePhoto.title}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-white/10 text-white hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>

          {/* Center Image Stage */}
          <div
            className="relative flex-1 my-4 max-w-5xl w-full mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + GALLERY_PHOTOS.length) %
                  GALLERY_PHOTOS.length
                )
              }
              className="absolute left-0 sm:left-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative w-full h-[68vh] sm:h-[75vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                sizes="90vw"
                quality={80}
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length)
              }
              className="absolute right-0 sm:right-4 z-20 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white hover:border-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Bottom Caption & Thumbnails */}
          <div
            className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-display text-sm font-bold">{activePhoto.title}</p>
              <p className="text-xs text-neutral-400">{activePhoto.caption}</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              {GALLERY_PHOTOS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative h-12 w-10 overflow-hidden border transition-all cursor-pointer shrink-0 ${idx === lightboxIndex
                      ? 'border-orange-500 scale-105'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
