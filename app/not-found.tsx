'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen w-full relative flex items-center justify-center bg-white text-gray-900 overflow-hidden transition-colors duration-300 dark:bg-neutral-950 dark:text-gray-100 font-sans">
      
      {/* Sleek decorative premium background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-tr from-orange-500/10 to-amber-500/5 blur-3xl opacity-80 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center">
        
        {/* Animated large 404 */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative select-none"
        >
          <span className="text-[120px] sm:text-[150px] font-black tracking-tighter leading-none text-orange-500 filter drop-shadow-sm">
            404
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent opacity-10 pointer-events-none" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-6 text-gray-900 dark:text-white"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed max-w-sm"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 w-full mt-10 justify-center items-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 shadow-md shadow-orange-500/10 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </main>
  )
}
