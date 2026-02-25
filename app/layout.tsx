import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
  title: 'FreshtenOS — Freshten Zapata Rosales',
  description:
    'Enterprise-grade interactive desktop portfolio of Freshten Zapata Rosales, Frontend Developer specializing in React, TypeScript, and real-time systems.',
  keywords: ['Frontend Developer', 'React', 'TypeScript', 'Next.js', 'Portfolio'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Inline script to prevent theme flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('freshten-theme') || 'dark';
                document.documentElement.className = t === 'dark' ? 'dark' : '';
              } catch(e) {
                document.documentElement.className = 'dark';
              }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
