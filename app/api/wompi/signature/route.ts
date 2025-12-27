import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { reference, amount, currency } = body

        if (!reference || !amount || !currency) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const integritySecret = process.env.WOMPI_INTEGRITY_SECRET
        if (!integritySecret) {
            return NextResponse.json({ error: "Missing Wompi integrity secret (WOMPI_INTEGRITY_SECRET)" }, { status: 500 })
        }
        const chain = `${reference}${amount}${currency}${integritySecret}`

        const signature = crypto.createHash("sha256").update(chain).digest("hex")

        return NextResponse.json({ signature })
    } catch (error) {
        console.error("Error generating Wompi signature:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
