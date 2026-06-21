import { MetadataRoute } from 'next'
import { siteConfig } from './seo'
import { projects } from './data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resume', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/gallery', priority: 0.8, changeFrequency: 'monthly' as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Add project subpages dynamically
  projects.forEach((project) => {
    let slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (project.title === 'Modern E-Commerce') slug = 'ecommerce-website';
    if (project.title === 'Personal Portfolio') slug = 'terminal-portfolio';
    if (project.title === 'Windows 11 Simulation') slug = 'windows-portfolio';
    if (project.title === 'House Locator') slug = 'house-locator';

    sitemapEntries.push({
      url: `${siteConfig.url}/projects/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  })

  return sitemapEntries
}
