'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const storedTheme = window.localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail
      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme)
      }
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
        setTheme(event.newValue)
      }
    }

    window.addEventListener('themechange', handleThemeChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('themechange', handleThemeChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
    window.dispatchEvent(new CustomEvent('themechange', { detail: nextTheme }))
    applyTheme(nextTheme)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-900/10 bg-white/75 text-neutral-800 shadow-lg shadow-neutral-900/5 backdrop-blur-xl transition hover:bg-white dark:border-white/10 dark:bg-neutral-950/75 dark:text-neutral-100 dark:shadow-black/20 dark:hover:bg-neutral-900 ${className}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
