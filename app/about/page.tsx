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
          bio="I'm a passionate full-stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me hiking, reading sci-fi, or experimenting with new technologies."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          profileImage="/Pujan(ghandruk-sitting)-profile.webp"
        />
      </div>
      <Footer />
    </main>
  )
}
