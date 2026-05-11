import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  admin: {
    useAsTitle: 'code',
    group: 'المتجر (Store)',
  },
  access: {
    read: () => true, // Everyone can check if a coupon is valid
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'code',
      label: 'كود الخصم',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'discountType',
          label: 'نوع الخصم',
          type: 'select',
          required: true,
          options: [
            { label: 'نسبة مئوية (%)', value: 'percentage' },
            { label: 'مبلغ ثابت', value: 'fixed' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'value',
          label: 'القيمة',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'expiryDate',
          label: 'تاريخ الانتهاء',
          type: 'date',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'maxUses',
          label: 'أقصى عدد استخدامات',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'active',
      label: 'نشط',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
