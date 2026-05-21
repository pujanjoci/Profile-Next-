'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, User, FolderGit2, Mail, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Home', href: '#', icon: Home, isRoute: false },
  { name: 'About', href: '#about', icon: User, isRoute: false },
  { name: 'Projects', href: '#projects', icon: FolderGit2, isRoute: false },
  { name: 'Contact', href: '#contact', icon: Mail, isRoute: false },
  { name: 'Gallery', href: '/gallery', icon: BookOpen, isRoute: true },
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

  // Smooth scroll function
  const smoothScroll = (targetId: string | null) => {
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.warn(`Element with id "${targetId}" not found`)
    }
  }

  // Handle initial hash on page load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      // Small delay to ensure DOM is ready
      setTimeout(() => smoothScroll(id), 100)
    } else {
      window.scrollTo(0, 0)
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
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    // Page-route links (e.g. /gallery) — always use router.push
    if (isRoute) {
      router.push(href)
      return
    }

    // Hash links on the home page — smooth scroll in-place
    if (isHomePage) {
      const targetId = href === '#' ? null : href.replace('#', '')
      smoothScroll(targetId)
      return
    }

    // Hash links on any OTHER page — navigate home first, then scroll via hash
    const hash = href === '#' ? '' : href  // e.g. '#about'
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between md:justify-center">
          <div className="md:hidden pointer-events-auto z-50">
            <ThemeToggle />
          </div>

          {/* Desktop Navigation Pill */}
          <div className="hidden md:block pointer-events-auto">
            <motion.nav
              layout
              className="flex items-center gap-1 border border-gray-200/50 dark:border-gray-800/50 rounded-full p-2 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-lg shadow-gray-200/10 dark:shadow-black/20"
              initial={false}
              animate={{ minWidth: showIcons ? '200px' : '350px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group flex items-center justify-center min-w-[60px] cursor-pointer"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {showIcons ? (
                      <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="flex items-center justify-center"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="sr-only">{item.name}</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </motion.nav>
          </div>

          <div className="hidden md:block pointer-events-auto absolute right-6 sm:right-8 lg:right-12">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden pointer-events-auto relative z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
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
                  className="text-gray-900 dark:text-white"
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-800 dark:text-gray-200"
                >
                  <Menu className="w-6 h-6" />
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
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-auto"
          >
            <ul className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <motion.li key={item.name} variants={itemVariants}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                    className="flex items-center gap-4 text-3xl font-light text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors tracking-tight cursor-pointer"
                  >
                    <item.icon className="w-6 h-6 opacity-70" />
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
