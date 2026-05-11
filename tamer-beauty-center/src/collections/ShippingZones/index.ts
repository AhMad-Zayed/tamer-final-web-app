import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const ShippingZones: CollectionConfig = {
  slug: 'shipping-zones',
  admin: {
    useAsTitle: 'name',
    group: 'المتجر (Store)',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'اسم المنطقة / المدينة',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'deliveryPrice',
      label: 'سعر التوصيل',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'estimatedDeliveryTime',
      label: 'وقت التوصيل المتوقع (مثلاً: 2-4 أيام)',
      type: 'text',
    },
    {
      name: 'active',
      label: 'نشط',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
