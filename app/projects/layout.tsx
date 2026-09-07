import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Projects & Work Showcase',
  description:
    'Explore the portfolio of web applications, interactive simulations, e-commerce storefronts, and UI/UX design systems engineered by Pujan Joshi.',
  path: '/projects',
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
