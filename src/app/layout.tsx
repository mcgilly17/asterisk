import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { AsciiBackground } from '@/components/shared/ascii-background'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Asterisk - We build products your customers will die for',
  description: 'Zero-to-one products for scale-ups that lead the market.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        {/* ASCII Ambient Background - behind everything */}
        <AsciiBackground preset="midnight-term" theme="dark" motionMode="auto" />
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
