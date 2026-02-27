'use client'

import { Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/pujan-joshi',
      label: 'GitHub',
      hoverColor: 'hover:text-white hover:border-white/40',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/pujan-joshi',
      label: 'LinkedIn',
      hoverColor: 'hover:text-blue-400 hover:border-blue-400/40',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/pujanjoshi',
      label: 'Twitter',
      hoverColor: 'hover:text-sky-400 hover:border-sky-400/40',
    },
  ]

  return (
    <footer className="relative bg-neutral-950 border-t border-white/5 py-12 px-6 overflow-hidden">
      {/* ── Decorative background blobs (matching contact section) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Copyright and credit */}
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-2 mb-2"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Pujan
              </span>
              <span className="text-white/20 text-lg">|</span>
              <span className="text-slate-400 text-sm font-medium tracking-wide">Developer</span>
            </motion.div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Pujan Joshi. All rights reserved.
            </p>
            <p className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-600 mt-2">
              Designed & built with <Heart size={10} className="text-orange-500 fill-orange-500/20" /> using Next.js
            </p>
          </div>

          {/* Social links with premium dark effect */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label, hoverColor }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                className={`
                  flex items-center justify-center w-11 h-11 rounded-full
                  bg-white/5 border border-white/10 text-slate-400
                  transition-all duration-300 ${hoverColor}
                `}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true }}
            className="group flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            <span>Back to top</span>
          </motion.button>
        </div>

        {/* Small separator and bottom info */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-slate-500 tracking-wide uppercase opacity-50">
            Crafted with Tailwind CSS & Lucide Icons
          </p>
        </div>
      </div>
    </footer>
  )
}