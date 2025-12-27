export const WOMPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ""

export type WompiWidgetData = {
    currency: string
    amountInCents: number
    reference: string
    publicKey: string
    signature: { integrity: string }
    redirectUrl?: string
    expirationTime?: string
    taxInCents?: {
        vat?: number
        consumption?: number
    }
    customerData?: {
        email?: string
        fullName?: string
        phoneNumber?: string
        phoneNumberPrefix?: string
        legalId?: string
        legalIdType?: string
    }
    shippingAddress?: {
        addressLine1: string
        city: string
        phoneNumber: string
        region: string
        country: string
    }
}

declare global {
    interface Window {
        WidgetCheckout: any
    }
}
