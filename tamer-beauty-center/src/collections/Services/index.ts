import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'خدمة (Service)',
    plural: 'الخدمات (Services)',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'updatedAt'],
    useAsTitle: 'title',
    group: 'إدارة المركز',
  },
  fields: [
    {
      name: 'title',
      label: 'عنوان الخدمة (Arabic)',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'الرابط المختصر',
      type: 'text',
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w\u0600-\u06FF-]+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      label: 'الفئة',
      type: 'select',
      required: true,
      options: [
        { label: 'إزالة الشعر بالليزر', value: 'laser' },
        { label: 'علاجات البشرة السريرية', value: 'skin' },
        { label: 'خدمات الشعر 3D', value: 'hair' },
        { label: 'الحجامة والعلاجات', value: 'wellness' },
        { label: 'خدمة العريس VIP', value: 'vip' },
      ],
    },
    {
      name: 'icon',
      label: 'الأيقونة (Lucide Icon Name)',
      type: 'text',
      defaultValue: 'Sparkles',
      admin: {
        description: 'اسم أيقونة Lucide (مثل: Zap, Scissors, Heart, Crown)',
      },
    },
    {
      name: 'shortDescription',
      label: 'وصف مختصر (للبطاقة)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      label: 'وصف تفصيلي (لصفحة الخدمة)',
      type: 'richText',
    },
    {
      name: 'coverImage',
      label: 'صورة الغلاف',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'packages',
      label: 'الأسعار والباقات',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'اسم الباقة / الخدمة',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          label: 'رابط فرعي (Slug)',
          type: 'text',
          required: true,
          admin: {
            description: 'سيتم استخدام هذا الرابط لإنشاء صفحة خاصة لهذه الباقة (مثلاً: full-body-laser)',
          },
        },
        {
          name: 'price',
          label: 'السعر',
          type: 'text',
          required: true,
        },
        {
          name: 'note',
          label: 'ملاحظة (اختياري)',
          type: 'text',
        },
        {
          name: 'fullDescription',
          label: 'وصف تفصيلي للباقة',
          type: 'richText',
        },
        {
          name: 'media',
          label: 'وسائط الباقة (صور/فيديو)',
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
          ],
        },
        {
          name: 'faqs',
          label: 'أسئلة شائعة خاصة بهذه الباقة',
          type: 'array',
          fields: [
            {
              name: 'question',
              label: 'السؤال',
              type: 'text',
              required: true,
            },
            {
              name: 'answer',
              label: 'الإجابة',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      label: 'الأسئلة الشائعة',
      type: 'array',
      fields: [
        {
          name: 'question',
          label: 'السؤال',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'الإجابة',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'beforeAfterGallery',
      label: 'معرض قبل وبعد',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'تسمية',
          type: 'text',
        },
      ],
    },
    {
      name: 'expiryDate',
      label: 'تاريخ انتهاء العرض (اختياري)',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'إذا كانت هناك صفقة محدودة، أدخل تاريخ الانتهاء هنا',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'isFeatured',
      label: 'خدمة مميزة',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
