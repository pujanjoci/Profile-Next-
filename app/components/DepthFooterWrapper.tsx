'use client'

import ContactSection from './ContactSection'
import Footer from './Footer'

interface DepthFooterWrapperProps {
  contactId?: string
}

export default function DepthFooterWrapper({
  contactId = 'contact',
}: DepthFooterWrapperProps) {
  return (
    <div className="relative w-full bg-[var(--ed-bg)] transition-colors duration-300">
      <div className="w-full relative z-10">
        <ContactSection id={contactId} />
      </div>

      <div className="relative z-20 w-full">
        <Footer />
      </div>
    </div>
  )
}
