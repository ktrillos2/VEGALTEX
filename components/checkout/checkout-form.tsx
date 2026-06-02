"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Script from "next/script"
import { toast } from "sonner"
import { Loader2, ShieldCheck, Truck } from "lucide-react"

import { useCart } from "@/lib/context/cart-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { WOMPI_PUBLIC_KEY, WompiWidgetData } from "@/lib/wompi"
import { cn } from "@/lib/utils"
import { COLOMBIA_LOCATIONS } from "@/lib/colombia-data"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    email: z.string().email("Email inválido"),
    firstName: z.string().min(2, "Nombre requerido"),
    lastName: z.string().min(2, "Apellido requerido"),
    company: z.string().optional(),
    phoneNumber: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
    legalId: z.string().min(5, "Documento requerido"),
    address: z.string().min(5, "Dirección requerida"),
    apartment: z.string().optional(),
    city: z.string().min(3, "Ciudad requerida"),
    region: z.string().min(3, "Departamento requerido"),
    postalCode: z.string().optional(),
})

export function CheckoutForm() {
    const { items, cartTotal, cartCount, clearCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [isWompiLoaded, setIsWompiLoaded] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            phoneNumber: "",
            legalId: "",
            address: "",
            apartment: "",
            city: "",
            region: "",
            postalCode: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (isLoading) return

        if (!isWompiLoaded) {
            toast.error("El sistema de pagos no ha cargado completamente. Por favor recarga la página.")
            return
        }

        if (cartCount === 0) {
            toast.error("El carrito está vacío")
            return
        }

        if (!WOMPI_PUBLIC_KEY) {
            toast.error("Falta configurar la clave pública de Wompi (NEXT_PUBLIC_WOMPI_PUBLIC_KEY)")
            return
        }

        setIsLoading(true)

        try {
            const reference = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            const amountInCents = Math.round(cartTotal * 100) // Ensure integer for signature
            const currency = "COP"

            const response = await fetch("/api/wompi/signature", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference, amount: amountInCents, currency }),
            })

            const data = await response.json()

            if (!response.ok || !data.signature) {
                throw new Error("Error generando firma de seguridad")
            }

            const fullName = `${values.firstName} ${values.lastName}`.trim()
            const fullAddress = values.apartment
                ? `${values.address}, ${values.apartment}`
                : values.address

            const lastOrderPayload = {
                reference,
                currency,
                amountInCents,
                createdAt: new Date().toISOString(),
                status: "PENDING" as const,
                items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                    size: item.size,
                    image: item.image,
                })),
                billing: {
                    email: values.email,
                    fullName,
                    phoneNumber: values.phoneNumber.replace(/\D/g, ""),
                    phoneNumberPrefix: "+57",
                    legalId: values.legalId,
                    legalIdType: "CC",
                    addressLine1: fullAddress,
                    city: values.city,
                    region: values.region,
                    country: "CO",
                },
            }

            const checkoutData: WompiWidgetData = {
                currency,
                amountInCents,
                reference,
                publicKey: WOMPI_PUBLIC_KEY,
                signature: { integrity: data.signature },
                customerData: {
                    email: values.email,
                    fullName: fullName,
                    phoneNumber: values.phoneNumber.replace(/\D/g, ""),
                    phoneNumberPrefix: "+57",
                    legalId: values.legalId,
                    legalIdType: "CC",
                },
                shippingAddress: {
                    addressLine1: fullAddress,
                    city: values.city,
                    region: values.region,
                    country: "CO",
                    phoneNumber: values.phoneNumber.replace(/\D/g, ""),
                }
            }

            // 4. Open Widget
            const checkout = new window.WidgetCheckout(checkoutData)

            checkout.open((result: any) => {
                const transaction = result.transaction
                console.log("Transaction result:", transaction)

                if (transaction.status === "APPROVED") {
                    toast.success("Pago aprobado con éxito")

                    try {
                        localStorage.setItem(
                            "lastOrder",
                            JSON.stringify({
                                ...lastOrderPayload,
                                status: "APPROVED" as const,
                                transaction: {
                                    id: transaction.id,
                                    status: transaction.status,
                                },
                            })
                        )
                    } catch { }

                    clearCart()
                    // The redirectUrl handles the navigation, but if it doesn't trigger automatically:
                    window.location.href = "/thank-you"
                } else if (transaction.status === "DECLINED") {
                    toast.error("Transacción rechazada")
                } else if (transaction.status === "ERROR") {
                    toast.error("Error en la transacción")
                }

                setIsLoading(false)
            })

        } catch (error) {
            console.error(error)
            toast.error("Error iniciando el pago. Intenta nuevamente.")
            setIsLoading(false)
        }
    }

    return (
        <>
            <Script
                src="https://checkout.wompi.co/widget.js"
                onLoad={() => setIsWompiLoaded(true)}
                strategy="lazyOnload"
            />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="bg-white border border-zinc-300 p-6 relative overflow-hidden text-black">
                    {/* Tactical Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-4">
                        <div className="w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center border border-primary/50">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-lg font-bold font-monument uppercase tracking-wider">
                            Información de Facturación
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Row 1: First Name & Last Name */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="font-mono text-xs uppercase text-muted-foreground">Nombre *</Label>
                            <Input
                                id="firstName"
                                {...form.register("firstName")}
                                className={cn(
                                    "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                    form.formState.errors.firstName && "border-red-500 ring-1 ring-red-500"
                                )}
                            />
                            {form.formState.errors.firstName && <p className="text-destructive text-xs font-mono">{form.formState.errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="font-mono text-xs uppercase text-muted-foreground">Apellido *</Label>
                            <Input
                                id="lastName"
                                {...form.register("lastName")}
                                className={cn(
                                    "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                    form.formState.errors.lastName && "border-red-500 ring-1 ring-red-500"
                                )}
                            />
                            {form.formState.errors.lastName && <p className="text-destructive text-xs font-mono">{form.formState.errors.lastName.message}</p>}
                        </div>

                        {/* Row 2: Company (Optional) */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="company" className="font-mono text-xs uppercase text-muted-foreground">Nombre de la compañía (opcional)</Label>
                            <Input
                                id="company"
                                {...form.register("company")}
                                className="bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Row 3: Country */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="country" className="font-mono text-xs uppercase text-muted-foreground">País / Región *</Label>
                            <Input
                                id="country"
                                value="Colombia"
                                readOnly
                                className="bg-zinc-100 border-zinc-300 rounded-none font-mono text-zinc-500 cursor-not-allowed"
                            />
                        </div>

                        {/* Row 4: Street Address */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="font-mono text-xs uppercase text-muted-foreground">Dirección de la calle *</Label>
                            <Input
                                id="address"
                                {...form.register("address")}
                                className={cn(
                                    "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                    form.formState.errors.address && "border-red-500 ring-1 ring-red-500"
                                )}
                                placeholder="Calle 123 # 45 - 67"
                            />
                            {form.formState.errors.address && <p className="text-destructive text-xs font-mono">{form.formState.errors.address.message}</p>}
                        </div>

                        {/* Row 5: Apartment (Optional) */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="apartment" className="font-mono text-xs uppercase text-muted-foreground">Apartamento, habitación, escalera, etc. (opcional)</Label>
                            <Input
                                id="apartment"
                                {...form.register("apartment")}
                                className="bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Row 6: Department */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="region" className="font-mono text-xs uppercase text-muted-foreground">Departamento *</Label>
                            <Select
                                onValueChange={(value) => {
                                    form.setValue("region", value)
                                    form.setValue("city", "") // Reset city
                                }}
                                defaultValue={form.getValues("region")}
                            >
                                <SelectTrigger className={cn(
                                    "bg-white border-zinc-300 focus:ring-primary rounded-none font-mono text-black h-10 w-full",
                                    form.formState.errors.region && "border-red-500 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {Object.keys(COLOMBIA_LOCATIONS).map((dept) => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...form.register("region")} />
                            {form.formState.errors.region && <p className="text-destructive text-xs font-mono">{form.formState.errors.region.message}</p>}
                        </div>

                        {/* Row 7: City */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="city" className="font-mono text-xs uppercase text-muted-foreground">Población / Ciudad *</Label>
                            <Select
                                onValueChange={(value) => form.setValue("city", value)}
                                disabled={!form.watch("region")}
                            >
                                <SelectTrigger className={cn(
                                    "bg-white border-zinc-300 focus:ring-primary rounded-none font-mono text-black h-10 w-full",
                                    form.formState.errors.city && "border-red-500 ring-1 ring-red-500"
                                )}>
                                    <SelectValue placeholder={form.watch("region") ? "Seleccionar Ciudad" : "Seleccione un Departamento primero"} />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {form.watch("region") && COLOMBIA_LOCATIONS[form.watch("region") as keyof typeof COLOMBIA_LOCATIONS]?.map((city) => (
                                        <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" {...form.register("city")} />
                            {form.formState.errors.city && <p className="text-destructive text-xs font-mono">{form.formState.errors.city.message}</p>}
                        </div>

                        {/* Row 8: Postal Code (Optional) */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="postalCode" className="font-mono text-xs uppercase text-muted-foreground">Código postal / ZIP (opcional)</Label>
                            <Input
                                id="postalCode"
                                {...form.register("postalCode")}
                                className="bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Row 9: Phone */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phoneNumber" className="font-mono text-xs uppercase text-muted-foreground">Celular *</Label>
                            <div className="relative">
                                {/* Removed prefix visual as per screenshot likely not showing it, or user request just said "Celular". 
                                    However, previous feedback was "formatting". I'll keep the formatter but clean UI. 
                                    Actually, user image shows just an input. I'll stick to simple input but keep formatter if possible or standard.
                                    User said "colocame todos estos campos", showing a simple input.
                                    I will keep the formatter logic but maybe make it look standard.
                                */}
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    {...form.register("phoneNumber", {
                                        onChange: (e) => {
                                            const input = e.target
                                            let value = input.value.replace(/\D/g, "")
                                            if (value.length > 10) value = value.slice(0, 10)
                                            // Optional formatting
                                            input.value = value
                                        }
                                    })}
                                    className={cn(
                                        "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                        form.formState.errors.phoneNumber && "border-red-500 ring-1 ring-red-500"
                                    )}
                                />
                            </div>
                            {form.formState.errors.phoneNumber && <p className="text-destructive text-xs font-mono">{form.formState.errors.phoneNumber.message}</p>}
                        </div>

                        {/* Row 10: Email */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="email" className="font-mono text-xs uppercase text-muted-foreground">Correo *</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                className={cn(
                                    "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                    form.formState.errors.email && "border-red-500 ring-1 ring-red-500"
                                )}
                            />
                            {form.formState.errors.email && <p className="text-destructive text-xs font-mono">{form.formState.errors.email.message}</p>}
                        </div>

                        {/* Legal ID (Hidden requirement for Wompi but not in Screenshot? I'll keep it at the end or ask. 
                            If I remove it, Wompi might fail if I send empty. 
                            User said "asi para que el wompi funcione". 
                            Wompi strictly requires legalIdType and legalId. 
                            I'll add it at the end clearly.
                         */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="legalId" className="font-mono text-xs uppercase text-muted-foreground">Cédula / Documento (Requerido para Facturación)</Label>
                            <Input
                                id="legalId"
                                {...form.register("legalId")}
                                className={cn(
                                    "bg-white border-zinc-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-none font-mono text-black placeholder:text-zinc-500",
                                    form.formState.errors.legalId && "border-red-500 ring-1 ring-red-500"
                                )}
                            />
                            {form.formState.errors.legalId && <p className="text-destructive text-xs font-mono">{form.formState.errors.legalId.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Removed separate Shipping Info block as we merged everything into Billing Details which serves both */}

                <div className="bg-white border text-black border-zinc-300 p-6 relative overflow-hidden">
                    {/* Tactical Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-4">
                        <div className="w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center border border-primary/50">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-lg font-bold font-monument uppercase tracking-wider text-black">
                            Método de Pago
                        </h2>
                    </div>

                    <div className="bg-zinc-50 border-2 border-primary/50 p-4 flex items-center gap-4 cursor-pointer hover:bg-zinc-100 transition-colors">
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold uppercase tracking-wider text-black">WOMPI</p>
                            <p className="text-xs text-zinc-500 font-mono">Tarjetas, PSE, Nequi, Bancolombia</p>
                        </div>
                        <div className="h-8 relative w-24">
                            <img
                                src="/images/wompi-logo.webp"
                                alt="Wompi Logo"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-14 bg-primary text-primary-foreground font-bold font-monument uppercase tracking-widest text-lg hover:bg-primary/90 rounded-none relative overflow-hidden group"
                >
                    {/* Scanline effect */}
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-[shimmer_1s_infinite]" />

                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            PROCESANDO PAGO...
                        </>
                    ) : (
                        "CONFIRMAR Y PAGAR"
                    )}
                </Button>
            </form>
        </>
    )
}
