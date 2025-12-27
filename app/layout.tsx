import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Chakra_Petch, Black_Ops_One, Share_Tech_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "./tactical-toast.css"
import { TacticalLoader } from "@/components/tactical-loader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TacticalCursor } from "@/components/tactical-cursor"

import { Toaster } from "@/components/ui/sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const chakraPetch = Chakra_Petch({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
})
const blackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-ops",
})
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
})

export const metadata: Metadata = {
  title: "TACTICAL PRO - Elite Military & Tactical Gear",
  description:
    "Premium tactical gear engineered for mission-critical performance. Military-grade equipment for professionals.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { CartProvider } from "@/lib/context/cart-context"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${chakraPetch.variable} ${blackOpsOne.variable} ${shareTechMono.variable} cursor-none`}>
        <CartProvider>
          <TacticalCursor />
          <TacticalLoader />
          <SiteHeader />
          <main className="min-h-screen">
            {children}
            <Analytics />
          </main>
          <SiteFooter />
          <WhatsAppButton />
          <Toaster position="top-left" />
        </CartProvider>
      </body>
    </html>
  )
}
