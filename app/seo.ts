import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Pujan Joshi',
  title: 'Pujan Joshi - Full-Stack Developer Portfolio',
  description:
    'Portfolio of Pujan Joshi, a full-stack developer and designer building responsive web apps, interactive projects, and polished digital experiences.',
  url: 'https://pujan-joshi.com.np',
  profileImage: '/Pujan(Profile)-nobg.png',
  creator: '@pujanjoshi3',
  keywords: [
    'Pujan Joshi',
    'Pujan portfolio',
    'full-stack developer',
    'web developer Nepal',
    'Next.js developer',
    'React developer',
    'graphic designer',
    'UI UX designer',
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
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.profileImage,
          width: 1080,
          height: 1080,
          alt: `${siteConfig.name} profile photo`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.creator,
      images: [siteConfig.profileImage],
    },
  }
}
