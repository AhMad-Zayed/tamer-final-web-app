import type { CollectionBeforeChangeHook } from 'payload'

export const generateOrderNumber: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create') {
    const date = new Date()
    const year = date.getFullYear()
    const random = Math.floor(Math.random() * 9000) + 1000 // 4 digit random
    data.orderNumber = `TBC-${year}-${random}`
  }

  return data
}
