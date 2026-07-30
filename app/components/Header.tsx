'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, User, FolderGit2, Mail, BookOpen, FileText, Monitor, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Home', href: '#', icon: Home, isRoute: false },
  { name: 'About', href: '#about', icon: User, isRoute: false },
  { name: 'Projects', href: '#projects', icon: FolderGit2, isRoute: false },
  { name: 'Views', href: '#experiences', icon: Monitor, isRoute: false },
  { name: 'Reviews', href: '#testimonials', icon: Quote, isRoute: false },
  { name: 'Contact', href: '#contact', icon: Mail, isRoute: false },
  { name: 'Gallery', href: '/gallery', icon: BookOpen, isRoute: true },
  { name: 'Resume', href: '/resume', icon: FileText, isRoute: true, isExternal: false },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const prevScrollYRef = useRef(0)
  const showIconsRef = useRef(false)
  const tickingRef = useRef(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [activeSection, setActiveSection] = useState('home')

  // Absolute pageY section position calculation engine
  useEffect(() => {
    if (!isHomePage) return

    const getElementPageY = (el: HTMLElement) => {
      let y = 0
      let current: HTMLElement | null = el
      while (current) {
        y += current.offsetTop
        current = current.offsetParent as HTMLElement | null
      }
      return y
    }

    const sectionMap = [
      { id: 'about', name: 'about' },
      { id: 'projects', name: 'projects' },
      { id: 'services', name: 'projects' },
      { id: 'experiences', name: 'experiences' },
      { id: 'testimonials', name: 'testimonials' },
      { id: 'contact', name: 'contact' },
    ]

    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // 1. Top of page threshold (Hero section)
      if (scrollY < 150) {
        setActiveSection('home')
        return
      }

      // 2. Bottom of document threshold (Footer / Contact)
      if (viewportHeight + scrollY >= documentHeight - 80) {
        setActiveSection('contact')
        return
      }

      // 3. Focal point 35% down the screen
      const focusY = scrollY + viewportHeight * 0.35
      let matchedName = 'home'

      for (const section of sectionMap) {
        const elements = Array.from(document.querySelectorAll<HTMLElement>(`#${section.id}`))
        const visibleEl = elements.find((el) => el.offsetWidth > 0 && el.offsetHeight > 0)

        if (visibleEl) {
          const pageY = getElementPageY(visibleEl)
          if (focusY >= pageY) {
            matchedName = section.name
          }
        }
      }

      setActiveSection(matchedName)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isHomePage])

  const isItemActive = (item: typeof navItems[0]) => {
    if (!isHomePage) {
      if (item.href === pathname) return true
      if (item.href === `#${pathname.replace('/', '')}`) return true
      if (pathname.startsWith('/projects') && item.name === 'Projects') return true
      if (pathname.startsWith('/about') && item.name === 'About') return true
      if (pathname.startsWith('/contact') && item.name === 'Contact') return true
      if (pathname.startsWith('/services') && item.name === 'Projects') return true
      return false
    }

    if (item.href === '#') return activeSection === 'home'
    const targetSection = item.href.replace('#', '')
    return activeSection === targetSection
  }

  // Smooth scroll function
  const smoothScroll = (targetId: string | null) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handle initial hash on page load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => smoothScroll(id), 100)
    }
  }, [])

  // Handle scroll direction to toggle icons on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > prevScrollYRef.current
        const nextShowIcons = scrollingDown && currentScrollY > 80

        if (nextShowIcons !== showIconsRef.current) {
          showIconsRef.current = nextShowIcons
          setShowIcons(nextShowIcons)
        }

        prevScrollYRef.current = currentScrollY
        tickingRef.current = false
      })
    }

    const initializeScrollState = () => {
      prevScrollYRef.current = window.scrollY
      const nextShowIcons = window.scrollY > 80
      if (nextShowIcons !== showIconsRef.current) {
        showIconsRef.current = nextShowIcons
        setShowIcons(nextShowIcons)
      }
    }

    initializeScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean, isExternal?: boolean) => {
    if (isExternal || isRoute) {
      setMobileMenuOpen(false)
      return
    }
    e.preventDefault()
    setMobileMenuOpen(false)

    if (isHomePage) {
      const targetId = href === '#' ? null : href.replace('#', '')
      const sectionName = targetId === 'experiences' ? 'experiences' : targetId === 'testimonials' ? 'testimonials' : targetId || 'home'
      setActiveSection(sectionName)
      smoothScroll(targetId)
      return
    }

    const hash = href === '#' ? '' : href
    router.push(`/${hash}`)
  }

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex items-center justify-between md:justify-center">
          <div className="md:hidden pointer-events-auto z-50">
            <ThemeToggle />
          </div>

          {/* Desktop Floating Navigation Pill */}
          <div className="hidden md:block pointer-events-auto">
            <motion.nav
              layout
              className="flex items-center gap-1 border border-slate-200/80 dark:border-white/10 rounded-full p-1.5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl shadow-xl shadow-slate-900/5 dark:shadow-black/40"
              initial={false}
              animate={{ minWidth: showIcons ? '280px' : '520px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navItems.map((item) => {
                const isActive = isItemActive(item)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isRoute, item.isExternal)}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className={`relative px-4 py-2 text-xs sm:text-sm font-bold tracking-tight transition-colors flex items-center justify-center min-w-[72px] cursor-pointer rounded-full ${
                      isActive 
                        ? 'text-orange-500 dark:text-orange-400 font-extrabold' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <AnimatePresence mode="popLayout" initial={false}>
                      {showIcons ? (
                        <motion.div
                          key="icon"
                          initial={{ opacity: 0, scale: 0.5, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: -8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="flex items-center justify-center"
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="sr-only">{item.name}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="text"
                          initial={{ opacity: 0, scale: 0.9, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 8 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </a>
                )
              })}
            </motion.nav>
          </div>

          <div className="hidden md:block pointer-events-auto absolute right-6 sm:right-8 lg:right-12">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden pointer-events-auto relative z-50 p-3 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-md text-slate-800 dark:text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[45] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-auto"
          >
            <ul className="flex flex-col items-center space-y-6">
              {navItems.map((item) => {
                const isActive = isItemActive(item)
                return (
                  <motion.li key={item.name} variants={itemVariants}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.isRoute, item.isExternal)}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-4 text-2xl font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'text-orange-500 dark:text-orange-400 scale-105'
                          : 'text-slate-800 dark:text-slate-200 hover:text-slate-500'
                      }`}
                    >
                      <item.icon className="w-6 h-6 opacity-80" />
                      {item.name}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
