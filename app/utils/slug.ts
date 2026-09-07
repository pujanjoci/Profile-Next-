import { projects, type Project } from '../data/projects'

export const slugOverrides: Record<string, string> = {
  'Modern E-Commerce': 'ecommerce-website',
  'Personal Portfolio': 'terminal-portfolio',
  'Windows 11 Simulation': 'windows-portfolio',
  'House Locator': 'house-locator',
}

/**
 * Generate a URL-safe, clean slug for any project.
 * Uses deterministic mapping for historical URLs and kebab-case generation for others.
 */
export function getProjectSlug(project: { title: string }): string {
  if (slugOverrides[project.title]) {
    return slugOverrides[project.title]
  }
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Find a project by its URL slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  // Check explicit overrides first
  for (const [title, overrideSlug] of Object.entries(slugOverrides)) {
    if (overrideSlug === slug) {
      return projects.find((p) => p.title === title)
    }
  }

  // Check generated slugs
  return projects.find((p) => getProjectSlug(p) === slug)
}

/**
 * Retrieve all valid project slugs for static generation and sitemap.
 */
export function getAllProjectSlugs(): string[] {
  return projects.map((project) => getProjectSlug(project))
}
