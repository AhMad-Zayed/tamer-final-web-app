import type { Block } from 'payload'

export const OffersBlock: Block = {
  slug: 'offersBlock',
  interfaceName: 'OffersBlock',
  labels: {
    singular: 'Offers Slider',
    plural: 'Offers Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'عروض محدودة الوقت',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'offers',
      type: 'array',
      label: 'Offer Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Offer Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Short Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Offer Image',
        },
        {
          name: 'oldPrice',
          type: 'number',
          label: 'Old Price (SAR)',
        },
        {
          name: 'newPrice',
          type: 'number',
          label: 'New Price (SAR)',
          required: true,
        },
        {
          name: 'currency',
          type: 'text',
          label: 'Currency Symbol',
          defaultValue: 'ر.س',
        },
        {
          name: 'limitedTag',
          type: 'text',
          label: '"Limited Time" Tag Text',
          defaultValue: 'عرض محدود',
        },
        {
          name: 'expiryDate',
          type: 'text',
          label: 'Expiry Label (e.g. ينتهي 30 مايو)',
        },
        {
          name: 'link',
          type: 'text',
          label: 'CTA URL',
        },
      ],
    },
  ],
}
