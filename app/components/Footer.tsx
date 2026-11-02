'use client'

import {
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  Mail,
  ArrowUpRight,
} from 'lucide-react'
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
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/pujan-joshi-np/',
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: 'https://x.com/pujanjoshi3',
      label: 'Twitter / X',
    },
    {
      icon: Mail,
      href: 'mailto:contact@pujan-joshi.com.np',
      label: 'Email',
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
    { name: 'UI/UX & Web Design', href: '/services#ui-ux' },
    { name: 'Custom Web Development', href: '/services#architecture' },
    { name: 'E-Commerce Solutions', href: '/services#web-apps' },
    { name: 'Interactive Experiences', href: '/services#performance' },
  ]

  return (
    <footer className="relative bg-neutral-950 text-neutral-100 pt-14 pb-12 border-t border-white/10 overflow-hidden font-editorial">
      <div className="editorial-container relative z-10">
        {/* Sitemap & Identity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (5 Cols) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Pujan Joshi
              </span>
              <span className="text-white/20">/</span>
              <span className="text-orange-400 text-xs font-mono uppercase tracking-widest">
                Web Designer & Developer
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              Independent developer and interface designer specializing in Next.js, React, TypeScript, and modern web applications.
            </p>

            <div className="flex flex-col gap-1 text-xs font-mono text-neutral-400 pt-1">
              <a
                href="mailto:contact@pujan-joshi.com.np"
                className="text-white font-semibold hover:text-orange-400 transition-colors"
              >
                contact@pujan-joshi.com.np
              </a>
              <a
                href="tel:+9779860928584"
                className="hover:text-white transition-colors"
              >
                +977 (98) 609 28 584
              </a>
              <span className="text-neutral-500">
                Bhaktapur, Katunje — Nepal
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-neutral-300 hover:border-orange-500 hover:text-orange-400 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Index
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Specification Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Capabilities
            </h4>
            <ul className="space-y-2 mb-4">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <span>{service.name}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-neutral-500 group-hover:text-orange-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-mono text-neutral-500 leading-relaxed pt-2 border-t border-white/10">
              Core stack: Next.js, React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <p>© {new Date().getFullYear()} Pujan Joshi. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 border border-white/15 bg-white/5 hover:border-orange-500 text-white transition-colors cursor-pointer uppercase tracking-widest text-[11px]"
            aria-label="Back to top"
          >
            <span>Return to Top</span>
            <ArrowUp
              size={13}
              className="text-orange-400 transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
