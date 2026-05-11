import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'stock'],
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
      name: 'title',
      label: 'اسم المنتج',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'السعر الأصلي',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'salePrice',
          label: 'سعر العرض',
          type: 'number',
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
          name: 'stock',
          label: 'الكمية المتوفرة',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'category',
          label: 'التصنيف',
          type: 'relationship',
          relationTo: 'product-categories',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'imageGallery',
      label: 'معرض الصور',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'وصف المنتج',
      type: 'richText',
    },
    {
      name: 'variants',
      label: 'الخيارات (Variants)',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'العنوان (مثلاً 50ml)',
              type: 'text',
              required: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'type',
              label: 'النوع',
              type: 'select',
              options: [
                { label: 'حجم (Size)', value: 'size' },
                { label: 'نوع (Type)', value: 'type' },
                { label: 'لون (Color)', value: 'color' },
              ],
              admin: {
                width: '33%',
              },
            },
            {
              name: 'additionalPrice',
              label: 'سعر إضافي',
              type: 'number',
              defaultValue: 0,
              admin: {
                width: '33%',
              },
            },
          ],
        },
      ],
    },
  ],
}
