import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { sanitizeExternalUrlHook } from './hooks/sanitizeExternalUrl'

export const WrappingOptions: CollectionConfig = {
  slug: 'wrapping-options',
  admin: {
    useAsTitle: 'name',
    group: 'المتجر (Store)',
    defaultColumns: ['name', 'mediaType', 'price', 'active'],
    description: 'خيارات التغليف الفاخر — الصق رابط الفيديو من Facebook أو YouTube وسيعمل تلقائياً.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [sanitizeExternalUrlHook],
  },
  fields: [
    {
      name: 'name',
      label: 'اسم التغليف',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'مثال: تغليف ذهبي ملكي',
      },
    },
    {
      name: 'description',
      label: 'الوصف',
      type: 'textarea',
      admin: {
        placeholder: 'وصف مختصر يظهر للعميل في صفحة الدفع',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          label: 'السعر الإضافي (₪)',
          type: 'number',
          required: true,
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'يضاف إلى إجمالي الطلب. اتركه 0 للتغليف المجاني.',
          },
        },
        {
          name: 'emoji',
          label: 'الإيموجي',
          type: 'text',
          defaultValue: '🎁',
          admin: {
            width: '50%',
            description: 'إيموجي يظهر على بطاقة التغليف في المتجر',
          },
        },
      ],
    },
    {
      name: 'active',
      label: 'نشط (يظهر للعملاء)',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      label: 'ترتيب العرض',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'رقم أقل = يظهر أولاً',
      },
    },
    // ── Media Tab-like group ─────────────────────────────────
    {
      name: 'mediaType',
      label: 'نوع الوسائط',
      type: 'select',
      required: true,
      defaultValue: 'image_gallery',
      options: [
        { label: '🖼️  معرض صور (Gallery)', value: 'image_gallery' },
        { label: '🎬  رابط فيديو خارجي (Facebook / YouTube / Vimeo)', value: 'external_video' },
      ],
      admin: {
        description:
          'اختر "رابط فيديو خارجي" ثم الصق الرابط مباشرة — بدون أكواد تضمين.',
      },
    },
    {
      name: 'gallery',
      label: 'معرض الصور',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'الصورة',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'تعليق الصورة (اختياري)',
          type: 'text',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'image_gallery',
        description: 'أضف صوراً متعددة — ستظهر في سلايدر سلس عند الضغط على "معاينة".',
      },
    },
    {
      name: 'externalUrl',
      label: 'رابط الفيديو الخارجي',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'external_video',
        placeholder: 'https://www.facebook.com/share/v/... أو https://youtu.be/...',
        description:
          '✅ الصق الرابط مباشرة من Facebook أو YouTube أو Vimeo. سيتم التحقق تلقائياً من أمان الرابط.',
      },
    },
  ],
}
