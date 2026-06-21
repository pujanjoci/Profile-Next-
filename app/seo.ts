import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Pujan Joshi',
  title: 'Pujan Joshi | Web Designer & Developer in Nepal',
  description:
    'Official portfolio of Pujan Joshi, a web designer and developer from Nepal specializing in modern websites, UI/UX design, React, Next.js, Tailwind CSS, e-commerce projects, and creative web experiences.',
  url: 'https://pujan-joshi.com.np',
  profileImage: '/og-image.png',
  creator: 'Pujan Joshi',
  keywords: [
    'Pujan Joshi',
    'Pujan Joshi portfolio',
    'Pujan Joshi web developer',
    'Pujan Joshi web designer',
    'web developer Nepal',
    'web designer Nepal',
    'frontend developer Nepal',
    'React developer Nepal',
    'Next.js developer Nepal',
    'Tailwind CSS developer',
    'UI UX designer Nepal',
    'portfolio website Nepal',
  ],
}

export function createPageMetadata({
  title,
  description,
  path = '/',
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  const absoluteUrl = `${siteConfig.url}${path === '/' ? '' : path}`

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Pujan Joshi | Web Designer & Developer in Nepal',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@pujanjoshi3',
      images: ['/og-image.png'],
    },
  }
}
