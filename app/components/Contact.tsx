'use client'

import ContactSection from './ContactSection'

export default function Contact({ id = 'contact' }: { id?: string }) {
  return <ContactSection id={id} />
}
