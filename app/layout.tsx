import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pujan Joshi - Portfolio',
  description: 'Pujan Joshi - Testing Personal Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
