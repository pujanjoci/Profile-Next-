import { MetadataRoute } from 'next'
import { siteConfig } from './seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
