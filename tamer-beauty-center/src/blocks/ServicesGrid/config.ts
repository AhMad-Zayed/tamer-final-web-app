import type { Block } from 'payload'

export const ServicesGrid: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'الخدمات السريرية',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
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
          label: 'Card Image',
        },
        {
          name: 'size',
          type: 'select',
          label: 'Card Size (Bento)',
          defaultValue: 'small',
          options: [
            { label: 'Wide (8 cols)', value: 'wide' },
            { label: 'Small (4 cols)', value: 'small' },
            { label: 'Full (12 cols)', value: 'full' },
          ],
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Optional Tag Label (e.g. جديد)',
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
