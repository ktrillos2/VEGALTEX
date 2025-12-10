"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function ShirtsPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({})

  const shirts = [
    {
      id: 1,
      name: "STRIKER COMBAT SHIRT GEN.3",
      originalPrice: 89,
      salePrice: 75.65,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#8B7355"],
      images: [
        "/images/products/shirt-striker-olive.jpg",
        "/images/products/shirt-striker-black.jpg",
        "/images/products/shirt-striker-gray.jpg",
        "/images/products/shirt-striker-tan.jpg",
      ],
    },
    {
      id: 2,
      name: "DELTA TACTICAL SHIRT",
      originalPrice: 95,
      salePrice: 80.75,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/shirt-delta-olive.jpg",
        "/images/products/shirt-delta-black.jpg",
        "/images/products/shirt-delta-gray.jpg",
        "/images/products/shirt-delta-navy.jpg",
      ],
    },
    {
      id: 3,
      name: "HUNTER LONG SLEEVE SHIRT",
      originalPrice: 79,
      salePrice: 67.15,
      discount: 15,
      colors: ["#4B5320", "#000000", "#8B7355"],
      images: [
        "/images/products/shirt-hunter-olive.jpg",
        "/images/products/shirt-hunter-black.jpg",
        "/images/products/shirt-hunter-tan.jpg",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as pants page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="border-b border-white/20">
          <div className="container mx-auto px-4 flex items-center h-16">
            <Link href="/" className="h-24 flex items-center">
              <Image
                src="/images/logo-pdf-vegaltex-1-removebg-preview.png"
                alt="VEGALTEX TACTICAL COLOMBIA"
                width={120}
                height={96}
                className="h-24 w-auto object-contain hover:scale-105 transition-transform"
              />
            </Link>

            <div className="flex items-stretch flex-1 h-16 ml-8">
              <nav className="hidden lg:flex items-stretch flex-1">
                <Link
                  href="/pants"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                >
                  JACKETS
                </Link>
                <Link
                  href="/shirts"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center bg-[#21f31f]/10"
                >
                  SHIRTS
                </Link>
                <Link
                  href="/caps"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                >
                  CAPS
                </Link>
                <Link
                  href="/accessories"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                >
                  ACCESSORIES
                </Link>
              </nav>

              <div className="flex items-stretch ml-auto">
                <button className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center justify-center relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-4 right-2 md:right-4 bg-[#21f31f] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[60vh] mt-16 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/shirts-hero-banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider text-white mb-4">COMBAT SHIRTS</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Moisture-wicking performance fabrics designed for maximum comfort under armor.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-zinc-100 border-b border-zinc-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">ALL SHIRTS - 3 RESULTS</h2>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-none border-zinc-400 bg-transparent">
              TYPE
            </Button>
            <Button variant="outline" className="rounded-none border-zinc-400 bg-transparent">
              COLOUR
            </Button>
            <Button variant="outline" className="rounded-none border-zinc-400 bg-transparent">
              SIZE
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shirts.map((shirt) => {
              const selectedColorIndex = selectedColors[shirt.id] || 0
              const currentImage = shirt.images[selectedColorIndex]

              return (
                <Card
                  key={shirt.id}
                  className="group bg-white border-zinc-300 rounded-none overflow-hidden hover:border-[#21f31f] hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-black text-white px-4 py-8 font-black text-xs uppercase z-10 transform rotate-45 translate-x-8 -translate-y-4 origin-bottom-left">
                      <div className="transform -rotate-45 flex flex-col items-center">
                        <span className="text-[#21f31f]">BLACK</span>
                        <span className="text-[#21f31f]">FRIDAY</span>
                        <span className="text-yellow-400 text-sm mt-1">-{shirt.discount}%</span>
                      </div>
                    </div>

                    <div
                      className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${currentImage}')` }}
                    />
                    <Button className="absolute bottom-4 left-4 right-4 bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ADD TO CART
                    </Button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm font-bold tracking-wide uppercase mb-3 h-10 line-clamp-2">{shirt.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg line-through text-zinc-500">{shirt.originalPrice}€</span>
                      <span className="text-2xl font-bold text-[#21f31f]">{shirt.salePrice}€</span>
                      <span className="ml-auto text-[#21f31f] text-sm">✓</span>
                    </div>
                    <div className="flex gap-2">
                      {shirt.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColors({ ...selectedColors, [shirt.id]: idx })}
                          className={`w-6 h-6 rounded-sm border-2 cursor-pointer hover:border-[#21f31f] transition-colors ${
                            selectedColorIndex === idx ? "border-[#21f31f] ring-2 ring-[#21f31f]/30" : "border-zinc-400"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setCartOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">CART ({cartItems.length})</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-center text-zinc-500">Your cart is empty</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
