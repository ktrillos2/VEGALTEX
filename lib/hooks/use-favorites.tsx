"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { TacticalToast } from "@/components/tactical-toast"

const STORAGE_KEY = "vegaltex-favorites"

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                setFavorites(JSON.parse(stored))
            }
        } catch (e) {
            console.error("Failed to load favorites", e)
        } finally {
            setIsLoaded(true)
        }
    }, [])

    const toggleFavorite = (productId: number, productName: string) => {
        let newFavorites: number[]
        let isAdded = false

        if (favorites.includes(productId)) {
            newFavorites = favorites.filter((id) => id !== productId)
            toast.custom((id) => (
                <TacticalToast title= "SISTEMA ACTUALIZADO" message = {`${productName} eliminado de Destacados`} />
      ), { duration: 4000 })
} else {
    newFavorites = [...favorites, productId]
    isAdded = true
    toast.custom((id) => (
        <TacticalToast title= "OBJETIVO ASIGNADO" message = {`${productName} agregado a Destacados`} />
      ), { duration: 5000 })
    }

setFavorites(newFavorites)
localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites))
return isAdded
  }

const isFavorite = (productId: number) => favorites.includes(productId)

return { favorites, toggleFavorite, isFavorite, isLoaded }
}
