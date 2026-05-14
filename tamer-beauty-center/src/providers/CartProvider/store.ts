import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

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
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
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
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (newItem) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id && item.variant?.label === newItem.variant?.label
        )

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
          }
          set({ items: updatedItems })
        } else {
          set({ items: [...items, newItem] })
        }

        // Open the drawer automatically
        set({ isDrawerOpen: true })

        // Show luxury Arabic toast
        toast.success(`تمت الإضافة إلى السلة`, {
          description: newItem.title,
          duration: 3000,
          style: {
            background: '#131313',
            border: '1px solid rgba(195, 244, 0, 0.3)',
            color: '#ffffff',
            fontFamily: "'Noto Kufi Arabic', sans-serif",
            direction: 'rtl',
            borderRadius: '16px',
            boxShadow: '0 0 30px rgba(195, 244, 0, 0.12)',
          },
        })
      },
      removeItem: (id, variantLabel) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.variant?.label === variantLabel)
          ),
        })
      },
      updateQuantity: (id, quantity, variantLabel) => {
        if (quantity < 1) {
          get().removeItem(id, variantLabel)
          return
        }
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
      partialize: (state) => ({
        items: state.items,
        // Do NOT persist drawer state — always start closed
      }),
    }
  )
)
