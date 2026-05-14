import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { generateOrderNumber } from './hooks/generateOrderNumber'
import { validateStock } from './hooks/validateStock'
import { decrementStock } from './hooks/decrementStock'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerInfo_name', 'status', 'total'],
    group: 'المتجر (Store)',
  },
  access: {
    read: authenticated,
    create: () => true, // Anyone can place an order
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [generateOrderNumber, validateStock],
    afterChange: [decrementStock],
  },
  fields: [
    {
      name: 'orderNumber',
      label: 'رقم الطلب',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'حالة الطلب',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'قيد الانتظار (Pending)', value: 'pending' },
        { label: 'تم التأكيد (Confirmed)', value: 'confirmed' },
        { label: 'تم الشحن (Shipped)', value: 'shipped' },
        { label: 'تم التسليم (Delivered)', value: 'delivered' },
        { label: 'ملغي (Cancelled)', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'customerInfo',
      label: 'معلومات العميل',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'الاسم الكامل',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          label: 'رقم الهاتف (واتساب)',
          type: 'text',
          required: true,
        },
        {
          name: 'shippingAddress',
          label: 'عنوان الشحن',
          type: 'textarea',
          required: true,
        },
        {
          name: 'shippingZone',
          label: 'منطقة التوصيل',
          type: 'relationship',
          relationTo: 'shipping-zones',
          required: true,
        },
      ],
    },
    {
      name: 'items',
      label: 'المنتجات المطلوبة',
      type: 'array',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              label: 'المنتج',
              type: 'relationship',
              relationTo: 'products',
              required: true,
              admin: {
                width: '40%',
              },
            },
            {
              name: 'quantity',
              label: 'الكمية',
              type: 'number',
              required: true,
              min: 1,
              defaultValue: 1,
              admin: {
                width: '20%',
              },
            },
            {
              name: 'priceAtPurchase',
              label: 'السعر وقت الشراء',
              type: 'number',
              required: true,
              admin: {
                width: '40%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'totals',
      label: 'المجاميع',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'subtotal',
              label: 'المجموع الفرعي',
              type: 'number',
              required: true,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'shippingCost',
              label: 'تكلفة التوصيل',
              type: 'number',
              required: true,
              defaultValue: 0,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'discount',
              label: 'الخصم',
              type: 'number',
              defaultValue: 0,
              admin: {
                width: '25%',
              },
            },
            {
              name: 'total',
              label: 'المجموع الكلي',
              type: 'number',
              required: true,
              admin: {
                width: '25%',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'couponApplied',
      label: 'كوبون الخصم المستخدم',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'كود الكوبون الذي تم التحقق منه على الخادم',
      },
    },
    {
      name: 'gifting',
      label: 'منطق الهدايا (Gifting)',
      type: 'group',
      fields: [
        {
          name: 'isGift',
          label: 'هل هذه طلبية هدية؟',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'recipientName',
          label: 'اسم المستلم',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.isGift,
          },
        },
        {
          name: 'giftMessage',
          label: 'رسالة الهدية',
          type: 'textarea',
          admin: {
            condition: (_, siblingData) => siblingData?.isGift,
          },
        },
        {
          name: 'luxuryWrapping',
          label: 'خيار التغليف الملكي',
          type: 'relationship',
          relationTo: 'wrapping-options' as any,
          admin: {
            condition: (_, siblingData) => siblingData?.isGift,
            description: 'خيار التغليف الذي اختاره العميل',
          },
        },
      ],
    },
    {
      name: 'payment',
      label: 'طريقة الدفع',
      type: 'select',
      defaultValue: 'cod',
      required: true,
      options: [
        { label: 'الدفع عند الاستلام أو في المركز', value: 'cod' },
      ],
      admin: {
        readOnly: true,
      },
    },
  ],
}
