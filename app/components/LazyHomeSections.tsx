'use client'

import About from './About'
import Projects from './Projects'
import ServicesSection from './ServicesSection'
import PortfolioExperiences from './PortfolioExperiences'
import Contact from './Contact'
import Footer from './Footer'

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

      <Contact id="contact" />

      <Footer />
    </>
  )
}

