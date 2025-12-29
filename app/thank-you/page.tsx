"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { formatCOP } from "@/lib/utils"

type LastOrder = {
    reference: string
    currency: "COP" | string
    amountInCents: number
    createdAt: string
    status: "PENDING" | "APPROVED"
    items: Array<{
        id: string
        name: string
        price: number
        quantity: number
        color: string
        size: string
        image?: string
    }>
    billing: {
        email: string
        fullName: string
        phoneNumber: string
        phoneNumberPrefix: string
        legalId: string
        legalIdType: string
        addressLine1: string
        city: string
        region: string
        country: string
    }
    transaction?: {
        id?: string
        status?: string
    }
}

export default function ThankYouPage() {
    const [order, setOrder] = useState<LastOrder | null>(null)

    useEffect(() => {
        try {
            const raw = localStorage.getItem("lastOrder")
            if (!raw) return
            const parsed = JSON.parse(raw) as LastOrder
            setOrder(parsed)
        } catch {
            setOrder(null)
        }
    }, [])

    const totalCOP = useMemo(() => {
        if (!order) return 0
        return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }, [order])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse border border-primary/50">
                <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>

            <h1 className="text-4xl md:text-6xl font-monument uppercase mb-4">
                ¡Misión Cumplida!
            </h1>

            <p className="font-mono text-muted-foreground max-w-lg mb-8 text-lg">
                Tu orden ha sido confirmada y procesada con éxito. Recibirás un correo con los detalles de tu misión táctica.
            </p>

            <div className="bg-card border border-border p-8 max-w-3xl w-full mb-10 relative overflow-hidden text-left">
                {/* Tactical Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />

                <h3 className="font-monument text-xl mb-2 text-primary">Estado: Aprobado</h3>
                <p className="font-mono text-sm text-muted-foreground mb-6">
                    Gracias por equiparte con nosotros. Tu equipamiento será despachado a la brevedad.
                </p>

                {!order ? (
                    <p className="font-mono text-sm text-muted-foreground">
                        No encontramos el detalle de la orden en este dispositivo. Si necesitas soporte, contáctanos.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-monument text-sm uppercase tracking-widest mb-3 text-black">Productos Comprados</h4>
                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start border border-border p-3 bg-white">
                                        <div className="relative w-14 h-14 bg-muted shrink-0 border border-border">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            ) : null}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-sm uppercase text-black truncate">{item.name}</p>
                                            <p className="font-mono text-xs text-muted-foreground">
                                                {item.color} | {item.size} | x{item.quantity}
                                            </p>
                                            <p className="font-mono text-sm font-bold text-black">
                                                {formatCOP(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                                <span className="font-monument uppercase text-sm text-black">Total</span>
                                <span className="font-monument text-primary">{formatCOP(totalCOP)}</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-monument text-sm uppercase tracking-widest mb-3 text-black">Información de Facturación</h4>
                            <div className="space-y-2 font-mono text-sm text-muted-foreground">
                                <div><span className="text-black font-bold">Nombre:</span> {order.billing.fullName}</div>
                                <div><span className="text-black font-bold">Correo:</span> {order.billing.email}</div>
                                <div><span className="text-black font-bold">Celular:</span> {order.billing.phoneNumberPrefix}{order.billing.phoneNumber}</div>
                                <div><span className="text-black font-bold">Documento:</span> {order.billing.legalIdType} {order.billing.legalId}</div>
                                <div><span className="text-black font-bold">Dirección:</span> {order.billing.addressLine1}</div>
                                <div><span className="text-black font-bold">Ciudad:</span> {order.billing.city}</div>
                                <div><span className="text-black font-bold">Departamento:</span> {order.billing.region}</div>
                                <div><span className="text-black font-bold">Referencia:</span> {order.reference}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Button asChild className="h-14 px-8 bg-primary text-primary-foreground font-bold font-monument uppercase tracking-widest hover:bg-primary/90 rounded-none">
                <Link href="/">
                    Volver a la Base
                </Link>
            </Button>
        </div>
    )
}
