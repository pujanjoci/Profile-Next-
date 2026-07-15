'use client'

import { Github, Linkedin, Twitter, ArrowUp, Heart, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/pujanjoci',
      label: 'GitHub',
      hoverColor: 'hover:text-slate-950 hover:border-slate-400 hover:bg-slate-100 dark:hover:text-white dark:hover:border-white/30 dark:hover:bg-white/5',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/pujan-joshi-np/',
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-500/5',
    },
    {
      icon: Twitter,
      href: 'https://x.com/pujanjoshi3',
      label: 'Twitter / X',
      hoverColor: 'hover:text-sky-400 hover:border-sky-500/20 hover:bg-sky-500/5',
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

  return (
    <footer className="relative bg-white border-t border-slate-200 pt-16 pb-10 px-6 sm:px-12 md:px-16 overflow-hidden transition-colors duration-300 dark:bg-neutral-950 dark:border-white/5">
      
      {/* ── Decorative premium background light effect ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-t from-orange-500/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-slate-200 dark:border-white/5">
          
          {/* Column 1: Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5"
            >
              <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent tracking-tight">
                Pujan
              </span>
              <span className="text-slate-300 text-xl font-light dark:text-white/20">/</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-widest mt-0.5">
                Portfolio
              </span>
            </motion.div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Crafting premium digital experiences, fullstack architectures, and immersive interactive web applications with ultimate precision.
            </p>

            {/* Availability Dot Badge */}
            <div className="flex items-center gap-2 bg-purple-500/5 border border-purple-500/20 rounded-full px-3 py-1 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
              </span>
              <span className="text-xs font-medium text-purple-400">Building New Projects</span>
            </div>
          </div>

          {/* Column 2: Sitemap Navigation */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-950 transition-colors duration-200 cursor-pointer dark:text-slate-400 dark:hover:text-white"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Back to Top */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6">
            <div className="w-full flex flex-col items-start md:items-end gap-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Connect Online
              </h4>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label, hoverColor }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-xl
                      bg-slate-50 border border-slate-200 text-slate-600
                      dark:bg-white/5 dark:border-white/10 dark:text-slate-400
                      transition-all duration-300 ${hoverColor}
                    `}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-all duration-300 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-slate-300 dark:hover:text-white"
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to top</span>
            </motion.button>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Pujan Joshi. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Designed & built with</span>
            <Heart size={11} className="text-orange-500 fill-orange-500/20 animate-pulse" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
