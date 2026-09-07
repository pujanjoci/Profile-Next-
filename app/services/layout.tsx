import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Services - Web Design & Development',
  description:
    'Web design and development services by Pujan Joshi, including fullstack web applications, UI/UX design systems, e-commerce storefronts, and performance optimization.',
  path: '/services',
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
