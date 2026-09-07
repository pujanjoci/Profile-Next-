'use client'

import About from '../components/About'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { siteConfig } from '../seo'

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteConfig.url}/about#aboutpage`,
        url: `${siteConfig.url}/about`,
        name: 'About Pujan Joshi - Web Designer & Developer',
        description:
          'Learn about Pujan Joshi, his full-stack development experience, design skills, tools, and philosophy.',
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
            name: 'About',
            item: `${siteConfig.url}/about`,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-neutral-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="pt-20">
        <About
          name="Pujan"
          bio="I am a developer and designer based in Nepal, focused on crafting polished, performant web applications and high-fidelity user experiences. With a background that bridges front-end architecture and visual design, I build interfaces that are clean, responsive, and intuitive."
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JS', 'MySQL', 'Supabase', 'Figma', 'Git/GitHub', 'Canva', 'Photoshop']}
          headingLevel="h1"
        />
      </div>
      <Footer />
    </main>
  )
}
