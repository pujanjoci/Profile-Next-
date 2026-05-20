'use client'

import { useMemo, useRef, useState, useEffect, Suspense, Component } from 'react'
import type { MutableRefObject, ReactNode, ErrorInfo } from 'react'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { Environment, Image as DreiImage, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { easing } from 'maath'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

import { projects } from '../data/projects'
import type { Project } from '../data/projects'

type ProjectImageMaterial = THREE.ShaderMaterial & {
  radius: number
  zoom: number
  grayscale: number
  opacity: number
}

class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(bend = 0.16, width = 1, height = 1, widthSegments = 20, heightSegments = 20) {
    super(width, height, widthSegments, heightSegments)

    const halfWidth = width / 2
    const left = new THREE.Vector2(-halfWidth, 0)
    const top = new THREE.Vector2(0, bend)
    const right = new THREE.Vector2(halfWidth, 0)
    const leftToTop = new THREE.Vector2().subVectors(left, top)
    const topToRight = new THREE.Vector2().subVectors(top, right)
    const leftToRight = new THREE.Vector2().subVectors(left, right)
    const radius =
      (leftToTop.length() * topToRight.length() * leftToRight.length()) /
      (2 * Math.abs(leftToTop.cross(leftToRight)))
    const center = new THREE.Vector2(0, bend - radius)
    const baseAngle = new THREE.Vector2().subVectors(left, center).angle() - Math.PI / 2
    const arc = baseAngle * 2
    const uv = this.attributes.uv
    const position = this.attributes.position
    const point = new THREE.Vector2()

    for (let index = 0; index < uv.count; index += 1) {
      const uvX = 1 - uv.getX(index)
      const y = position.getY(index)

      point.copy(right).rotateAround(center, arc * uvX)
      position.setXYZ(index, point.x, y, -point.y)
    }

    position.needsUpdate = true
    this.computeVertexNormals()
  }
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("ThreeErrorBoundary caught an asset load error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function ProjectCardPlaceholder({
  angle,
  radius,
  active,
}: {
  angle: number
  radius: number
  active: boolean
}) {
  const geometry = useMemo(() => new BentPlaneGeometry(0.18, 1.08, 1.48, 32, 20), [])
  return (
    <mesh
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, Math.PI + angle, 0]}
      scale={active ? 1.1 : 0.88}
    >
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial
        color="#171717"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ProjectCardFallback({
  angle,
  project,
  radius,
  active,
  onSelect,
  index,
}: {
  angle: number
  project: Project
  radius: number
  active: boolean
  onSelect: (index: number) => void
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const geometry = useMemo(() => new BentPlaneGeometry(0.18, 1.08, 1.48, 32, 20), [])
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetScale = active ? (hovered ? 1.2 : 1.1) : (hovered ? 1.0 : 0.88)
    easing.damp3(meshRef.current.scale, targetScale, 0.2, delta)
  })

  return (
    <mesh
      ref={meshRef}
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, Math.PI + angle, 0]}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(index)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color={project.glowColor}
        roughness={0.4}
        metalness={0.6}
        side={THREE.DoubleSide}
        transparent
        opacity={active ? 0.95 : 0.4}
      />
    </mesh>
  )
}

