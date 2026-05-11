import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { ProductPageClient } from './ProductPageClient'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 1,
  })

  if (!result.docs.length) {
    return notFound()
  }

  const product = result.docs[0]

  return <ProductPageClient product={product} />
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    limit: 100,
    select: {
      slug: true,
    },
  })

  return products.docs.map((doc) => ({
    slug: doc.slug,
  }))
}
