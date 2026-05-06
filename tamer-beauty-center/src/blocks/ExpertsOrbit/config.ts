import type { Block } from 'payload'

export const ExpertsOrbit: Block = {
  slug: 'expertsOrbit',
  interfaceName: 'ExpertsOrbitBlock',
  labels: {
    singular: 'Experts Orbit',
    plural: 'Experts Orbits',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'فريق الخبراء',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'centerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Center Image (Tiger / Brand Visual)',
      required: true,
    },
    {
      name: 'experts',
      type: 'array',
      label: 'Expert Profiles (exactly 6 for orbit)',
      minRows: 3,
      maxRows: 6,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Job Title',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Image',
          required: true,
        },
      ],
    },
  ],
}
