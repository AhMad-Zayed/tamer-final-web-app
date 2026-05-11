import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'من نحن (About Us)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'عنوان الصفحة',
      type: 'text',
      required: true,
      defaultValue: 'تامر بيوتي سنتر — الريادة في عالم التميز',
    },
    {
      name: 'tamerBio',
      label: 'نبذة عن تامر شحادة',
      type: 'richText',
    },
    {
      name: 'tamerVision',
      label: 'رؤية المركز',
      type: 'richText',
    },
    {
      name: 'centerBio',
      label: 'نبذة عن المركز',
      type: 'richText',
    },
    {
      name: 'tamerMedia',
      label: 'الوسائط (صورة أو فيديو لتامر)',
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
  ],
}
