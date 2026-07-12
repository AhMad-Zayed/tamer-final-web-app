import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'
import { Noto_Kufi_Arabic, Manrope, Inter } from 'next/font/google'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { FloatingCTAs } from '@/components/FloatingCTAs'

// ─── next/font: self-hosted, zero FOUT, automatic preload ───
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-kufi',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  preload: false,
})

// ─── LocalBusiness JSON-LD ───
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'تامر بيوتي سنتر',
  alternateName: 'Tamer Beauty Center',
  description: 'مركز تامر للتجميل والعناية — خدمات الليزر، علاجات البشرة، خدمات الشعر وخدمة العريس VIP.',
  url: 'https://tamerbeauty.com', // TODO: استبدل بالدومين الحقيقي
  telephone: [
    '+972-52-781-5671',
    '+972-59-806-7672',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'TODO: أدخل العنوان الصحيح',
    addressLocality: 'TODO: المدينة',
    addressRegion: 'TODO: المنطقة',
    postalCode: 'TODO',
    addressCountry: 'IL',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  priceRange: '₪₪₪',
  image: '/images/og-tamer-beauty.webp',
  sameAs: [
    'https://wa.me/972527815671',
    // TODO: أضف روابط Instagram و YouTube الحقيقية
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoKufiArabic.variable} ${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
  alternates: {
    languages: {
      'ar': '/',
    },
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

