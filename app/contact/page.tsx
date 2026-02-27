'use client'

import ContactSection from '../components/ContactSection'
import Header from '../components/Header'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <Header />
      <div className="pt-20">
        <ContactSection />
      </div>
    </main>
  )
}
