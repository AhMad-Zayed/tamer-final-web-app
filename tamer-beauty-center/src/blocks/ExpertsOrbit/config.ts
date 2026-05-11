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
      type: 'relationship',
      relationTo: 'experts',
      hasMany: true,
      required: true,
      minRows: 3,
      maxRows: 20,
      admin: {
        description: 'Select the experts to showcase in the orbit.',
      },
    },
  ],
}
