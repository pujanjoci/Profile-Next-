import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Resume | Pujan Joshi - Web Designer & Developer',
  description:
    'View the professional resume of Pujan Joshi, a web designer and developer from Nepal skilled in React, Next.js, Tailwind CSS, JavaScript, UI/UX design, and modern web development.',
  path: '/resume',
})

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
