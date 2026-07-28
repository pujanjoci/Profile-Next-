'use client'

import { useEffect, useRef } from 'react'

export interface FooterRevealConfig {
  /** Inertia linear interpolation factor (0.01 - 0.2). Default: 0.08 */
  lerpFactor?: number
  /** 3D Perspective in px. Default: 1400 */
  perspectivePx?: number
  /** Minimum scale factor for main content (0.95 - 0.99). Default: 0.985 */
  mainScaleMin?: number
  /** Max upward Y offset for main content in px. Default: -15 */
  mainYMax?: number
  /** Initial downward Y offset for footer content in px. Default: 80 */
  footerYStartPx?: number
  /** Background layer parallax speed factor. Default: 0.25 */
  bgParallaxFactor?: number
  /** Decorative layer parallax speed factor. Default: 0.5 */
  decorativeParallaxFactor?: number
  /** Content layer parallax speed factor. Default: 0.85 */
  contentParallaxFactor?: number
  /** Max delayed offset for foreground CTA buttons in px. Default: 8 */
  foregroundDelayPx?: number
}

export interface FooterRevealRefs {
  containerRef: React.RefObject<HTMLDivElement | null>
  mainContentRef: React.RefObject<HTMLDivElement | null>
  footerRef: React.RefObject<HTMLDivElement | null>
  bgRef?: React.RefObject<HTMLDivElement | null>
  gradientRef?: React.RefObject<HTMLDivElement | null>
  contentRef?: React.RefObject<HTMLDivElement | null>
  foregroundRef?: React.RefObject<HTMLDivElement | null>
}

