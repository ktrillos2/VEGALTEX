"use client"

import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function AccessoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="border-b border-white/20">
          <div className="container mx-auto px-4 flex items-center h-16">
            <Link href="/" className="h-24 flex items-center">
              <Image
                src="/images/logo-pdf-vegaltex-1-removebg-preview.png"
                alt="VEGALTEX TACTICAL COLOMBIA"
                width={120}
                height={96}
                className="h-24 w-auto object-contain"
              />
            </Link>

            <div className="flex items-stretch flex-1 h-16 ml-8">
              <nav className="hidden lg:flex items-stretch flex-1">
                <Link
                  href="/pants"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-[#21f31f]/20 flex items-center"
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-[#21f31f]/20 flex items-center"
                >
                  JACKETS
                </Link>
                <Link
                  href="/shirts"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-[#21f31f]/20 flex items-center"
                >
                  SHIRTS
                </Link>
                <Link
                  href="/caps"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-[#21f31f]/20 flex items-center"
                >
                  CAPS
                </Link>
                <Link
                  href="/accessories"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 bg-[#21f31f]/10 flex items-center"
                >
                  ACCESSORIES
                </Link>
              </nav>
              <div className="flex items-stretch ml-auto">
                <button className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-[#21f31f]/20">
                  <Search className="w-5 h-5" />
                </button>
                <button className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-[#21f31f]/20 relative">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-16 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">TACTICAL ACCESSORIES</h1>
        <p className="text-zinc-600">Coming Soon</p>
      </div>
    </div>
  )
}
