import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'مركز تامر للتجميل والعناية — خبرة سريرية في الليزر، علاجات البشرة، وخدمات الشعر الفاخرة. أكاديمية تدريبية متخصصة وتجهيز العرسان بلمسة VIP.',
  images: [
    {
      url: `${getServerSideURL()}/images/og-tamer-beauty.webp`,
      width: 1200,
      height: 630,
      alt: 'تامر بيوتي سنتر — مركز التجميل والعناية الفاخر',
    },
  ],
  siteName: 'تامر بيوتي سنتر',
  title: 'تامر بيوتي سنتر | التجميل والعناية بالبشرة',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
