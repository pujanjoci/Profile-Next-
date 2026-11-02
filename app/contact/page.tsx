'use client'

import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Link from 'next/link'
import { siteConfig } from '../seo'

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${siteConfig.url}/contact#contactpage`,
        url: `${siteConfig.url}/contact`,
        name: 'Contact Pujan Joshi - Web Designer & Developer',
        description:
          'Get in touch with Pujan Joshi for web development, UI/UX design inquiries, or technical consultations.',
        mainEntity: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: `${siteConfig.url}/contact`,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen editorial-section overflow-x-hidden transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="pt-28 pb-2 editorial-container">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ed-muted)]">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-orange-500 font-semibold">
              Contact
            </li>
          </ol>
        </nav>
      </div>
      <ContactSection headingLevel="h1" />
      <Footer />
    </main>
  )
}
