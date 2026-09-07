import { createPageMetadata } from '../seo'

export const metadata = createPageMetadata({
  title: 'Creative Lab & Visual Gallery',
  description:
    'Explore interactive experiments, web animation concepts, dynamic visuals, and creative frontend demos crafted by Pujan Joshi.',
  path: '/gallery',
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
