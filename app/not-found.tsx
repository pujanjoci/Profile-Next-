'use client'

import Link from 'next/link'
import { Home, ArrowLeft, FolderGit2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen w-full relative flex items-center justify-center editorial-section overflow-hidden transition-colors duration-300">
      <head>
        <title>404: Page Not Found | Pujan Joshi</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <div className="relative z-10 max-w-xl w-full px-6 py-16 border border-[var(--ed-border-strong)] bg-[var(--ed-surface)] flex flex-col items-center text-center mx-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-orange-500 mb-3">
          ERROR 404 / DOCUMENT NOT FOUND
        </span>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="select-none"
        >
          <span className="font-display text-7xl sm:text-8xl font-extrabold tracking-tighter leading-none text-[var(--ed-text)]">
            404
          </span>
        </motion.div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-4 text-[var(--ed-text)]">
          Page Not{' '}
          <span className="font-serif-accent italic font-normal text-orange-500">
            Located.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--ed-muted)] mt-3 leading-relaxed max-w-md">
          The requested route may have been moved, renamed, or is temporarily unavailable. Use the index links below to continue exploring.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-8 justify-center items-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-auto text-xs font-mono uppercase tracking-[0.16em] font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-auto text-xs font-mono uppercase tracking-[0.16em] font-semibold border border-[var(--ed-border-strong)] bg-[var(--ed-bg)] text-[var(--ed-text)] hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Project Archive</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-auto text-xs font-mono uppercase tracking-[0.16em] font-semibold border border-[var(--ed-border)] text-[var(--ed-muted)] hover:text-[var(--ed-text)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  )
}
