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
    <main className="min-h-screen bg-slate-50 text-slate-950 overflow-x-hidden transition-colors duration-300 dark:bg-neutral-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="pt-24">
        {/* Accessible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-2">
          <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li aria-current="page" className="text-orange-500 font-bold">
              Contact
            </li>
          </ol>
        </nav>
        <ContactSection headingLevel="h1" />
      </div>
      <Footer />
    </main>
  )
}
