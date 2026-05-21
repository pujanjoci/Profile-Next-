import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Projects - Pujan Joshi Portfolio',
  description:
    'Browse Pujan Joshi projects, including web apps, games, UI/UX work, professional portals, and creative design showcases.',
  path: '/projects',
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
