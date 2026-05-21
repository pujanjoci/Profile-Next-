'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const About = dynamic(() => import('./About'), {
  ssr: false,
  loading: () => <SectionFallback minHeight="780px" dark />,
})
const Projects = dynamic(() => import('./Projects'), {
  ssr: false,
  loading: () => <SectionFallback minHeight="920px" dark />,
})
const Contact = dynamic(() => import('./Contact'), {
  ssr: false,
  loading: () => <SectionFallback minHeight="820px" dark />,
})
const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
  loading: () => <SectionFallback minHeight="340px" dark />,
})

function SectionFallback({
  dark = false,
  minHeight,
}: {
  dark?: boolean
  minHeight: string
}) {
  return (
    <div
      aria-hidden="true"
      className={dark ? 'bg-neutral-950' : 'bg-neutral-900'}
      style={{ minHeight }}
    />
  )
}

function LazyMount({
  id,
  minHeight,
  dark,
  children,
}: {
  id?: string
  minHeight: string
  dark?: boolean
  children: ReactNode
}) {
  const [shouldRender, setShouldRender] = useState(false)
  const anchorRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (shouldRender) return

    const anchor = anchorRef.current
    if (!anchor) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(anchor)
    return () => observer.disconnect()
  }, [shouldRender])

  if (shouldRender) return children

  return (
    <section id={id} ref={anchorRef} style={{ minHeight }}>
      <SectionFallback minHeight={minHeight} dark={dark} />
    </section>
  )
}

export default function LazyHomeSections() {
  return (
    <>
      <LazyMount id="about" minHeight="780px" dark>
        <About
          id="about"
          name="Pujan"
          bio="I'm a passionate full-stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me hiking, reading sci-fi, or experimenting with new technologies."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          profileImage="/Pujan(ghandruk-sitting)-profile.webp"
        />
      </LazyMount>

      <LazyMount id="projects" minHeight="920px" dark>
        <Projects id="projects" />
      </LazyMount>

      <LazyMount id="contact" minHeight="820px" dark>
        <Contact id="contact" />
      </LazyMount>

      <LazyMount minHeight="340px" dark>
        <Footer />
      </LazyMount>
    </>
  )
}
