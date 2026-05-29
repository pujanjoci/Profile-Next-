import { MetadataRoute } from 'next'
import { siteConfig } from './seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/projects', '/gallery', '/contact'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return routes
}
