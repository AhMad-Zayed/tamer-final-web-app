import type { CollectionAfterChangeHook } from 'payload'

export const decrementStock: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  // Only fire on order creation (not updates/patches)
  if (operation !== 'create') return doc

  const { payload } = req

  if (!doc.items || !Array.isArray(doc.items)) return doc

  for (const item of doc.items) {
    if (!item.product || !item.quantity) continue

    const productId = typeof item.product === 'object' ? item.product.id : item.product

    try {
      const product = await payload.findByID({
        collection: 'products',
        id: productId,
      })

      const currentStock = product.stock ?? 0
      const newStock = Math.max(0, currentStock - item.quantity)

      await payload.update({
        collection: 'products',
        id: productId,
        data: {
          stock: newStock,
        },
        // Skip hooks/access control for internal system update
        overrideAccess: true,
      })

      payload.logger.info(
        `[StockHook] Product "${product.title}" stock: ${currentStock} → ${newStock} (order #${doc.orderNumber})`
      )
    } catch (err) {
      // Log but don't throw — order is already created, stock sync is best-effort
      payload.logger.error(`[StockHook] Failed to decrement stock for product ${productId}: ${String(err)}`)
    }
  }

  return doc
}
