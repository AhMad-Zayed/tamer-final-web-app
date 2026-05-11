import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ServicesHubClient } from './ServicesHubClient'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const servicesResult = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'createdAt',
  })

  return <ServicesHubClient services={servicesResult.docs} />
}

export function generateMetadata(): Metadata {
  return {
    title: 'بوابات الخدمات السريرية | تامر بيوتي سنتر',
    description:
      'استكشف مسارات العلاج التخصصية في مركز تامر بيوتي. ليزر، بشرة، شعر، حجامة، وخدمة العريس VIP.',
  }
}
