import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Professional Resume & Experience',
  description:
    'View the professional resume, development experience, and technical competencies of Pujan Joshi, web designer and full-stack developer based in Nepal.',
  path: '/resume',
})

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
