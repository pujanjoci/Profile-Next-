import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Services | Pujan Joshi - Web Design & Development',
  description:
    'Web design and development services by Pujan Joshi, including portfolio websites, business websites, landing pages, e-commerce interfaces, UI/UX design, React development, and Next.js development.',
  path: '/services',
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
