'use client'

import dynamic from 'next/dynamic'
import About from './About'

const Projects = dynamic(() => import('./Projects'), {
  ssr: true,
})

const ServicesSection = dynamic(() => import('./ServicesSection'), {
  ssr: true,
})

const PortfolioExperiences = dynamic(() => import('./PortfolioExperiences'), {
  ssr: true,
})

const Testimonials = dynamic(() => import('./Testimonials'), {
  ssr: true,
})

const DepthFooterWrapper = dynamic(() => import('./DepthFooterWrapper'), {
  ssr: true,
})

export default function LazyHomeSections() {
  return (
    <>
      <About
        id="about"
        name="Pujan"
        bio="I am a developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."
        skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
      />

      <Projects id="projects" />

      <ServicesSection id="services" />

      <PortfolioExperiences id="experiences" />

      <Testimonials id="testimonials" />

      <DepthFooterWrapper contactId="contact" />
    </>
  )
}
