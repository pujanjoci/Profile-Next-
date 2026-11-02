'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Download,
  Mail,
  Globe,
  Phone,
  Github,
  ExternalLink,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../seo'

export default function ResumePage() {
  const skillCategories = [
    {
      title: 'Frontend Engineering',
      skills: [
        'React',
        'Next.js (App Router)',
        'TypeScript',
        'Tailwind CSS',
        'JavaScript (ES6+)',
        'HTML5 / CSS3',
      ],
    },
    {
      title: 'Backend & Databases',
      skills: [
        'Node.js',
        'Express',
        'MySQL',
        'Supabase',
        'Socket.io',
      ],
    },
    {
      title: 'Design & Creative Tools',
      skills: [
        'Figma',
        'UI/UX Design',
        'Canva',
        'Adobe Photoshop',
        'Illustrator',
        'Wireframing & Prototyping',
      ],
    },
    {
      title: 'Core Professional Competencies',
      skills: [
        'Technical Problem Solving',
        'Project Management',
        'Client Communication',
        'SEO & Performance Optimization',
        'Git Version Control',
      ],
    },
  ]

  const projects = [
    {
      title: 'Archio Designs',
      role: 'Full-Stack Developer & UI/UX Designer',
      description:
        'Built a modern architectural and interior design showcase platform featuring high-resolution galleries, project case studies, and interactive design services.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
      liveUrl: 'https://archiodesigns.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/archiodesigns',
    },
    {
      title: 'Windows 11 Simulation',
      role: 'Frontend Engineer & Interface Architect',
      description:
        'Interactive browser replication of Windows 11 featuring resizable windows, Start menu, apps, and Zustand desktop state management.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
      liveUrl: 'https://window.pujan-joshi.com.np/',
      repoUrl: 'https://github.com/pujanjoci/windows',
    },
    {
      title: 'Modern E-Commerce Storefront',
      role: 'Full-Stack Developer',
      description:
        'High-performance online storefront featuring dynamic shopping cart, checkout flows, catalog filters, and user account management.',
      tech: [
        'Next.js',
        'React',
        'Tailwind CSS',
        'TypeScript',
      ],
      liveUrl: 'https://e-commerce-phi-rust-72.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/E-Commerce',
    },
    {
      title: 'Imposter Game',
      role: 'Game Developer & UI Designer',
      description:
        'Suspenseful real-time multiplayer social deduction web game with Socket.io server connection management and animated voting screens.',
      tech: ['Next.js', 'React', 'Socket.io', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://imposter-game-ten-kappa.vercel.app/',
      repoUrl: 'https://github.com/pujanjoci/imposter-game',
    },
  ]

  const experiences = [
    {
      role: 'Freelance Web Developer & UI Designer',
      company: 'Freelance Client Solutions',
      period: '2025 – Present',
      location: 'Remote',
      details: [
        'WhiteZebra Consulting Pvt Ltd — Designed and engineered corporate web application & brand system (https://whitezebraconsulting.com/).',
        'Credit Scoring Web App — Developed interactive Credit Scoring Appraisal Web Application (https://las-credit-appraisal.vercel.app/). (Internal company project — showing initial templates only).',
        'VAT & Inventory Dashboard — Architected fullstack inventory management and automated VAT calculation system (https://vat-inventory.vercel.app/dashboard). (Internal company project — showing initial templates only).',
      ],
    },
    {
      role: 'WEB & Graphic Designer',
      company: 'Professional Edge Global',
      period: 'May 2025 – Nov 2025',
      location: 'Nepal',
      details: [
        'Designed, developed, and maintained core corporate web portals for main enterprise and sister companies.',
        'Engineered responsive marketing collateral and visual campaign assets driving digital branding consistency.',
        'Managed internal IT infrastructure, serving as primary point of contact for system maintenance and technical operations.',
      ],
    },
    {
      role: 'Graphic & Motion Graphic Designer (Intern)',
      company: 'Chainge Digital',
      period: 'Nov 2024 – Feb 2025',
      location: 'Kathmandu, NP',
      details: [
        'Produced digital design assets and video graphics for online marketing campaigns and web interfaces.',
        'Utilized Adobe Photoshop, Illustrator, Premiere Pro, and After Effects for visual storytelling.',
        'Collaborated with cross-functional creative teams to maintain brand identity across all media.',
      ],
    },
    {
      role: 'Web Designer (Internship)',
      company: 'Bisava Technology',
      period: 'Jul 2024 – Sep 2024',
      location: 'Nepal',
      details: [
        'Formulated brand style guidelines and responsive website frameworks ensuring typography and color harmony.',
      ],
    },
  ]

  const education = [
    {
      degree: 'Bachelors in Information Management (BIM)',
      institution: 'Nepal Commerce Campus',
      period: 'Graduated',
      details:
        'Comprehensive degree covering Information Technology, System Analysis, Database Management, and Software Engineering.',
    },
    {
      degree: '+2 Higher Secondary (Computer Science Major)',
      institution: 'VS Niketan School',
      period: 'Completed',
      details:
        'Focused on Fundamentals of Computer Science, C/C++ Programming, Database Systems, and Web Foundations.',
    },
  ]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume',
        item: `${siteConfig.url}/resume`,
      },
    ],
  }

  return (
    <main className="min-h-screen editorial-surface transition-colors duration-300 print:bg-white print:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="print:hidden">
        <Header />
      </div>

      {/* Top Editorial Bar */}
      <section className="editorial-container pt-28 pb-8 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--ed-border)] pb-8">
          <div className="space-y-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li
                  aria-current="page"
                  className="text-orange-500 font-semibold"
                >
                  Curriculum Vitae
                </li>
              </ol>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ed-text)]">
              Resume.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume/Resume_Pujan-Joshi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-mono uppercase tracking-[0.18em] text-xs font-semibold transition-colors gap-2"
            >
              <Download size={15} />
              <span>Download Official PDF</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3.5 border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-xs font-mono uppercase tracking-[0.18em] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors gap-1.5"
            >
              <span>Inquire</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Editorial Resume Sheet */}
      <section className="pb-24 px-4 sm:px-8 max-w-5xl mx-auto relative z-10 print:py-0 print:px-0">
        <div className="border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] p-8 sm:p-12 md:p-16 print:border-none print:p-0 print:bg-white">
          {/* Document Header */}
          <div className="border-b-2 border-[var(--ed-border-strong)] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:border-slate-400">
            <div className="border-l-4 border-orange-500 pl-5">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--ed-text)] uppercase print:text-black">
                Pujan Joshi
              </h2>
              <p className="text-xs sm:text-sm font-mono text-orange-500 mt-2 uppercase tracking-[0.2em] font-semibold print:text-orange-600">
                Web Designer &amp; Full-Stack Developer
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono text-[var(--ed-muted)] print:text-slate-900">
              <a
                href="mailto:pujanjoci01@gmail.com"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Mail size={13} className="text-orange-500 shrink-0" />
                <span>pujanjoci01@gmail.com</span>
              </a>
              <a
                href="tel:+9779860928584"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Phone size={13} className="text-orange-500 shrink-0" />
                <span>+977 9860928584</span>
              </a>
              <a
                href="https://pujan-joshi.com.np"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Globe size={13} className="text-orange-500 shrink-0" />
                <span>pujan-joshi.com.np</span>
              </a>
              <a
                href="https://github.com/pujanjoci"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-500 transition-colors"
              >
                <Github size={13} className="text-orange-500 shrink-0" />
                <span>github.com/pujanjoci</span>
              </a>
              <div className="flex items-center gap-2 sm:col-span-2 text-[var(--ed-text)]">
                <MapPin size={13} className="text-orange-500 shrink-0" />
                <span>Bhaktapur, Katunje — Nepal</span>
              </div>
            </div>
          </div>

          {/* 01 / Executive Summary */}
          <div className="py-8 border-b border-[var(--ed-border)] grid grid-cols-1 lg:grid-cols-12 gap-6 print:border-slate-300">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 font-semibold">
                01 / Profile
              </h3>
            </div>
            <div className="lg:col-span-9">
              <p className="text-[var(--ed-text)] text-sm sm:text-base leading-relaxed print:text-slate-900">
                Passionate, performance-focused Web Designer and Developer with over 5 years of hands-on coding experience. Specialized in architecting fast, mobile-first, and search-optimized web platforms utilizing React, Next.js (App Router), TypeScript, and Tailwind CSS. Proven track record of transforming client visions into high-resolution visual layouts, interactive web simulations, and robust full-stack applications.
              </p>
            </div>
          </div>

          {/* 02 / Professional Work History */}
          <div className="py-8 border-b border-[var(--ed-border)] grid grid-cols-1 lg:grid-cols-12 gap-6 print:border-slate-300">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 font-semibold">
                02 / Experience
              </h3>
            </div>
            <div className="lg:col-span-9 space-y-10">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
                    <div>
                      <h4 className="font-display text-lg font-bold text-[var(--ed-text)] print:text-black">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-mono uppercase tracking-wider text-orange-500 mt-0.5 print:text-orange-600">
                        {exp.company}{' '}
                        <span className="text-[var(--ed-muted)]">
                          · {exp.location}
                        </span>
                      </p>
                    </div>
                    {exp.period && (
                      <span className="px-2.5 py-1 border border-[var(--ed-border)] bg-[var(--ed-surface)] text-xs font-mono text-[var(--ed-muted)] print:border-slate-400 print:text-black">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--ed-muted)] leading-relaxed list-disc pl-5 print:text-slate-900">
                    {exp.details.map((item, dIdx) => (
                      <li key={dIdx}>
                        {item
                          .split(
                            /(https?:\/\/[^\s\)]+|\(Internal company project[^\)]*\))/g
                          )
                          .map((part, pIdx) => {
                            if (part.startsWith('http')) {
                              return (
                                <a
                                  key={pIdx}
                                  href={part}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-orange-500 hover:underline font-medium print:text-black"
                                >
                                  {part}
                                </a>
                              )
                            }
                            if (part.includes('Internal company project')) {
                              return (
                                <span
                                  key={pIdx}
                                  className="text-[var(--ed-text)] font-medium italic"
                                >
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

          {/* 03 / Technical Competencies */}
          <div className="py-8 border-b border-[var(--ed-border)] grid grid-cols-1 lg:grid-cols-12 gap-6 print:border-slate-300">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 font-semibold">
                03 / Capabilities
              </h3>
            </div>
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="space-y-2.5">
                  <h4 className="font-display text-sm font-bold text-[var(--ed-text)] print:text-black">
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[var(--ed-surface)] border border-[var(--ed-border)] text-xs font-mono text-[var(--ed-text)] print:bg-white print:border-slate-400 print:text-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 04 / Selected Portfolio Works */}
          <div className="py-8 border-b border-[var(--ed-border)] grid grid-cols-1 lg:grid-cols-12 gap-6 print:border-slate-300">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 font-semibold">
                04 / Selected Works
              </h3>
            </div>
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj, index) => (
                <div
                  key={index}
                  className="border border-[var(--ed-border)] bg-[var(--ed-surface)]/40 p-5 flex flex-col justify-between print:border-slate-400 print:bg-white"
                >
                  <div>
                    <h4 className="font-display text-base font-bold text-[var(--ed-text)] print:text-black">
                      {proj.title}
                    </h4>
                    <p className="text-[11px] font-mono text-orange-500 mb-2 uppercase tracking-wider mt-0.5">
                      {proj.role}
                    </p>
                    <p className="text-xs text-[var(--ed-muted)] leading-relaxed mb-4 print:text-slate-800">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-3 print:hidden text-xs font-mono uppercase tracking-wider">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-orange-500 hover:underline"
                        >
                          <ExternalLink size={12} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors"
                        >
                          <Github size={12} />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border border-[var(--ed-border)] bg-[var(--ed-bg)] text-[10px] font-mono text-[var(--ed-muted)] print:border-slate-400 print:text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 05 / Education */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-orange-500 font-semibold">
                05 / Education
              </h3>
            </div>
            <div className="lg:col-span-9 space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="space-y-1.5 border-l-2 border-[var(--ed-border-strong)] pl-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
                    <h4 className="font-display text-base font-bold text-[var(--ed-text)] print:text-black">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--ed-muted)]">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-orange-500 uppercase tracking-wider">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--ed-muted)] leading-relaxed print:text-slate-800">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}
