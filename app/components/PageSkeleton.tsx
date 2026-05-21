import type { Ref } from 'react'
import Header from './Header'

type SkeletonVariant = 'home' | 'about' | 'projects' | 'contact' | 'gallery'
type SectionVariant = 'about' | 'projects' | 'contact' | 'footer' | 'gallery'

function SkeletonBox({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10 ${className}`}
    />
  )
}

function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-full bg-slate-200/80 dark:bg-white/10 ${className}`}
    />
  )
}

function SectionHeadingSkeleton() {
  return (
    <div className="mx-auto mb-12 flex max-w-xl flex-col items-center gap-4 text-center">
      <SkeletonLine className="h-4 w-32 bg-orange-200/80 dark:bg-orange-500/20" />
      <SkeletonLine className="h-10 w-64 sm:h-12" />
      <SkeletonLine className="h-1 w-24 bg-orange-300/80 dark:bg-orange-500/30" />
      <SkeletonLine className="h-4 w-full max-w-md" />
      <SkeletonLine className="h-4 w-4/5 max-w-sm" />
    </div>
  )
}

function HeroSkeleton() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white pt-[15vh] dark:bg-neutral-950 md:block md:pt-0">
      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center md:absolute md:left-0 md:right-0 md:top-[22%]">
        <SkeletonLine className="mb-6 h-10 w-28 rounded-full" />
        <SkeletonLine className="mb-4 h-14 w-[min(88vw,620px)] sm:h-20" />
        <SkeletonLine className="h-12 w-[min(78vw,520px)] sm:h-16" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex w-full justify-center overflow-visible">
        <div className="relative flex h-[80vh] max-h-[900px] w-full items-end justify-center md:h-[65vh] lg:h-[75vh]">
          <div className="absolute bottom-0 left-1/2 aspect-square w-[180%] -translate-x-1/2 translate-y-1/3 rounded-full bg-orange-100/80 blur-xl dark:bg-orange-900/20 md:w-[900px] md:blur-0" />
          <SkeletonBox className="relative z-10 h-[72vh] max-h-[760px] w-[min(118vw,650px)] rounded-t-[44%] rounded-b-none bg-slate-200/90 dark:bg-white/10" />
          <div className="absolute bottom-8 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-white/40 p-1 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/30">
            <SkeletonLine className="h-10 w-28 rounded-full bg-orange-200/90 dark:bg-orange-500/25" />
            <SkeletonLine className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSkeleton() {
  return (
    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="order-2 flex w-full max-w-md flex-col items-center gap-8 lg:order-1 lg:w-5/12">
          <SkeletonBox className="h-64 w-64 rounded-[2.5rem] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96" />
          <div className="grid w-full grid-cols-3 gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/40 dark:border-white/5 dark:bg-neutral-900/30 dark:shadow-none">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <SkeletonLine className="h-8 w-12 bg-orange-200/80 dark:bg-orange-500/20" />
                <SkeletonLine className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex w-full flex-col items-center gap-6 text-center lg:order-2 lg:w-7/12 lg:items-start lg:text-left">
          <SkeletonLine className="h-8 w-32 rounded-full bg-orange-200/80 dark:bg-orange-500/20" />
          <SkeletonLine className="h-12 w-full max-w-lg" />
          <div className="w-full max-w-2xl space-y-3">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-11/12" />
            <SkeletonLine className="h-4 w-4/5" />
            <SkeletonLine className="h-4 w-10/12" />
          </div>
          <SkeletonLine className="h-1 w-20 bg-orange-300/80 dark:bg-orange-500/30" />
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-white/5 dark:bg-neutral-900/30">
                <SkeletonLine className="mb-5 h-5 w-28" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((__, tagIndex) => (
                    <SkeletonLine key={tagIndex} className="h-7 w-16 rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeadingSkeleton />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="order-last flex min-h-[480px] flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-neutral-950 dark:shadow-none lg:order-first lg:col-span-5">
          <div className="flex justify-between">
            <SkeletonLine className="h-4 w-36" />
            <SkeletonLine className="h-4 w-12" />
          </div>
          <div className="space-y-4 py-10">
            <SkeletonLine className="h-10 w-4/5 bg-orange-200/80 dark:bg-orange-500/20" />
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-11/12" />
            <div className="flex flex-wrap gap-2 pt-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLine key={index} className="h-7 w-20" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <SkeletonLine className="h-1 w-full" />
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonBox key={index} className="h-10 w-10 rounded-full" />
                ))}
              </div>
              <div className="flex gap-2">
                <SkeletonLine className="h-10 w-24 rounded-full" />
                <SkeletonLine className="h-10 w-28 rounded-full bg-orange-200/80 dark:bg-orange-500/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="order-first flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-neutral-950 dark:shadow-none lg:order-last lg:col-span-7">
          <div className="relative flex h-80 w-80 items-center justify-center">
            <SkeletonBox className="absolute h-64 w-44 rotate-[-12deg] rounded-[1.5rem]" />
            <SkeletonBox className="absolute h-72 w-48 rounded-[1.5rem] bg-orange-200/80 dark:bg-orange-500/20" />
            <SkeletonBox className="absolute h-64 w-44 rotate-[12deg] rounded-[1.5rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSkeleton() {
  return (
    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeadingSkeleton />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-white/4 dark:shadow-none">
            <SkeletonLine className="mb-6 h-6 w-44" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 rounded-xl p-3">
                  <SkeletonBox className="h-11 w-11 rounded-lg bg-orange-200/80 dark:bg-orange-500/20" />
                  <div className="flex-1 space-y-2">
                    <SkeletonLine className="h-3 w-20" />
                    <SkeletonLine className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SkeletonBox className="h-24 rounded-2xl" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-7 shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-white/4 dark:shadow-none sm:p-9 lg:col-span-3">
          <SkeletonLine className="mb-6 h-7 w-44" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SkeletonBox className="h-24 rounded-xl" />
            <SkeletonBox className="h-24 rounded-xl" />
          </div>
          <SkeletonBox className="mt-5 h-24 rounded-xl" />
          <SkeletonBox className="mt-5 h-44 rounded-xl" />
          <SkeletonLine className="mt-5 h-12 w-full rounded-xl bg-orange-200/80 dark:bg-orange-500/20" />
        </div>
      </div>
    </div>
  )
}

function GallerySkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <SectionHeadingSkeleton />
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-200/50 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div className="flex min-h-[520px] items-center justify-center rounded-2xl bg-slate-100 dark:bg-neutral-900">
          <div className="relative h-80 w-64">
            <SkeletonBox className="absolute inset-0 rounded-lg bg-orange-200/80 dark:bg-orange-500/20" />
            <SkeletonBox className="absolute left-8 top-8 h-72 w-52 rotate-6 rounded-lg" />
            <SkeletonBox className="absolute left-16 top-14 h-64 w-48 rotate-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SectionSkeleton({
  anchorRef,
  id,
  variant,
  minHeight,
}: {
  anchorRef?: Ref<HTMLElement>
  id?: string
  variant: SectionVariant
  minHeight?: string
}) {
  const baseClass =
    'relative w-full overflow-hidden bg-slate-50 py-20 text-slate-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-white md:py-28'

  if (variant === 'footer') {
    return (
      <footer
        ref={anchorRef}
        aria-busy="true"
        className="border-t border-slate-200 bg-white py-10 dark:border-white/5 dark:bg-neutral-950"
        style={{ minHeight }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4">
          <SkeletonLine className="h-4 w-72" />
          <SkeletonLine className="h-3 w-48" />
        </div>
      </footer>
    )
  }

  return (
    <section ref={anchorRef} id={id} aria-busy="true" className={baseClass} style={{ minHeight }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>
      {variant === 'about' && <AboutSkeleton />}
      {variant === 'projects' && <ProjectsSkeleton />}
      {variant === 'contact' && <ContactSkeleton />}
      {variant === 'gallery' && <GallerySkeleton />}
    </section>
  )
}

export default function PageSkeleton({
  variant = 'home',
  showHeader = true,
}: {
  variant?: SkeletonVariant
  showHeader?: boolean
}) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white">
      {showHeader && <Header />}
      {variant === 'home' && (
        <>
          <HeroSkeleton />
          <SectionSkeleton id="about" variant="about" minHeight="780px" />
          <SectionSkeleton id="projects" variant="projects" minHeight="920px" />
          <SectionSkeleton id="contact" variant="contact" minHeight="820px" />
          <SectionSkeleton variant="footer" minHeight="220px" />
        </>
      )}
      {variant === 'about' && <SectionSkeleton variant="about" minHeight="100vh" />}
      {variant === 'projects' && <SectionSkeleton variant="projects" minHeight="100vh" />}
      {variant === 'contact' && <SectionSkeleton variant="contact" minHeight="100vh" />}
      {variant === 'gallery' && <SectionSkeleton variant="gallery" minHeight="100vh" />}
    </main>
  )
}
