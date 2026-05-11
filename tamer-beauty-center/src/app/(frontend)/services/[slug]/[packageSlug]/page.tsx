import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { PackageLandingClient } from './PackageLandingClient'

export default async function Page({ params: paramsPromise }: { params: Promise<{ slug: string; packageSlug: string }> }) {
  const { slug, packageSlug } = await paramsPromise
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!result.docs.length) {
    return notFound()
  }

  const service = result.docs[0]
  const pkg = service.packages?.find((p: any) => p.slug === packageSlug)

  if (!pkg) {
    return notFound()
  }

  return <PackageLandingClient service={service} pkg={pkg} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  const paths: any[] = []

  services.docs.forEach((service) => {
    service.packages?.forEach((pkg: any) => {
      if (pkg.slug) {
        paths.push({
          slug: service.slug,
          packageSlug: pkg.slug,
        })
      }
    })
  })

  return paths
}
