import type { Metadata } from 'next'
import { StorePageClient } from './StorePageClient'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata: Metadata = {
  title: 'المتجر الإلكتروني | تامر بيوتي سنتر',
  description:
    'اكتشف متجر منتجات تامر للعناية بالرجال. مجموعة حصرية من أفضل منتجات العناية بالبشرة والجسم والشعر والعطور الفاخرة.',
  keywords: ['متجر تامر', 'عناية بالبشرة للرجال', 'منتجات حلاقة', 'عطور رجالية', 'تامر بيوتي سنتر'],
}

export default async function StorePage() {
  const payload = await getPayload({ config: configPromise })
  
  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 1,
  })

  const shippingZones = await payload.find({
    collection: 'shipping-zones',
    limit: 100,
  })

  const productCategories = await payload.find({
    collection: 'product-categories',
    limit: 100,
  })

  return (
    <StorePageClient 
      initialProducts={products.docs} 
      initialShippingZones={shippingZones.docs} 
      initialCategories={productCategories.docs}
    />
  )
}
