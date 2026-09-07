import { MetadataRoute } from 'next'
import { siteConfig } from './seo'
import { projects } from './data/projects'
import { getProjectSlug } from './utils/slug'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages with their authentic release/content modification dates
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: '2026-07-31' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-07-30' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-07-28' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-07-28' },
    { path: '/resume', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-07-31' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-07-28' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: '2026-07-28' },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Add all project showcase pages dynamically using the centralized slug helper
  projects.forEach((project) => {
    const slug = getProjectSlug(project)
    const modifiedDate = project.updatedAt ? new Date(project.updatedAt) : new Date('2026-07-30')

    sitemapEntries.push({
      url: `${siteConfig.url}/projects/${slug}`,
      lastModified: modifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  })

  return sitemapEntries
}
