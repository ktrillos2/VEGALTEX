import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { TacticalLoader } from "@/components/tactical-loader"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const chakraPetch = Chakra_Petch({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${chakraPetch.variable}`}>
        <TacticalLoader />
        <SiteHeader />
        <main className="min-h-screen">
          {children}
          <Analytics />
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
