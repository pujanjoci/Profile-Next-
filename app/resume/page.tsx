'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Download,
  Code2,
  ArrowLeft,
  Mail,
  Globe,
  Phone,
  Github,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Layers,
  CheckSquare
} from 'lucide-react'
import Link from 'next/link'

export default function ResumePage() {
  const skillCategories = [
    {
      title: 'Frontend Engineering',
      skills: ['React', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Framer Motion']
    },
    {
      title: 'Backend & Databases',
      skills: ['Node.js', 'Express', 'MySQL', 'PostgreSQL', 'Prisma ORM', 'Supabase', 'Socket.io', 'REST & JSON APIs']
    },
    {
      title: 'Design & Creative Tools',
      skills: ['Figma', 'UI/UX Design', 'Canva', 'Adobe Photoshop', 'Illustrator', 'Wireframing & Prototyping']
    },
    {
      title: 'Core Professional Competencies',
      skills: ['Technical Problem Solving', 'Project Management', 'Client Communication', 'SEO & Performance Optimization', 'Git Version Control']
    }
  ]

  const projects = [
    {
      title: 'Archio Designs',
      role: 'Full-Stack Developer & UI/UX Designer',
      description: 'Built a modern architectural and interior design showcase platform featuring high-resolution galleries, project case studies, and interactive design services.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
      liveUrl: 'https://archiodesigns.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/archiodesigns'
    },
    {
      title: 'Windows 11 Simulation',
      role: 'Frontend Engineer & Interface Architect',
      description: 'Interactive browser replication of Windows 11 featuring resizable windows, Start menu, apps, and Zustand desktop state management.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      liveUrl: 'https://window.pujan-joshi.com.np/',
      repoUrl: 'https://github.com/pujanjoci/windows'
    },
    {
      title: 'Modern E-Commerce Storefront',
      role: 'Full-Stack Developer',
      description: 'High-performance online storefront featuring dynamic shopping cart, Stripe API payments, catalog filters, and Prisma PostgreSQL schema.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'Prisma', 'PostgreSQL'],
      liveUrl: 'https://e-commerce-phi-rust-72.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/E-Commerce'
    },
    {
      title: 'Imposter Game',
      role: 'Game Developer & UI Designer',
      description: 'Suspenseful real-time multiplayer social deduction web game with Socket.io server connection management and animated voting screens.',
      tech: ['Next.js', 'React', 'Socket.io', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://imposter-game-ten-kappa.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/imposter-game'
    }
  ]

  const experiences = [
    {
      role: 'Freelance Web Developer & UI Designer',
      company: 'Freelance Client Solutions',
      period: '',
      location: 'Remote',
      details: [
        'WhiteZebra Consulting Pvt Ltd — Designed and engineered corporate web application & brand system (https://whitezebraconsulting.com/).',
        'Credit Scoring Web App — Developed interactive Credit Scoring Appraisal Web Application (https://las-credit-appraisal.vercel.app/). (Internal company project — showing initial templates only).',
        'VAT & Inventory Dashboard — Architected fullstack inventory management and automated VAT calculation system (https://vat-inventory.vercel.app/dashboard). (Internal company project — showing initial templates only).'
      ]
    },
    {
      role: 'WEB & Graphic Designer',
      company: 'Professional Edge Global',
      period: 'May 2025 – Nov 2025',
      location: 'Nepal',
      details: [
        'Designed, developed, and maintained core corporate web portals for main enterprise and sister companies.',
        'Engineered responsive marketing collateral and visual campaign assets driving digital branding consistency.',
        'Managed internal IT infrastructure, serving as primary point of contact for system maintenance and technical operations.'
      ]
    },
    {
      role: 'Graphic & Motion Graphic Designer (Intern)',
      company: 'Chainge Digital',
      period: 'Nov 2024 – Feb 2025',
      location: 'Kathmandu, NP',
      details: [
        'Produced digital design assets and video graphics for online marketing campaigns and web interfaces.',
        'Utilized Adobe Photoshop, Illustrator, Premiere Pro, and After Effects for visual storytelling.',
        'Collaborated with cross-functional creative teams to maintain brand identity across all media.'
      ]
    },
    {
      role: 'Web Designer (Internship)',
      company: 'Bisava Technology',
      period: 'Jul 2024 – Sep 2024',
      location: 'Nepal',
      details: [
        'Formulated brand style guidelines and responsive website frameworks ensuring typography and color harmony.'
      ]
    }
  ]

  const education = [
    {
      degree: 'Bachelors in Information Management (BIM)',
      institution: 'Nepal Commerce Campus',
      period: 'Graduated',
      details: 'Comprehensive degree covering Information Technology, System Analysis, Database Management, and Software Engineering.'
    },
    {
      degree: '+2 Higher Secondary (Computer Science Major)',
      institution: 'VS Niketan School',
      period: 'Completed',
      details: 'Focused on Fundamentals of Computer Science, C/C++ Programming, Database Systems, and Web Foundations.'
    }
  ]

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 dark:bg-neutral-950 dark:text-white transition-colors duration-300 print:bg-white print:text-black">
      {/* Header hidden on print */}
      <div className="print:hidden">
        <Header />
      </div>

      {/* Top Header Section */}
      <section className="relative pt-28 pb-6 px-6 text-center overflow-hidden print:hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 uppercase">
            Resume
          </h1>
          <div className="mx-auto h-1 w-16 bg-orange-500 mb-6" />

          <div className="flex justify-center">
            <a
              href="/resume/Resume_Pujan-Joshi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 cursor-pointer gap-2 rounded-none"
            >
              <Download size={16} />
              Download PDF Version
            </a>
          </div>
        </div>
      </section>

      {/* Main Resume Paper Sheet - Strict rounded-none */}
      <section className="py-8 px-4 sm:px-8 max-w-4xl mx-auto relative z-10 print:py-0 print:px-0">
        <div className="rounded-none border border-slate-300 bg-white p-8 sm:p-14 dark:border-white/10 dark:bg-neutral-900 shadow-2xl print:shadow-none print:border-none print:p-0 print:bg-white print:dark:bg-white">
          
          {/* Header Block */}
          <div className="border-b-2 border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:border-slate-400">
            <div className="border-l-4 border-orange-500 pl-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white uppercase print:text-black">
                Pujan Joshi
              </h2>
              <p className="text-sm font-extrabold text-orange-500 dark:text-orange-400 mt-2 uppercase tracking-[0.2em] print:text-orange-600">
                Web Designer & Full-Stack Developer
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 print:text-slate-900">
              <a href="mailto:pujanjoci01@gmail.com" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Mail size={14} className="text-orange-500 shrink-0" />
                <span>pujanjoci01@gmail.com</span>
              </a>
              <a href="tel:+9779860928584" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Phone size={14} className="text-orange-500 shrink-0" />
                <span>+977 9860928584</span>
              </a>
              <a href="https://www.pujan-joshi.com.np" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Globe size={14} className="text-orange-500 shrink-0" />
                <span>pujan-joshi.com.np</span>
              </a>
              <a href="https://github.com/pujanjoci" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                <Github size={14} className="text-orange-500 shrink-0" />
                <span>github.com/pujanjoci</span>
              </a>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin size={14} className="text-orange-500 shrink-0" />
                <span>Bhaktapur, Katunje — Nepal</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 mb-3 flex items-center gap-2">
              <Layers size={14} />
              Executive Summary
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal print:text-slate-900">
              Passionate, performance-focused Web Designer and Developer with over 5 years of hands-on coding experience. Specialized in architecting fast, mobile-first, and search-optimized web platforms utilizing React, Next.js (App Router), TypeScript, and Tailwind CSS. Proven track record of transforming client visions into high-resolution visual layouts, interactive web simulations, and robust full-stack applications.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 mb-6 flex items-center gap-2">
              <Code2 size={14} />
              Skills & Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 print:text-black">
                    <CheckSquare size={13} className="text-orange-500" />
                    <span>{cat.title}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-100 border border-slate-250 text-xs font-bold text-slate-800 rounded-none dark:bg-white/5 dark:border-white/10 dark:text-slate-200 print:bg-white print:border-slate-400 print:text-black"
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
            <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 mb-6 flex items-center gap-2">
              <Briefcase size={14} />
              Professional Work History
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white uppercase tracking-tight print:text-black">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider print:text-orange-600">
                        {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
                      </p>
                    </div>
                    {exp.period && (
                      <span className="px-3 py-1 bg-slate-100 border border-slate-300 text-xs font-extrabold text-slate-700 rounded-none dark:bg-white/5 dark:border-white/10 dark:text-slate-300 print:border-slate-400 print:text-black">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-disc pl-5 print:text-slate-900">
                    {exp.details.map((item, dIdx) => (
                      <li key={dIdx}>
                        {item.split(/(https?:\/\/[^\s\)]+|\(Internal company project[^\)]*\))/g).map((part, pIdx) => {
                          if (part.startsWith('http')) {
                            return (
                              <a
                                key={pIdx}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:underline font-bold print:text-black"
                              >
                                {part}
                              </a>
                            )
                          }
                          if (part.includes('Internal company project')) {
                            return (
                              <span key={pIdx} className="text-red-500 dark:text-red-400 font-bold">
                                {part}
                              </span>
                            )
                          }
                          return part
                        })}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="py-8 border-b border-slate-200 dark:border-white/10 print:border-slate-300">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 mb-6 flex items-center gap-2">
              <Layers size={14} />
              Selected Portfolio Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <div key={index} className="border border-slate-300 p-5 rounded-none dark:border-white/10 dark:bg-white/[0.02] print:border-slate-400 print:bg-white">
                  <h4 className="text-base font-extrabold text-slate-950 dark:text-white print:text-black">
                    {proj.title}
                  </h4>
                  <p className="text-xs font-bold text-orange-500 dark:text-orange-400 mb-2 uppercase tracking-wider">
                    {proj.role}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 print:text-slate-800">
                    {proj.description}
                  </p>
                  
                  {/* Action Links */}
                  <div className="flex items-center gap-4 mb-4 print:hidden text-xs">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-extrabold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 border border-slate-300 text-[10px] font-bold text-slate-600 rounded-none dark:border-white/10 dark:text-slate-400 print:border-slate-400 print:text-black">
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
            <h3 className="text-xs font-extrabold uppercase tracking-[0.25em] text-orange-500 dark:text-orange-400 mb-6 flex items-center gap-2">
              <GraduationCap size={14} />
              Education & Academic Qualification
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="space-y-1.5 border-l-2 border-slate-300 dark:border-white/10 pl-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h4 className="text-base font-extrabold text-slate-950 dark:text-white uppercase print:text-black">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed print:text-slate-800">
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
