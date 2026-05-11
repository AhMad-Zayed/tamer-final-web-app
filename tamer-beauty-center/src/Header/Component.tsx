import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  
  const payload = await getPayload({ config: configPromise })
  const [expertsResult, servicesResult] = await Promise.all([
    payload.find({ collection: 'experts', limit: 100 }),
    payload.find({ collection: 'services', limit: 100 }),
  ])

  return (
    <HeaderClient
      data={headerData}
      experts={expertsResult.docs}
      services={servicesResult.docs}
    />
  )
}
