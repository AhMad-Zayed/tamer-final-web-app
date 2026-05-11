import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AboutPageClient } from './AboutPageClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  const aboutData = await payload.findGlobal({
    slug: 'about',
  })

  const experts = await payload.find({
    collection: 'experts',
    limit: 100,
  })

  return <AboutPageClient about={aboutData} experts={experts.docs} />
}

export function generateMetadata(): Metadata {
  return {
    title: 'من نحن | تامر بيوتي سنتر',
    description: 'تعرف على قصة تامر بيوتي سنتر، رؤيتنا، وفريق الخبراء الذي يقدم لك أفضل خدمات التجميل والعناية.',
  }
}
