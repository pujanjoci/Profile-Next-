'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 

export default function Home() {
  return (
    <>
      <ScrollToTop /> 
      <Header />
      <main>
        <Hero />
        <About 
          name="Pujan"
          bio="I'm a passionate full‑stack developer with over 5 years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me hiking, reading sci‑fi, or experimenting with new technologies."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          profileImage="/Pujan(ghandruk-sitting).png"
        />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}