import React from 'react'
import { CheckoutPageClient } from './CheckoutPageClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function CheckoutPage() {
  const payload = await getPayload({ config: configPromise })
  
  const shippingZones = await payload.find({
    collection: 'shipping-zones',
    limit: 100,
    where: {
      active: {
        equals: true,
      },
    },
  })

  return <CheckoutPageClient shippingZones={shippingZones.docs} />
}
