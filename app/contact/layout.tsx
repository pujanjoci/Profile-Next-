import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Contact & Inquiries',
  description:
    'Contact Pujan Joshi for web design collaborations, full-stack React and Next.js development projects, and technical consulting.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
