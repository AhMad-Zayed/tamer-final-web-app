import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Experts: CollectionConfig = {
  slug: 'experts',
  labels: {
    singular: 'موظف (Employee)',
    plural: 'الموظفون (Employees)',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title', 'updatedAt'],
    useAsTitle: 'name',
    group: 'إدارة المركز',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (data && data.name && !value) {
              return data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., Senior Laser Specialist',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short biography about the expert.',
      },
    },
    {
      name: 'experienceYears',
      type: 'number',
      required: true,
      admin: {
        description: 'Years of experience in the field.',
      },
    },
    {
      name: 'profileMedia',
      label: 'الوسائط الشخصية (Profile Media)',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'radio',
          options: [
            { label: 'صورة', value: 'image' },
            { label: 'فيديو (رفع)', value: 'video' },
            { label: 'رابط فيديو خارجي', value: 'videoUrl' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'video',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'videoUrl',
            description: 'ضع رابط فيديو من يوتيوب أو فيميو (يجب أن يكون رابط Embed)',
          },
        },
      ],
    },
    {
      name: 'speech',
      label: 'كلمة الخبير (Speech)',
      type: 'richText',
    },
    {
      name: 'gallery',
      label: 'معرض الأعمال (Gallery)',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'radio',
          options: [
            { label: 'صورة', value: 'image' },
            { label: 'فيديو (رفع)', value: 'video' },
            { label: 'رابط فيديو خارجي', value: 'videoUrl' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => siblingData?.type === 'image' },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => siblingData?.type === 'video' },
        },
        {
          name: 'videoUrl',
          type: 'text',
          admin: { condition: (_, siblingData) => siblingData?.type === 'videoUrl' },
        },
        {
          name: 'caption',
          label: 'الوصف (Caption)',
          type: 'text',
        },
      ],
    },
    {
      name: 'reviews',
      label: 'آراء العملاء (Reviews)',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
    },
  ],
}
