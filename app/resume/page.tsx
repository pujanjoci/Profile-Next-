'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Download, Code2, ArrowLeft, Mail, Globe, Sparkles, Phone, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function ResumePage() {
  const skills = {
    "Professional": ['React', 'PHP', 'Version Control/Git', 'Canva', 'Figma Management', 'HTML/CSS', 'JavaScript', 'Photoshop', 'Database (MySQL)'],
    "Personal": ['Communication Skills', 'Management Skills', 'Time Management', 'Critical Thinking', 'Recording Skills', 'Team Work', 'Creativity']
  }

  const projects = [
    {
      title: 'Windows 11 Simulation',
      role: 'Frontend Developer & UI Designer',
      description: 'Built a high-fidelity interactive browser-based Windows 11 simulation using React, Framer Motion, and Zustand, demonstrating advanced state management and layout handling.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      liveUrl: 'https://window.pujan-joshi.com.np/',
      repoUrl: 'https://github.com/pujanjoci/windows'
    },
    {
      title: 'Modern E-Commerce Storefront',
      role: 'Full-Stack Developer',
      description: 'Developed a high-performance custom e-commerce web platform integrating a dynamic cart system, checkout integrations with Stripe API, catalog searches, and PostgreSQL database connections via Prisma.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'Prisma', 'PostgreSQL'],
      liveUrl: 'https://e-commerce-phi-rust-72.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/E-Commerce'
    },
    {
      title: 'Imposter Game',
      role: 'Game Developer & UI Designer',
      description: 'Implemented a suspenseful real-time multiplayer social deduction web game with Socket.io for low-latency state synchronization across client sessions.',
      tech: ['Next.js', 'React', 'Socket.io', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://imposter-game-ten-kappa.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/imposter-game'
    },
    {
      title: 'Retro CLI Terminal',
      role: 'Frontend Engineer',
      description: 'Developed an interactive retro developer portfolio navigating directories, loading easter eggs, and launching processes via terminal keyboard command inputs.',
      tech: ['React', 'Tailwind CSS', 'CSS Scanlines', 'JavaScript'],
      liveUrl: 'https://terminal.pujan-joshi.com.np/',
      repoUrl: 'https://github.com/pujanjoci/Resume'
    }
  ]

  const experiences = [
    {
      role: 'WEB and Graphic Designer',
      company: 'Professional Edge Global',
      period: 'May - November (2025)',
      details: [
        'Developed and maintained company websites, including for the main business and its sister company.',
        'Designed engaging graphics for social media platforms to support marketing campaigns.',
        'Managed all IT operations, serving as the sole point of contact for technical support and system maintenance.'
      ]
    },
    {
      role: 'Graphic Designer & Motion Graphic Designer (Intern)',
      company: 'Chainge Digital',
      period: 'Nov 2024 - Feb 2025',
      details: [
        'Created graphics and promotional materials for digital campaigns, social media posts, and website content.',
        'Edited and produced engaging video content for online platforms, ensuring visual quality and alignment with the brand\'s messaging.',
        'Worked collaboratively with the creative team to develop innovative designs that effectively communicated the brand’s identity.',
        'Gained hands-on experience in design tools such as Adobe Photoshop, Illustrator, Premiere Pro, and After Effects.'
      ]
    },
    {
      role: 'Web Designer (Internship)',
      company: 'Bisava Technology',
      period: 'July - Sep (2024)',
      details: [
        'Designed framework for the website layout and developed brand guidelines to maintain the consistency in colours, fonts, and style across the website.'
      ]
    }
  ]

  const education = [
    {
      degree: 'Bachelors in Information Management',
      institution: 'Nepal Commerce Campus',
      details: 'Studied a Bachelor’s degree focused on Information Technology, Database Management, Systems Analysis, and Software Development.'
    },
    {
      degree: '+2 Computer Major',
      institution: 'VS Niketan School',
      details: 'Focused on Computer Science, including subjects such as Programming, Computer Networks, Database Management, and Web Development.'
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white transition-colors duration-300 print:bg-white print:text-black">
      {/* Header hidden on print */}
      <div className="print:hidden">
        <Header />
      </div>

      {/* Hero section */}
      <section className="relative pt-36 pb-12 px-6 text-center overflow-hidden print:hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/10 blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-[0.2em] mb-6 group cursor-pointer"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Resume / CV
          </h1>
          <div className="mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 mb-6" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Pujan Joshi — Web Designer & Developer from Nepal. View my professional background or download the printable PDF version.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/resume/Resume_Pujan-Joshi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-black font-bold rounded-full shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer text-sm gap-2"
            >
              <Download size={16} />
              Download PDF Resume
            </a>
          </div>
        </div>
      </section>

      {/* Main Resume Sheet */}
      <section className="py-8 px-6 sm:px-12 max-w-4xl mx-auto relative z-10 print:py-0 print:px-0">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-12 dark:border-white/10 dark:bg-neutral-900 shadow-xl print:shadow-none print:border-none print:p-0 print:dark:bg-white">
          
          {/* Resume Header */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:border-slate-300">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 dark:text-white print:text-black">
                Pujan Joshi
              </h2>
              <p className="text-lg font-bold text-orange-500 dark:text-orange-400 mt-1.5 uppercase tracking-wider print:text-orange-600">
                Web Designer & Developer
              </p>
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-400 print:text-slate-800">
              <a href="mailto:pujanjoci01@gmail.com" className="flex items-center gap-2 hover:text-orange-500 dark:hover:text-white print:hover:text-black">
                <Mail size={16} className="text-orange-500 print:text-orange-600" />
                <span>pujanjoci01@gmail.com</span>
              </a>
              <a href="tel:+9779860928584" className="flex items-center gap-2 hover:text-orange-500 dark:hover:text-white print:hover:text-black">
                <Phone size={16} className="text-orange-500 print:text-orange-600" />
                <span>+977 9860928584</span>
              </a>
              <a href="https://www.pujan-joshi.com.np" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 dark:hover:text-white print:hover:text-black">
                <Globe size={16} className="text-orange-500 print:text-orange-600" />
                <span>www.pujan-joshi.com.np</span>
              </a>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-orange-500 print:text-orange-600" />
                <span>Bhaktapur, Katunje, Nepal</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 print:text-slate-500">
              Professional Summary
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed print:text-slate-800">
              Highly skilled and result-driven Web Designer and Developer from Nepal with over 5 years of coding experience. I specialize in building modern, performance-optimized, and search-ranking-friendly web platforms using React, Next.js, and Tailwind CSS. Passionate about structuring clean semantic systems, implementing high-fidelity visual layouts, and creating unique interactive client experiences.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 print:text-slate-500">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 print:text-black">
                    <Code2 size={16} className="text-orange-500 print:text-orange-600" />
                    <span>{category}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 print:border-slate-300 print:bg-white print:text-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 print:text-slate-500">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="text-base font-bold text-slate-950 dark:text-white print:text-black">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wider print:text-orange-600">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-slate-50 border border-slate-250/50 rounded-full text-xs font-semibold text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 print:border-slate-300 print:text-slate-800">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-650 dark:text-slate-300 leading-relaxed print:text-slate-800 list-disc pl-5">
                    {exp.details.map((item, dIdx) => (
                      <li key={dIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 print:text-slate-500">
              Selected Creations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <div key={index} className="border border-slate-200 rounded-2xl p-5 dark:border-white/5 dark:bg-white/[0.01] print:border-slate-300 print:bg-white">
                  <h4 className="text-base font-bold text-slate-950 dark:text-white print:text-black">
                    {proj.title}
                  </h4>
                  <p className="text-xs font-bold text-orange-500 dark:text-orange-400 mb-3 uppercase tracking-wider print:text-orange-600">
                    {proj.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed mb-4 print:text-slate-800">
                    {proj.description}
                  </p>
                  
                  {/* Action Links */}
                  <div className="flex items-center gap-4 mb-4 print:hidden text-xs">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                      >
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Live Demo
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group cursor-pointer"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 border border-slate-200 rounded-md text-[10px] font-medium text-slate-500 dark:border-white/5 dark:bg-white/5 dark:text-slate-400 print:border-slate-300 print:text-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="pt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6 print:text-slate-500">
              Education History
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white print:text-black">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wider print:text-orange-600">
                      {edu.institution}
                    </p>
                  </div>
                  <p className="text-sm text-slate-655 dark:text-slate-400 leading-relaxed print:text-slate-800">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer hidden on print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}
