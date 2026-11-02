import Header from './components/Header'
import Hero from './components/Hero'
import LazyHomeSections from './components/LazyHomeSections'
import ScrollToTop from './components/ScrollToTop'
import { siteConfig } from './seo'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/og-image.png`,
        jobTitle: 'Web Designer & Full-Stack Developer',
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.location.city,
          addressCountry: siteConfig.location.country,
        },
        email: siteConfig.email,
        sameAs: [
          siteConfig.socials.github,
          siteConfig.socials.linkedin,
          siteConfig.socials.twitter,
        ],
        knowsAbout: [
          'Web Design',
          'Frontend Engineering',
          'Full-Stack Web Development',
          'UI/UX Design',
          'React',
          'Next.js',
          'Tailwind CSS',
          'TypeScript',
          'JavaScript',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} Portfolio`,
        alternateName: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#person`,
        },
        author: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        mainEntity: {
          '@id': `${siteConfig.url}/#person`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      <Header />
      <main className="relative">
        <Hero />
        <LazyHomeSections />
      </main>
    </>
  )
}
