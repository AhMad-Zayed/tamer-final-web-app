import type { CollectionBeforeChangeHook } from 'payload'

export const validateStock: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  // Only validate on order creation
  if (operation !== 'create') return data

  const { payload } = req

  if (!data.items || !Array.isArray(data.items)) return data

  for (const item of data.items) {
    if (!item.product || !item.quantity) continue

    const productIdRaw = typeof item.product === 'object' ? item.product.id : item.product
    const productId = isNaN(Number(productIdRaw)) ? productIdRaw : Number(productIdRaw)

    try {
      const product = await payload.findByID({
        collection: 'products',
        id: productId,
      })

      const currentStock = product.stock ?? 0
      const requestedQty = item.quantity

      if (currentStock === 0) {
        throw new Error(
          `المنتج "${product.title}" غير متوفر حالياً (نفد المخزون). يرجى إزالته من سلتك.`
        )
      }

      if (requestedQty > currentStock) {
        throw new Error(
          `الكمية المطلوبة من "${product.title}" (${requestedQty}) تتجاوز المخزون المتاح (${currentStock} قطعة).`
        )
      }
    } catch (err: any) {
      // Re-throw our custom stock messages; swallow not-found errors gracefully
      if (err.message && (err.message.includes('غير متوفر') || err.message.includes('تتجاوز'))) {
        throw err
      }
    }
  }

  return data
}
