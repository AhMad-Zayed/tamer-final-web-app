import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import { ServiceLandingClient } from './ServiceLandingClient'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ServicePage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const service = result.docs[0]

  if (!service) {
    return notFound()
  }

  return <ServiceLandingClient service={service} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const service = result.docs[0]

  if (!service) {
    return {}
  }

  return {
    title: `${service.title} | خدمات تامر بيوتي`,
    description: service.shortDescription,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return services.docs.map(({ slug }) => ({
    slug,
  }))
}
