"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export type CartItem = {
    id: string // Unique ID (product.id + size + color)
    productId: number
    name: string
    price: number
    image: string
    quantity: number
    color: string
    size: string
}

type CartContextType = {
    items: CartItem[]
    addItem: (product: any, color: string, size: string) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, delta: number) => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsInitialized(true)
    }, [])

    // Save to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isInitialized])

    const addItem = (product: any, color: string, size: string) => {
        const uniqueId = `${product.id}-${color}-${size}`

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === uniqueId)

            if (existingItem) {
                toast.success("Cantidad actualizada en el carrito")
                return currentItems.map((item) =>
                    item.id === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
                )
            }

            toast.success("Producto agregado al carrito")
            return [
                ...currentItems,
                {
                    id: uniqueId,
                    productId: product.id,
                    name: product.name,
                    price: product.price || product.salePrice,
                    image: product.image || product.colors?.find((c: any) => c.name === color)?.images[0],
                    quantity: 1,
                    color,
                    size,
                },
            ]
        })
    }

    const removeItem = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
        toast.info("Producto eliminado del carrito")
    }

    const updateQuantity = (id: string, delta: number) => {
        setItems((currentItems) =>
            currentItems
                .map((item) => {
                    if (item.id === id) {
                        const newQuantity = Math.max(0, item.quantity + delta)
                        return { ...item, quantity: newQuantity }
                    }
                    return item
                })
                .filter((item) => item.quantity > 0)
        )
    }

    const clearCart = () => {
        setItems([])
        localStorage.removeItem("cart")
    }

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