function ProjectCardImage({
  angle,
  index,
  radius,
  active,
  onSelect,
  imageUrl,
}: {
  angle: number
  index: number
  radius: number
  active: boolean
  onSelect: (index: number) => void
  imageUrl: string
}) {
  const [hovered, setHovered] = useState(false)
  const geometry = useMemo(() => new BentPlaneGeometry(0.18, 1.08, 1.48, 32, 20), [])
  const internalMesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!internalMesh.current) return

    const material = internalMesh.current.material as ProjectImageMaterial
    
    // Scale up active card more, scale down inactive ones
    const targetScale = active ? (hovered ? 1.2 : 1.1) : (hovered ? 1.0 : 0.88)
    easing.damp3(internalMesh.current.scale, targetScale, 0.2, delta)
    
    // Radius (border rounding in DreiImage shader)
    const targetRadius = active ? (hovered ? 0.22 : 0.15) : 0.08
    easing.damp(material, 'radius', targetRadius, 0.2, delta)
    
    // Zoom effect
    const targetZoom = active ? (hovered ? 1.0 : 1.05) : 1.3
    easing.damp(material, 'zoom', targetZoom, 0.2, delta)
    
    // Grayscale: active is colorful, inactive is desaturated
    const targetGrayscale = active ? 0.0 : (hovered ? 0.2 : 0.8)
    easing.damp(material, 'grayscale', targetGrayscale, 0.2, delta)
    
    // Opacity: active is fully visible, inactive fades into the background
    const targetOpacity = active ? 1.0 : (hovered ? 0.7 : 0.35)
    easing.damp(material, 'opacity', targetOpacity, 0.2, delta)
  })

  const stopAndSelect = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(index)
  }

  return (
    <DreiImage
      ref={internalMesh}
      url={imageUrl}
      transparent
      toneMapped={false}
      side={THREE.DoubleSide}
      position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
      rotation={[0, Math.PI + angle, 0]}
      onClick={stopAndSelect}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      <primitive object={geometry} attach="geometry" />
    </DreiImage>
  )
}

function ProjectCard3D({
  angle,
  index,
  project,
  radius,
  active,
  onSelect,
}: {
  angle: number
  index: number
  project: Project
  radius: number
  active: boolean
  onSelect: (index: number) => void
}) {
  const [safeUrl, setSafeUrl] = useState<string | null>(null)

  useEffect(() => {
    let isCurrent = true
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.src = project.image
    img.onload = () => {
      if (isCurrent) setSafeUrl(project.image)
    }
    img.onerror = () => {
      if (isCurrent) {
        console.warn(`Failed to load image for project "${project.title}": ${project.image}`)
        setSafeUrl('fallback')
      }
    }
    return () => {
      isCurrent = false
    }
  }, [project.image, project.title])

  if (safeUrl === null) {
    return <ProjectCardPlaceholder angle={angle} radius={radius} active={active} />
  }

  if (safeUrl === 'fallback') {
    return (
      <ProjectCardFallback
        angle={angle}
        project={project}
        radius={radius}
        active={active}
        onSelect={onSelect}
        index={index}
      />
    )
  }

  return (
    <ProjectCardImage
      angle={angle}
      index={index}
      radius={radius}
      active={active}
      onSelect={onSelect}
      imageUrl={safeUrl}
    />
  )
}

