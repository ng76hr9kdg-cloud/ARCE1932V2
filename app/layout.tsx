import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'U.S. Arce 1932 | Una storia che continua',
  description: "Sito ufficiale dell'U.S. Arce 1932: la società, la prima squadra, il settore giovanile e le novità del club.",
  icons: { icon: '/images/logo-usarce.jpg', apple: '/images/logo-usarce.jpg' },
  openGraph: {
    title: 'U.S. Arce 1932',
    description: 'Una storia, una comunità, un solo cuore gialloblù.',
    images: ['/images/hero-stadium.png'],
    locale: 'it_IT',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  themeColor: '#061a32',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${oswald.variable} bg-background`}>
      <body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
