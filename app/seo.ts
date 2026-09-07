import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Pujan Joshi',
  title: 'Pujan Joshi | Web Designer & Developer in Nepal',
  description:
    'Official portfolio of Pujan Joshi, a web designer and developer from Nepal specializing in modern web applications, UI/UX design, React, Next.js, and clean digital experiences.',
  url: 'https://pujan-joshi.com.np',
  defaultOgImage: '/og-image.png',
  creator: 'Pujan Joshi',
  locale: 'en_US',
  email: 'contact@pujan-joshi.com.np',
  location: {
    city: 'Bhaktapur',
    country: 'Nepal',
  },
  socials: {
    github: 'https://github.com/pujanjoci',
    linkedin: 'https://www.linkedin.com/in/pujan-joshi-np/',
    twitter: 'https://x.com/pujanjoshi3',
    twitterHandle: '@pujanjoshi3',
  },
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
  image = siteConfig.defaultOgImage,
  imageAlt,
  type = 'website',
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}): Metadata {
  const cleanPath = path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`
  const absoluteUrl = `${siteConfig.url}${cleanPath}`
  const absoluteImageUrl = image.startsWith('http')
    ? image
    : `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.socials.twitterHandle,
      images: [absoluteImageUrl],
    },
  }
}