function ProjectCarouselScene({
  activeIndex,
  rotationTargetRef,
  isDraggingRef,
  velocityRef,
  isHoveredRef,
  lastInteractionTimeRef,
  setActiveIndex,
}: {
  activeIndex: number
  rotationTargetRef: MutableRefObject<number>
  isDraggingRef: MutableRefObject<boolean>
  velocityRef: MutableRefObject<number>
  isHoveredRef: MutableRefObject<boolean>
  lastInteractionTimeRef: MutableRefObject<number>
  setActiveIndex: (index: number) => void
}) {
  const group = useRef<THREE.Group>(null)
  const cardRadius = 2.2
  const n = projects.length
  const angleStep = (Math.PI * 2) / n

  const handleSelect = (selectedIndex: number) => {
    const baseTarget = -selectedIndex * angleStep
    const diff = rotationTargetRef.current - baseTarget
    const k = Math.round(diff / (Math.PI * 2))
    rotationTargetRef.current = baseTarget + k * (Math.PI * 2)
    velocityRef.current = 0
    setActiveIndex(selectedIndex)
    lastInteractionTimeRef.current = Date.now()
  }

  useFrame((state, delta) => {
    if (!group.current) return

    if (isDraggingRef.current) {
      // While dragging, check what card is closest to front and update activeIndex in real-time
      const rawIndex = -rotationTargetRef.current / angleStep
      let closestIndex = Math.round(rawIndex) % n
      if (closestIndex < 0) closestIndex += n
      if (activeIndex !== closestIndex) {
        setActiveIndex(closestIndex)
      }
    } else {
      // 1. Friction / Inertia decay
      if (Math.abs(velocityRef.current) > 0.005) {
        rotationTargetRef.current += velocityRef.current * 15
        velocityRef.current *= 0.92 // Apply friction
        
        // Update active index in real-time as it spins
        const rawIndex = -rotationTargetRef.current / angleStep
        let closestIndex = Math.round(rawIndex) % n
        if (closestIndex < 0) closestIndex += n
        if (activeIndex !== closestIndex) {
          setActiveIndex(closestIndex)
        }
      } else {
        // 2. Snapping: if not dragging and velocity is low, snap to the activeIndex's target rotation
        const baseTarget = -activeIndex * angleStep
        const diff = rotationTargetRef.current - baseTarget
        const k = Math.round(diff / (Math.PI * 2))
        const targetRotation = baseTarget + k * (Math.PI * 2)
        rotationTargetRef.current = THREE.MathUtils.lerp(rotationTargetRef.current, targetRotation, 0.1)
      }
      
      // 3. Idle Auto-play: check if we should auto-advance
      const now = Date.now()
      if (now - lastInteractionTimeRef.current > 5000 && !isHoveredRef.current) {
        const nextIndex = (activeIndex + 1) % n
        setActiveIndex(nextIndex)
        rotationTargetRef.current -= angleStep
        lastInteractionTimeRef.current = now // Reset timer
      }
    }

    // Apply rotation target with damping to the actual group mesh
    easing.damp(group.current.rotation, 'y', rotationTargetRef.current, 0.28, delta)

    // Parallax camera effect based on mouse cursor pointer
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      -state.pointer.x * 0.4,
      4,
      delta,
    )
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.2 + state.pointer.y * 0.2,
      4,
      delta,
    )
    state.camera.lookAt(0, 0.1, 0)
  })

  const currentProject = projects[activeIndex]

  return (
    <>
      <fog attach="fog" args={['#0a0a0a', 6.5, 11]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} />
      
      {/* Spotlighting target has default direction pointing at center */}
      <spotLight
        position={[0, 3, 4]}
        angle={0.45}
        penumbra={1}
        intensity={2.5}
        color={currentProject.glowColor}
      />
      
      <group ref={group}>
        {projects.map((project, index) => (
          <ThreeErrorBoundary
            key={project.title}
            fallback={
              <ProjectCardFallback
                angle={index * angleStep}
                project={project}
                radius={cardRadius}
                active={index === activeIndex}
                onSelect={handleSelect}
                index={index}
              />
            }
          >
            <Suspense
              fallback={
                <ProjectCardPlaceholder
                  angle={index * angleStep}
                  radius={cardRadius}
                  active={index === activeIndex}
                />
              }
            >
              <ProjectCard3D
                angle={index * angleStep}
                index={index}
                project={project}
                radius={cardRadius}
                active={index === activeIndex}
                onSelect={handleSelect}
              />
            </Suspense>
          </ThreeErrorBoundary>
        ))}
      </group>

      {/* Flat Glowing Guide Pedestal Ring under the cards */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[cardRadius, cardRadius, 0.015, 64, 1, true]} />
        <meshBasicMaterial
          color={currentProject.glowColor}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft Contact Shadows below the floating cards */}
      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.65}
        scale={6}
        blur={2}
        far={1.5}
      />
      
      <Environment preset="dawn" />
    </>
  )
}

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const rotationTargetRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastX = useRef(0)
  const lastTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const isHoveredRef = useRef(false)
  const lastInteractionTimeRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastInteractionTimeRef.current = Date.now()
  }, [])

  const selectedProject = projects[activeIndex]
  const angleStep = (Math.PI * 2) / projects.length

  const selectProject = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + projects.length) % projects.length
    const baseTarget = -normalizedIndex * angleStep
    const diff = rotationTargetRef.current - baseTarget
    const k = Math.round(diff / (Math.PI * 2))
    
    rotationTargetRef.current = baseTarget + k * (Math.PI * 2)
    velocityRef.current = 0
    lastInteractionTimeRef.current = Date.now()
    setActiveIndex(normalizedIndex)
  }

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl mx-auto"
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => { isHoveredRef.current = false }}
    >
      {/* Left Column: Project Details Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl relative overflow-hidden min-h-[480px] lg:order-first order-last">
        {/* Glow behind the active theme */}
        <div 
          className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-3xl opacity-20 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: selectedProject.glowColor }}
        />
        
        {/* Top Section: Pagination & Title */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Featured Project
          </span>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-sm font-bold text-white">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-500">/</span>
            <span className="text-xs text-slate-400 font-medium">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Middle Section: Text & Tech Stack with Framer Motion AnimatePresence */}
        <div className="relative z-10 my-auto py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              {/* Title */}
              <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className={`bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}>
                  {selectedProject.title}
                </span>
              </h3>
              
              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed sm:text-base">
                {selectedProject.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section: Interactive Controls, Links, Progress bar */}
        <div className="relative z-10 space-y-6">
          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full"
              style={{ 
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
                backgroundColor: selectedProject.glowColor
              }}
              layoutId="progressBar"
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Nav Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => selectProject(activeIndex - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Reset carousel"
                onClick={() => selectProject(0)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15 active:scale-95 cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => selectProject(activeIndex + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-2">
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white transition hover:bg-white/15 hover:border-white/20 active:scale-95 cursor-pointer"
              >
                <Github size={14} />
                Code
              </a>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold text-white transition shadow-lg active:scale-95 cursor-pointer"
                style={{ 
                  backgroundColor: selectedProject.glowColor,
                  boxShadow: `0 4px 14px ${selectedProject.glowColor}40`
                }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: 3D Scene Viewport */}
      <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-auto rounded-[2rem] border border-white/10 bg-neutral-950 overflow-hidden shadow-2xl group/canvas lg:order-last order-first min-h-[420px]">
        {/* Touch layer for dragging */}
        <div
          className="absolute inset-0 z-10 touch-pan-y cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => {
            isDraggingRef.current = true
            lastX.current = event.clientX
            lastTimeRef.current = performance.now()
            velocityRef.current = 0
            lastInteractionTimeRef.current = Date.now()
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (!isDraggingRef.current) return

            const now = performance.now()
            const dt = now - lastTimeRef.current
            const deltaX = event.clientX - lastX.current
            
            // Adjust sensitivity based on viewport width
            const width = containerRef.current?.clientWidth || 800
            const sensitivity = (Math.PI * 2.2) / width
            
            rotationTargetRef.current += deltaX * sensitivity
            
            if (dt > 0) {
              velocityRef.current = (deltaX * sensitivity) / dt // change in angle per ms
            }
            
            lastX.current = event.clientX
            lastTimeRef.current = now
            lastInteractionTimeRef.current = Date.now()
          }}
          onPointerUp={(event) => {
            isDraggingRef.current = false
            event.currentTarget.releasePointerCapture(event.pointerId)
            lastInteractionTimeRef.current = Date.now()
          }}
          onPointerCancel={() => {
            isDraggingRef.current = false
          }}
          onWheel={(event) => {
            const delta = event.deltaY * 0.0015
            rotationTargetRef.current += delta
            velocityRef.current = delta * 0.4
            lastInteractionTimeRef.current = Date.now()
          }}
        >
          {/* Info Badge */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-slate-400 font-semibold opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
            Drag to Rotate &bull; Scroll to Spin
          </div>
        </div>

        <Canvas camera={{ position: [0, 0.25, 6.2], fov: 42 }} dpr={[1, 1.5]}>
          <ProjectCarouselScene
            activeIndex={activeIndex}
            rotationTargetRef={rotationTargetRef}
            isDraggingRef={isDraggingRef}
            velocityRef={velocityRef}
            isHoveredRef={isHoveredRef}
            lastInteractionTimeRef={lastInteractionTimeRef}
            setActiveIndex={setActiveIndex}
          />
        </Canvas>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950 py-20 md:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange-500">
            My Work
          </span>
          <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
            Projects
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <ProjectCarousel />
        </motion.div>

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
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/10 active:scale-95 cursor-pointer"
          >
            <Github size={18} />
            View on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