export function useFooterReveal(
  refs: FooterRevealRefs,
  config: FooterRevealConfig = {}
) {
  const {
    lerpFactor = 0.08,
    perspectivePx = 1400,
    mainScaleMin = 0.985,
    mainYMax = -15,
    footerYStartPx = 80,
    bgParallaxFactor = 0.25,
    decorativeParallaxFactor = 0.5,
    contentParallaxFactor = 0.85,
    foregroundDelayPx = 8,
  } = config

  const animFrameId = useRef<number | null>(null)
  const isAnimating = useRef<boolean>(false)
  
  // Interpolation state stored strictly in refs to avoid React state re-renders
  const currentProgress = useRef<number>(0)
  const targetProgress = useRef<number>(0)

  useEffect(() => {
    const {
      containerRef,
      mainContentRef,
      footerRef,
      bgRef,
      gradientRef,
      contentRef,
      foregroundRef,
    } = refs

    if (!containerRef.current || !mainContentRef.current || !footerRef.current) {
      return
    }

    // Check prefers-reduced-motion user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = mediaQuery.matches

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches
      if (isReducedMotion) {
        resetStyles()
      }
    }

    mediaQuery.addEventListener('change', handleMotionPreferenceChange)

    // Set initial static styles
    containerRef.current.style.perspective = `${perspectivePx}px`

    function resetStyles() {
      if (mainContentRef.current) {
        mainContentRef.current.style.transform = 'none'
        mainContentRef.current.style.willChange = 'auto'
      }
      if (footerRef.current) {
        footerRef.current.style.transform = 'none'
        footerRef.current.style.opacity = '1'
        footerRef.current.style.willChange = 'auto'
      }
      if (bgRef?.current) bgRef.current.style.transform = 'none'
      if (gradientRef?.current) gradientRef.current.style.transform = 'none'
      if (contentRef?.current) contentRef.current.style.transform = 'none'
      if (foregroundRef?.current) foregroundRef.current.style.transform = 'none'
    }

    function setWillChange(active: boolean) {
      const willChangeVal = active ? 'transform, opacity' : 'auto'
      if (mainContentRef.current) mainContentRef.current.style.willChange = active ? 'transform' : 'auto'
      if (footerRef.current) footerRef.current.style.willChange = willChangeVal
      if (bgRef?.current) bgRef.current.style.willChange = active ? 'transform' : 'auto'
      if (gradientRef?.current) gradientRef.current.style.willChange = active ? 'transform' : 'auto'
      if (contentRef?.current) contentRef.current.style.willChange = active ? 'transform' : 'auto'
      if (foregroundRef?.current) foregroundRef.current.style.willChange = active ? 'transform' : 'auto'
    }

    // Single-frame read & write update loop
    function updateAnimation() {
      if (isReducedMotion) return

      // --- 1. BATCH DOM READS FIRST ---
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const triggerDistance = windowHeight * 0.9

      // Progress calculation bounded strictly between 0 and 1
      const totalScrollable = rect.height - windowHeight
      if (totalScrollable <= 0) {
        targetProgress.current = 1
      } else {
        const scrolled = windowHeight - rect.top
        const rawProgress = scrolled / (rect.height * 0.75)
        targetProgress.current = Math.max(0, Math.min(1, rawProgress))
      }

      // Linear interpolation (lerp) for smooth inertia
      const delta = targetProgress.current - currentProgress.current
      currentProgress.current += delta * lerpFactor

      // Snap if delta is imperceptible to prevent continuous rAF execution
      if (Math.abs(delta) < 0.0001) {
        currentProgress.current = targetProgress.current
      }

      const p = currentProgress.current

      // --- 2. BATCH DOM WRITES ---
      // A. Main Content Section (Scale down slightly to 0.985, move up, add slight depth opacity)
      if (mainContentRef.current) {
        const scale = 1 - (1 - mainScaleMin) * p
        const mainY = mainYMax * p
        mainContentRef.current.style.transform = `translate3d(0px, ${mainY.toFixed(3)}px, 0px) scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`
      }

      // B. Footer Container Reveal (Fade in opacity 0.2 -> 1, translate3d Z depth)
      if (footerRef.current) {
        const opacity = Math.min(1, 0.25 + p * 0.75)
        footerRef.current.style.opacity = opacity.toFixed(3)
      }

      // C. Layer 1: Background Watermark Layer (Slow parallax displacement)
      if (bgRef?.current) {
        const bgY = (1 - p) * (footerYStartPx * bgParallaxFactor)
        bgRef.current.style.transform = `translate3d(0px, ${bgY.toFixed(3)}px, 0px)`
      }

      // D. Layer 2: Decorative Glow Mesh Layer (Medium parallax displacement)
      if (gradientRef?.current) {
        const gradY = (1 - p) * (footerYStartPx * decorativeParallaxFactor)
        gradientRef.current.style.transform = `translate3d(0px, ${gradY.toFixed(3)}px, 0px)`
      }

      // E. Layer 3: Content Sitemap Grid (Natural parallax displacement)
      if (contentRef?.current) {
        const contentY = (1 - p) * (footerYStartPx * contentParallaxFactor)
        contentRef.current.style.transform = `translate3d(0px, ${contentY.toFixed(3)}px, 0px)`
      }

      // F. Layer 4: Foreground Social & CTA Buttons (Delayed subtle displacement)
      if (foregroundRef?.current) {
        const fgY = (1 - p) * foregroundDelayPx
        foregroundRef.current.style.transform = `translate3d(0px, ${fgY.toFixed(3)}px, 0px)`
      }

      // Continue rAF loop if still animating toward target
      if (Math.abs(targetProgress.current - currentProgress.current) > 0.0001 || rect.bottom > 0 && rect.top < windowHeight) {
        animFrameId.current = requestAnimationFrame(updateAnimation)
      } else {
        isAnimating.current = false
        setWillChange(false)
      }
    }

    function onScrollOrResize() {
      if (isReducedMotion) return
      if (!isAnimating.current) {
        isAnimating.current = true
        setWillChange(true)
        animFrameId.current = requestAnimationFrame(updateAnimation)
      }
    }

    // Trigger initial frame calculation
    onScrollOrResize()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current)
      }
      resetStyles()
    }
  }, [
    refs,
    lerpFactor,
    perspectivePx,
    mainScaleMin,
    mainYMax,
    footerYStartPx,
    bgParallaxFactor,
    decorativeParallaxFactor,
    contentParallaxFactor,
    foregroundDelayPx,
  ])

  return {
    isAnimating: isAnimating.current,
  }
}
