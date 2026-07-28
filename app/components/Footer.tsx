'use client'

import { 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUp, 
  Mail,
  ArrowUpRight
} from 'lucide-react'
import { motion, useTransform, MotionValue } from 'framer-motion'
import Link from 'next/link'

interface FooterProps {
  scrollProgress?: MotionValue<number>
}

export default function Footer({ scrollProgress }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Smooth ease-in parallax transforms for desktop 3D depth planes
  const bgTextY = useTransform(scrollProgress || new MotionValue(1), [0, 1], [-40, 20])
  const midgroundY = useTransform(scrollProgress || new MotionValue(1), [0, 1], [30, 0])
  const foregroundY = useTransform(scrollProgress || new MotionValue(1), [0, 1], [20, 0])
  const opacityFade = useTransform(scrollProgress || new MotionValue(1), [0, 0.7], [0.4, 1])

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/pujanjoci',
      label: 'GitHub',
      hoverColor: 'hover:text-white hover:border-slate-400 hover:bg-white/10',
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

  return (
    <footer className="relative bg-slate-950 text-white pt-10 pb-8 sm:pt-12 sm:pb-10 px-6 sm:px-12 md:px-16 overflow-hidden transition-colors duration-300 border-t border-white/10 rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[40px] shadow-[0_-30px_80px_rgba(0,0,0,0.95)] h-auto md:h-[80vh] md:min-h-[80vh] flex flex-col justify-between">
      
      {/* ─────────────────────────────────────────────────────────────
         Plane 1: Far Depth Background Plane (Watermark & Subtle Overlay)
      ───────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
        {/* Parallax Watermark Text (Desktop Only, No Gradient) */}
        <motion.div 
          style={{ y: bgTextY }}
          className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 w-full text-center"
        >
          <span className="text-[12vw] font-black uppercase tracking-tighter text-white/[0.03] leading-none block whitespace-nowrap">
            PUJAN JOSHI
          </span>
        </motion.div>

        {/* Subtle Faint Dot Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
         Plane 2: Midground Focal Plane (Main Content & Sitemap Grid)
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        style={{ y: midgroundY, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto"
      >
        {/* ── Top Statement & Direct Contact Header ── */}
        <div className="pb-6 mb-6 md:pb-8 md:mb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white tracking-tight leading-snug">
              Designing and engineering digital products with craft, performance, and attention to detail.
            </h3>
          </div>
          <div className="flex flex-col gap-1 text-xs font-mono text-slate-400">
            <a href="mailto:contact@pujan-joshi.com.np" className="text-white font-semibold hover:text-orange-400 transition-colors">
              contact@pujan-joshi.com.np
            </a>
            <a href="tel:+9779860928584" className="hover:text-white transition-colors">
              +977 (98) 609 28 584
            </a>
          </div>
        </div>

        {/* ── Main Sitemap & Content Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 pb-6 md:pb-8 border-b border-white/10">
          
          {/* Brand Info & Plain Text Location */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pujan Joshi
              </span>
              <span className="text-white/20 text-xl font-light">/</span>
              <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
                Fullstack Developer
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Architecting high-performance web applications, fluid user interfaces, and robust digital systems.
            </p>

            {/* Plain Text Location (No Pills / Badges) */}
            <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-2 mt-1">
              <span>Bhaktapur, Nepal</span>
              <span>•</span>
              <span>Remote / Worldwide</span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Plain Text Tech Column */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Services & Tech
            </h4>
            <ul className="flex flex-col gap-2 mb-2 md:mb-3">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span>{service.name}</span>
                    <ArrowUpRight size={13} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Plain Text Tech Stack list (No Pills) */}
            <div className="text-[11px] font-mono text-slate-500 leading-relaxed">
              Core technologies: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and Three.js.
            </div>
          </div>

        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
         Plane 3: Foreground Depth Plane (Socials, Copyright, Back to Top)
      ───────────────────────────────────────────────────────────── */}
      <motion.div 
        style={{ y: foregroundY }}
        className="relative z-20 max-w-7xl mx-auto w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        {/* Social Icons Bar */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono text-slate-500 mr-1">Connect:</span>
          {socials.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center justify-center w-9 h-9 rounded-xl
                bg-white/5 border border-white/10 text-slate-400
                transition-all duration-200 ${hoverColor}
              `}
              aria-label={label}
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Pujan Joshi. All rights reserved.</p>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white shadow-md transition-all"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </motion.div>

    </footer>
  )
}
