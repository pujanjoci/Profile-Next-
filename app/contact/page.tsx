'use client'

import ContactSection from '../components/ContactSection'
import Header from '../components/Header'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 overflow-x-hidden transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
      <Header />
      <div className="pt-20">
        <ContactSection />
      </div>
    </main>
  )
}
