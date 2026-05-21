import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Gallery - Pujan Joshi Portfolio',
  description:
    'Explore Pujan Joshi creative experiments, animations, interactive visuals, and portfolio gallery work.',
  path: '/gallery',
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
