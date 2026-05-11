import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import React from 'react'
import { ExpertProfileClient } from './ExpertProfileClient'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ExpertPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'experts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const expert = result.docs[0]

  if (!expert) {
    return notFound()
  }

  return <ExpertProfileClient expert={expert} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'experts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const expert = result.docs[0]

  if (!expert) {
    return {}
  }

  return {
    title: `${expert.name} | فريق الخبراء`,
    description: expert.bio,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const experts = await payload.find({
    collection: 'experts',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return experts.docs.map(({ slug }) => ({
    slug,
  }))
}
