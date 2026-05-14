import React from 'react'
import { CheckoutPageClient } from './CheckoutPageClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage() {
  const payload = await getPayload({ config: configPromise })

  const [shippingZones, wrappingOptions] = await Promise.all([
    payload.find({
      collection: 'shipping-zones',
      limit: 100,
      where: { active: { equals: true } },
    }),
    payload.find({
      collection: 'wrapping-options' as any,
      limit: 50,
      where: { active: { equals: true } },
      sort: 'sortOrder',
    }),
  ])

  // Shape wrapping options for the client — only expose safe fields
  const safeWrappingOptions = wrappingOptions.docs.map((opt: any) => ({
    id: String(opt.id),
    name: opt.name || '',
    description: opt.description || null,
    price: opt.price || 0,
    emoji: opt.emoji || '🎁',
    mediaType: opt.mediaType || 'image_gallery',
    gallery: Array.isArray(opt.gallery)
      ? opt.gallery.map((g: any) => ({
          image: g.image
            ? { url: g.image.url || null, alt: g.image.alt || null }
            : null,
          caption: g.caption || null,
        }))
      : null,
    // externalUrl is already sanitized at the CMS layer — safe to pass as-is
    externalUrl: opt.externalUrl || null,
  }))

  return (
    <CheckoutPageClient
      shippingZones={shippingZones.docs}
      wrappingOptions={safeWrappingOptions}
    />
  )
}
