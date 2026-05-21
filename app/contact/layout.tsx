import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Contact Pujan Joshi - Portfolio',
  description:
    'Contact Pujan Joshi for freelance projects, web development collaborations, design work, and professional inquiries.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
