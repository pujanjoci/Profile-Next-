'use client'

import { useRef } from 'react'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUp, 
  Heart, 
  Globe, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react'
import Link from 'next/link'
import { useFooterReveal, FooterRevealConfig } from '../hooks/useFooterReveal'

interface FooterRevealProps {
  children?: React.ReactNode
  config?: FooterRevealConfig
}

export default function FooterReveal({ children, config }: FooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)

  // Attach the 60 FPS rAF lerp animation hook
  useFooterReveal(
    {
      containerRef,
      mainContentRef,
      footerRef,
      bgRef,
      gradientRef,
      contentRef,
      foregroundRef,
    },
    config
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/pujanjoci',
      label: 'GitHub',
      hoverColor: 'hover:text-white hover:border-white/30 hover:bg-white/10',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/pujan-joshi-np/',
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10',
    },
    {
      icon: Twitter,
      href: 'https://x.com/pujanjoshi3',
      label: 'Twitter / X',
      hoverColor: 'hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/10',
    },
    {
      icon: Mail,
      href: 'mailto:contact@pujan-joshi.com.np',
      label: 'Email',
      hoverColor: 'hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/10',
    },
  ]

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/contact' },
  ]

  const servicesLinks = [
    { name: 'Fullstack Web Apps', href: '/services#web-apps' },
    { name: 'UI/UX Interactive Design', href: '/services#ui-ux' },
    { name: 'Next.js & React Architecture', href: '/services#architecture' },
    { name: 'Performance Optimization', href: '/services#performance' },
  ]

  const techStack = [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Three.js',
  ]

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-slate-950 text-white"
    >
      {/* ── Main Content Layer (Lifts & Scales slightly in Z-space) ── */}
      <div 
        ref={mainContentRef}
        className="relative z-20 w-full transform-gpu bg-slate-950 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
      >
        {children}
      </div>

      {/* ── Footer Curtain Layer (Reveals underneath in deep space) ── */}
      <footer 
        ref={footerRef}
        className="sticky bottom-0 z-10 w-full min-h-[70vh] bg-slate-950 border-t border-white/10 rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden shadow-[0_-30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-16 pb-10"
      >
        {/* ── Layer 1: Background Watermark ── */}
        <div 
          ref={bgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden select-none" 
          aria-hidden
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center opacity-5">
            <span className="text-[12vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent leading-none block whitespace-nowrap">
              PUJAN JOSHI
            </span>
          </div>
        </div>

        {/* ── Layer 2: Decorative Glow Mesh ── */}
        <div 
          ref={gradientRef}
          className="pointer-events-none absolute inset-0 overflow-hidden select-none" 
          aria-hidden
        >
          <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-gradient-to-t from-orange-500/15 via-purple-600/10 to-transparent blur-[110px] opacity-60" />
          <div className="absolute top-1/4 left-10 w-[280px] h-[280px] rounded-full bg-blue-600/10 blur-[80px] opacity-30" />
        </div>

        {/* ── Layer 3: Main Content Sitemap Grid ── */}
        <div 
          ref={contentRef}
          className="relative z-10 max-w-7xl mx-auto w-full my-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            
            {/* Brand Header & Location */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 tracking-tight">
                  Pujan Joshi
                </span>
                <span className="text-white/20 text-xl font-light">/</span>
                <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
                  Fullstack Developer
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Architecting high-performance web applications, fluid user interfaces, and robust digital experiences with precision engineering.
              </p>

              {/* Location Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                  <MapPin size={13} className="text-orange-400" />
                  <span>Bhaktapur, Nepal</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
                  <Globe size={13} className="text-blue-400" />
                  <span>Remote / Worldwide</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Column */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                Navigation
              </h4>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Tech Column */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-orange-400 font-semibold">
                Services & Tech
              </h4>
              <ul className="flex flex-col gap-2 mb-3">
                {servicesLinks.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <span>{service.name}</span>
                      <ArrowUpRight size={13} className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Focus Pills */}
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Layer 4: Foreground Socials, Copyright, and Back to Top CTA ── */}
        <div 
          ref={foregroundRef}
          className="relative z-20 max-w-7xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          {/* Social Icons Bar */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-slate-500 mr-1">Connect:</span>
            {socials.map(({ icon: Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center justify-center w-9 h-9 rounded-xl
                  bg-white/5 border border-white/10 text-slate-400
                  transition-all duration-200 ${hoverColor}
                `}
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright & Built Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Pujan Joshi</p>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Built with</span>
              <Heart size={11} className="text-orange-500 fill-orange-500 animate-pulse" />
            </div>
          </div>

          {/* Back to Top CTA Button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white shadow-md transition-all active:scale-95"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="text-orange-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </footer>
    </div>
  )
}
