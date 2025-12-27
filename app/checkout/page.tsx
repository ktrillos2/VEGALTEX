"use client"

import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { useCart } from "@/lib/context/cart-context"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CheckoutPage() {
    const { items } = useCart()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null // Avoid hydration mismatch
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl md:text-5xl font-monument uppercase mb-8">
                    <span className="text-primary">///</span> Carrito Vacío
                </h1>
                <p className="text-zinc-400 font-mono mb-8 text-lg uppercase">
                    No hay productos en tu carrito de suministros.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-primary text-black font-bold font-monument uppercase tracking-widest text-lg px-8 py-4 hover:bg-[#1dd11b] transition-colors skew-x-[-10deg]"
                >
                    <span className="skew-x-[10deg]">Regresar a la Tienda</span>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-5xl font-monument uppercase mb-12 text-center">
                <span className="text-primary">///</span> Finalizar Compra
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form (2/3 width on large screens) */}
                <div className="lg:col-span-2">
                    <CheckoutForm />
                </div>

                {/* Right Column: Order Summary (1/3 width) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}
