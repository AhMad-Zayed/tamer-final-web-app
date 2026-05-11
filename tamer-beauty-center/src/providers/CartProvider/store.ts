import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
  variant?: {
    label: string
    type: string
    additionalPrice: number
  }
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, variantLabel?: string) => void
  updateQuantity: (id: string, quantity: number, variantLabel?: string) => void
  clearCart: () => void
  getSubtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id && item.variant?.label === newItem.variant?.label
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += newItem.quantity
          set({ items: updatedItems })
        } else {
          set({ items: [...items, newItem] })
        }
      },
      removeItem: (id, variantLabel) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.variant?.label === variantLabel)
          ),
        })
      },
      updateQuantity: (id, quantity, variantLabel) => {
        const items = get().items.map((item) => {
          if (item.id === id && item.variant?.label === variantLabel) {
            return { ...item, quantity: Math.max(1, quantity) }
          }
          return item
        })
        set({ items })
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.price + (item.variant?.additionalPrice || 0)
          return total + itemPrice * item.quantity
        }, 0)
      },
    }),
    {
      name: 'tbc-cart-storage',
    }
  )
)
