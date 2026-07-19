'use client'

import { motion } from 'framer-motion'
import Header from '../components/Header'
import styles from './book.module.css'

function BookFlip() {
  const images = [
    '/projects/window.webp',
    '/projects/Ecommerce.webp',
    '/projects/imposter.webp',
    '/projects/novel.webp',
    '/projects/SewaYatra.webp'
  ]

  const style = {
    '--img-1': `url('${images[0]}')`,
    '--img-2': `url('${images[1]}')`,
    '--img-3': `url('${images[2]}')`,
    '--img-4': `url('${images[3]}')`,
    '--img-5': `url('${images[4]}')`,
  } as React.CSSProperties

  return (
    <div className={styles.bookScene} style={style}>
      <div className={styles.imgLoader} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.book}>
          <div className={styles.gap} />
          <div className={styles.pages}>
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
            <div className={styles.page} />
          </div>
          <div className={styles.flips}>
            <div className={`${styles.flip} ${styles.flip1}`}>
              <div className={`${styles.flip} ${styles.flip2}`}>
                <div className={`${styles.flip} ${styles.flip3}`}>
                  <div className={`${styles.flip} ${styles.flip4}`}>
                    <div className={`${styles.flip} ${styles.flip5}`}>
                      <div className={`${styles.flip} ${styles.flip6}`}>
                        <div className={`${styles.flip} ${styles.flip7}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 overflow-x-hidden transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <span className="inline-block text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Creative Lab
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-slate-950 dark:text-white">Gallery</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-400 mx-auto rounded-full mb-6" />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            A space for interactive experiments, animations, and visual ideas.
          </p>
        </motion.div>
      </section>

      {/* Book Exhibit */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-2xl">
            {/* Animation area — no label, no title */}
            <div className="relative py-10 px-4 bg-gradient-to-br from-slate-100 to-white dark:from-neutral-900 dark:to-neutral-950 min-h-[560px] flex items-center justify-center">
              <BookFlip />
            </div>
          </div>
        </motion.div>
      </section>

      {/* More coming soon */}
      <section className="py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-slate-600 text-sm uppercase tracking-widest mb-3">More experiments</p>
          <p className="text-2xl font-bold text-slate-700">Coming soon…</p>
        </motion.div>
      </section>
    </main>
  )
}
