'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

interface OrderItem {
  productId: string
  quantity: number
  variantAdditionalPrice?: number
}

interface ValidateOrderInput {
  items: OrderItem[]
  couponCode?: string
  shippingZoneId: string
  incrementUsage?: boolean
}

interface ValidateOrderResult {
  success: boolean
  error?: string
  serverSubtotal: number
  serverDiscount: number
  serverShippingCost: number
  serverTotal: number
  couponCode?: string
  priceBreakdown: Array<{
    productId: string
    title: string
    unitPrice: number
    quantity: number
    lineTotal: number
  }>
}

export async function validateOrder(input: ValidateOrderInput): Promise<ValidateOrderResult> {
  try {
    const payload = await getPayload({ config })

    // ── 1. Recompute subtotal from live DB prices ─────────────────────────────
    let serverSubtotal = 0
    const priceBreakdown: ValidateOrderResult['priceBreakdown'] = []

    for (const item of input.items) {
      try {
        const productId = isNaN(Number(item.productId)) ? item.productId : Number(item.productId)
        const product = await payload.findByID({
          collection: 'products',
          id: productId,
        })

        const basePrice = product.salePrice || product.price
        const unitPrice = basePrice + (item.variantAdditionalPrice || 0)
        const lineTotal = unitPrice * item.quantity

        serverSubtotal += lineTotal
        priceBreakdown.push({
          productId: item.productId,
          title: product.title,
          unitPrice,
          quantity: item.quantity,
          lineTotal,
        })
      } catch (err) {
        return {
          success: false,
          error: `تعذر التحقق من سعر أحد المنتجات. يرجى تحديث الصفحة والمحاولة مجدداً.`,
          serverSubtotal: 0,
          serverDiscount: 0,
          serverShippingCost: 0,
          serverTotal: 0,
          priceBreakdown: [],
        }
      }
    }

    // ── 2. Get shipping cost from DB ──────────────────────────────────────────
    let serverShippingCost = 0
    try {
      const zoneId = isNaN(Number(input.shippingZoneId)) ? input.shippingZoneId : Number(input.shippingZoneId)
      const zone = await payload.findByID({
        collection: 'shipping-zones',
        id: zoneId,
      })
      serverShippingCost = (zone as any).deliveryPrice || 0
    } catch (err) {
      console.error('[validateOrder] Shipping zone not found:', input.shippingZoneId, err)
      serverShippingCost = 0
    }

    // ── 3. Validate coupon server-side ────────────────────────────────────────
    let serverDiscount = 0
    let verifiedCouponCode: string | undefined

    if (input.couponCode && input.couponCode.trim() !== '') {
      try {
        const couponResult = await payload.find({
          collection: 'coupons',
          where: {
            and: [
              { code: { equals: input.couponCode.trim().toUpperCase() } },
              { active: { equals: true } },
            ],
          },
          limit: 1,
        })

        if (!couponResult.docs || couponResult.docs.length === 0) {
          return {
            success: false,
            error: 'كود الخصم غير صحيح أو غير نشط.',
            serverSubtotal,
            serverDiscount: 0,
            serverShippingCost,
            serverTotal: serverSubtotal + serverShippingCost,
            priceBreakdown,
          }
        }

        const coupon = couponResult.docs[0] as any

        // Check expiry
        if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
          return {
            success: false,
            error: 'هذا الكوبون منتهي الصلاحية.',
            serverSubtotal,
            serverDiscount: 0,
            serverShippingCost,
            serverTotal: serverSubtotal + serverShippingCost,
            priceBreakdown,
          }
        }

        // Check max uses
        if (coupon.maxUses && coupon.usageCount >= coupon.maxUses) {
          return {
            success: false,
            error: 'هذا الكوبون وصل إلى الحد الأقصى من الاستخدامات.',
            serverSubtotal,
            serverDiscount: 0,
            serverShippingCost,
            serverTotal: serverSubtotal + serverShippingCost,
            priceBreakdown,
          }
        }

        // Compute discount
        if (coupon.discountType === 'percentage') {
          serverDiscount = Math.round((serverSubtotal * coupon.value) / 100)
        } else {
          serverDiscount = Math.min(coupon.value, serverSubtotal) // Can't discount more than order value
        }

        verifiedCouponCode = coupon.code

        // Increment usage count ONLY if requested
        if (input.incrementUsage) {
          await payload.update({
            collection: 'coupons',
            id: coupon.id,
            data: {
              usageCount: (coupon.usageCount || 0) + 1,
            },
            overrideAccess: true,
          })
        }
      } catch (err: any) {
        console.error('[validateOrder] Coupon update failed:', err)
        if (err.message?.includes('كوبون')) throw err
      }
    }

    const serverTotal = Math.max(0, serverSubtotal + serverShippingCost - serverDiscount)

    return {
      success: true,
      serverSubtotal,
      serverDiscount,
      serverShippingCost,
      serverTotal,
      couponCode: verifiedCouponCode,
      priceBreakdown,
    }
  } catch (err) {
    console.error('[validateOrder] Server Action Crash:', err)
    return {
      success: false,
      error: 'حدث خطأ غير متوقع أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.',
      serverSubtotal: 0,
      serverDiscount: 0,
      serverShippingCost: 0,
      serverTotal: 0,
      priceBreakdown: [],
    }
  }
}
