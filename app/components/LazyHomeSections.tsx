'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionSkeleton } from './PageSkeleton'

const About = dynamic(() => import('./About'), {
  ssr: false,
  loading: () => <SectionSkeleton variant="about" minHeight="780px" />,
})
const Projects = dynamic(() => import('./Projects'), {
  ssr: false,
  loading: () => <SectionSkeleton variant="projects" minHeight="920px" />,
})
const Contact = dynamic(() => import('./Contact'), {
  ssr: false,
  loading: () => <SectionSkeleton variant="contact" minHeight="820px" />,
})
const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
  loading: () => <SectionSkeleton variant="footer" minHeight="340px" />,
})

function LazyMount({
  id,
  minHeight,
  skeleton,
  children,
}: {
  id?: string
  minHeight: string
  skeleton: 'about' | 'projects' | 'contact' | 'footer'
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

  return <SectionSkeleton anchorRef={anchorRef} id={id} variant={skeleton} minHeight={minHeight} />
}

export default function LazyHomeSections() {
  return (
    <>
      <LazyMount id="about" minHeight="780px" skeleton="about">
        <About
          id="about"
          name="Pujan"
          bio="I'm a passionate full-stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me hiking, reading sci-fi, or experimenting with new technologies."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          profileImage="/Pujan(ghandruk-sitting)-profile.webp"
        />
      </LazyMount>

      <LazyMount id="projects" minHeight="920px" skeleton="projects">
        <Projects id="projects" />
      </LazyMount>

      <LazyMount id="contact" minHeight="820px" skeleton="contact">
        <Contact id="contact" />
      </LazyMount>

      <LazyMount minHeight="340px" skeleton="footer">
        <Footer />
      </LazyMount>
    </>
  )
}
