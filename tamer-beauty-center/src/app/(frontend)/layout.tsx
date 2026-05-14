import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { FloatingCTAs } from '@/components/FloatingCTAs'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {/* Noto Kufi Arabic — Arabic-first display & body font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;900&family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <FloatingCTAs />
          <Toaster
            position="top-right"
            dir="rtl"
            toastOptions={{
              style: {
                fontFamily: "'Noto Kufi Arabic', sans-serif",
                direction: 'rtl',
                textAlign: 'right',
              },
            }}
            theme="dark"
          />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'تامر بيوتي سنتر | مركز الجمال والعناية الفاخر',
    template: '%s | تامر بيوتي سنتر',
  },
  description:
    'مركز تامر للتجميل والعناية — خبرة سريرية في الليزر، علاجات البشرة، وخدمات الشعر الفاخرة. أكاديمية تدريبية متخصصة وتجهيز العرسان بلمسة VIP.',
  keywords: ['تامر بيوتي', 'مركز تجميل', 'ليزر', 'عناية بشرة', 'أكاديمية تجميل', 'تجهيز عريس'],
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
