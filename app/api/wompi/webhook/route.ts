import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { event, data, signature, timestamp } = body

        // 1. Verificar firma (Opcional pero recomendado para seguridad)
        const eventsSecret = process.env.WOMPI_EVENTS_SECRET
        if (eventsSecret && signature && signature.checksum) {
            const properties = signature.properties || []
            
            // Construir la cadena para el hash basada en las propiedades en orden
            let stringToHash = ""
            for (const prop of properties) {
                const keys = prop.split('.')
                let val: any = data
                for (const k of keys) {
                    val = val?.[k]
                }
                stringToHash += val
            }
            
            stringToHash += `${timestamp}${eventsSecret}`
            
            const expectedChecksum = crypto.createHash('sha256').update(stringToHash).digest('hex')
            if (expectedChecksum !== signature.checksum) {
                console.error("Firma de webhook de Wompi inválida")
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
            }
        }

        // 2. Procesar el evento de actualización de transacción
        if (event === "transaction.updated") {
            const transaction = data.transaction
            const { id, status, reference, amount_in_cents } = transaction
            
            console.log(`Webhook recibido: Transacción ${id} para referencia ${reference} está en estado ${status}`)
            
            if (status === "APPROVED") {
                // TODO: [SANITY] Implementar actualización del esquema de Pedido
                // Aquí se buscará el pedido por `reference` en Sanity y se actualizará su estado a PAGADO/APPROVED
                console.log(`[TODO Sanity] Actualizar pedido con referencia ${reference} a estado APROBADO`)

                // TODO: [RESEND] Implementar envío de correos
                // Aquí se enviará el correo de confirmación de pago, y se preparará el flujo para envío y entrega
                console.log(`[TODO Resend] Enviar correo de confirmación de pago al cliente`)
            } else if (status === "DECLINED" || status === "ERROR" || status === "VOIDED") {
                // TODO: [SANITY] Actualizar estado a rechazado o cancelado
                console.log(`[TODO Sanity] Actualizar pedido con referencia ${reference} a estado RECHAZADO/ERROR`)
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error en webhook de Wompi:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
