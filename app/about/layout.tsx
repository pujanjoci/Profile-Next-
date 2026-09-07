import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'About Me - Background & Skills',
  description:
    'Learn about Pujan Joshi, his full-stack development experience, design skills, technical background, and approach to building polished web experiences.',
  path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
