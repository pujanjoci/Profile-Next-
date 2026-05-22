'use client'

import About from '../components/About'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white">
      <Header />
      <div className="pt-20">
        <About
          name="Pujan"
          bio="I am a developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          profileImage="/Pujan(ghandruk-sitting)-profile.webp"
        />
      </div>
      <Footer />
    </main>
  )
}
