"use client"

import { useCart } from "@/lib/context/cart-context"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Trash2 } from "lucide-react"

export function OrderSummary() {
    const { items, cartTotal, removeItem } = useCart()

    return (
        <div className="bg-white border border-zinc-300 p-6 relative overflow-hidden group text-black">
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary z-10" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary z-10" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary z-10" />

            <h2 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2 font-monument">
                <span className="text-primary">///</span> Resumen de Orden
            </h2>

            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-zinc-500 text-sm font-mono mb-4 uppercase">El carrito está vacío.</p>
                        <a href="/" className="inline-block bg-primary text-black font-bold uppercase text-xs px-4 py-2 hover:bg-[#1dd11b] transition-colors">
                            Regresar a Tienda
                        </a>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-start group/item">
                            <div className="relative w-16 h-16 bg-muted shrink-0 border border-border">
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm truncate uppercase tracking-tight text-black">{item.name}</h3>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-zinc-500 font-mono">
                                        <span className="text-primary">VAR:</span> {item.color} | {item.size}
                                    </p>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-zinc-400 hover:text-red-500 transition-colors"
                                        title="Eliminar producto"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <p className="text-xs text-zinc-500 font-mono">
                                    <span className="text-primary">QTY:</span> {item.quantity}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-mono text-sm font-bold">
                                    ${(item.price * item.quantity).toLocaleString("es-CO")}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Separator className="bg-zinc-300 my-4" />

            <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center text-zinc-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString("es-CO")}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-600">
                    <span>IVA</span>
                    <span>$0</span>
                </div>
            </div>

            <Separator className="bg-zinc-300 my-4" />

            <div className="flex justify-between items-center font-bold text-lg font-monument text-black">
                <span>TOTAL</span>
                <span className="text-primary">${cartTotal.toLocaleString("es-CO")}</span>
            </div>

            <div className="mt-6 p-3 bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-500">
                <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    SISTEMA DE PAGO SEGURO
                </p>
            </div>
        </div>
    )
}
