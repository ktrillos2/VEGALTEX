"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShieldCheck, MapPin, User, FileText, ArrowRight, Crosshair, Terminal } from "lucide-react"
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
}

export default function ThankYouPage() {
    const [order, setOrder] = useState<LastOrder | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
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

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden font-mono selection:bg-primary selection:text-black">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(0,255,0,0.5)]"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center mb-12 space-y-4 relative">
                    <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-1 rounded-full text-xs text-primary uppercase tracking-[0.2em] mb-4 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        Transmisión Segura Establecida
                    </div>
                    <h1 className="text-5xl md:text-7xl font-monument uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        Misión Cumplida
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl font-light">
                        El comando central ha recibido tu solicitud. <br className="hidden md:block" /> Operación en proceso de despliegue.
                    </p>
                </div>

                {/* Main Tactical Card */}
                <div className="w-full bg-[#0a0a0a] border border-white/10 relative shadow-2xl overflow-hidden group">
                    {/* Decorative HUD Elements */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-20"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary z-20"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary z-20"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-20"></div>

                    {/* Scanning Line Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[2s] pointer-events-none z-0"></div>

                    <div className="relative z-10 p-6 md:p-10">
                        {!order ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                <Terminal className="w-16 h-16 text-muted-foreground/50" />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Sin Datos de Misión</h3>
                                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                                        No se encontraron registros de operaciones recientes en este terminal.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {/* Status Banner */}
                                <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-white/10 pb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-none border border-primary/20 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                                            <ShieldCheck className="w-8 h-8 text-primary relative z-10" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Estado de Operación</div>
                                            <div className="text-2xl font-monument uppercase text-primary tracking-wide">Aprobado</div>
                                            <div className="text-xs text-muted-foreground font-mono mt-1">REF: {order.reference}</div>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Fecha de Registro</div>
                                        <div className="text-sm font-mono text-white">27 DEC 2025 - 14:30 HRS</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                    {/* Column 1 & 2: Manifest (Products) */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Crosshair className="w-4 h-4 text-primary" />
                                            <h3 className="font-monument text-sm uppercase tracking-widest text-white">Manifiesto de Carga</h3>
                                        </div>

                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group/item">
                                                    <div className="relative w-20 h-24 bg-black border border-white/10 shrink-0 overflow-hidden">
                                                        {item.image ? (
                                                            <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                                <FileText className="w-6 h-6 text-white/20" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 py-1">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-bold text-sm uppercase text-white truncate pr-4">{item.name}</h4>
                                                            <span className="font-mono text-sm text-primary">{formatCOP(item.price * item.quantity)}</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground mb-3">
                                                            <span className="px-1.5 py-0.5 border border-white/10 bg-black">TALLA: {item.size}</span>
                                                            <span className="px-1.5 py-0.5 border border-white/10 bg-black">COLOR: {item.color}</span>
                                                            <span className="px-1.5 py-0.5 border border-white/10 bg-black">QTY: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center p-4 bg-primary/5 border border-primary/20 mt-4">
                                            <span className="font-monument uppercase text-sm">Total Autorizado</span>
                                            <span className="font-monument text-xl text-primary">{formatCOP(totalCOP)}</span>
                                        </div>
                                    </div>

                                    {/* Column 3: Intel (Billing) */}
                                    <div className="space-y-6 relative">
                                        {/* Decorative Sidebar Line */}
                                        <div className="absolute -left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block"></div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Terminal className="w-4 h-4 text-primary" />
                                                <h3 className="font-monument text-sm uppercase tracking-widest text-white">Datos de Intel</h3>
                                            </div>

                                            <div className="bg-white/5 border border-white/5 p-5 space-y-6 text-sm font-mono">

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground tracking-wider">
                                                        <User className="w-3 h-3" /> Agente
                                                    </div>
                                                    <div className="text-white font-medium border-b border-white/10 pb-1">
                                                        {order.billing.fullName}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground truncate">{order.billing.email}</div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground tracking-wider">
                                                        <MapPin className="w-3 h-3" /> Coordenadas de Entrega
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.billing.addressLine1}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {order.billing.city}, {order.billing.region}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground tracking-wider">
                                                        <Terminal className="w-3 h-3" /> Contacto
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.billing.phoneNumberPrefix} {order.billing.phoneNumber}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mt-6 p-4 border border-dashed border-white/20 bg-black/50 text-xs text-muted-foreground text-center">
                                                <p>La información de esta misión ha sido encriptada y enviada a tu dispositivo.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12">
                    <Button asChild size="lg" className="group relative bg-white text-black hover:bg-white/90 font-monument uppercase tracking-widest px-10 h-14 rounded-none overflow-hidden hover:pr-14 transition-all duration-300">
                        <Link href="/">
                            <span className="relative z-10 transition-transform group-hover:-translate-x-2">Volver a la Base</span>
                            <div className="absolute right-0 top-0 h-full w-12 bg-primary flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300">
                                <ArrowRight className="w-6 h-6 text-black" />
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
