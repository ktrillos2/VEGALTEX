"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, ShoppingCart, Heart, Flag, X, ChevronDown, Plus, Minus, Menu } from "lucide-react"

export default function JacketsPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "DELTA ML GEN.3 TACTICAL WINTER JACKET",
      price: 272,
      quantity: 1,
      color: "Olive",
      size: "L",
      image: "/images/image.png",
    },
  ])

  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const jackets = [
    {
      id: 1,
      name: "HUNTER FZ GEN.3 TACTICAL SOFTSHELL JACKET",
      originalPrice: 175,
      salePrice: 148.75,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-hunter-olive.jpg",
        "/images/products/jacket-hunter-black.jpg",
        "/images/products/jacket-hunter-gray.jpg",
        "/images/products/jacket-hunter-navy.jpg",
      ],
    },
    {
      id: 2,
      name: "DELTA ML GEN.3 TACTICAL WINTER JACKET",
      originalPrice: 320,
      salePrice: 272,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-delta-ml-olive.jpg",
        "/images/products/jacket-delta-ml-black.jpg",
        "/images/products/jacket-delta-ml-gray.jpg",
        "/images/products/jacket-delta-ml-navy.jpg",
      ],
    },
    {
      id: 3,
      name: "DELTA ACE PLUS GEN.3 TACTICAL WINTER JACKET",
      originalPrice: 290,
      salePrice: 246.5,
      discount: 15,
      colors: ["#4B5320", "#000000", "#8B7355", "#2d3e50", "#5a5a5a"],
      images: [
        "/images/products/jacket-ace-olive.jpg",
        "/images/products/jacket-ace-black.jpg",
        "/images/products/jacket-ace-tan.jpg",
        "/images/products/jacket-ace-navy.jpg",
        "/images/products/jacket-ace-gray.jpg",
      ],
    },
    {
      id: 4,
      name: "DELTA OL 4.0 TACTICAL WINTER JACKET",
      originalPrice: 399,
      salePrice: 339.15,
      discount: 15,
      colors: ["#4B5320", "#000000", "#2d3e50", "#5a5a5a", "#8B7355"],
      images: [
        "/images/products/jacket-ol-olive.jpg",
        "/images/products/jacket-ol-black.jpg",
        "/images/products/jacket-ol-navy.jpg",
        "/images/products/jacket-ol-gray.jpg",
        "/images/products/jacket-ol-tan.jpg",
      ],
    },
    {
      id: 5,
      name: "DELTA ACS GEN.3 TACTICAL WINTER JACKET",
      originalPrice: 350,
      salePrice: 297.5,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-acs-winter-olive.jpg",
        "/images/products/jacket-acs-winter-black.jpg",
        "/images/products/jacket-acs-winter-gray.jpg",
        "/images/products/jacket-acs-winter-navy.jpg",
      ],
    },
    {
      id: 6,
      name: "DELTA ACS GEN.3 TACTICAL SOFTSHELL JACKET",
      originalPrice: 290,
      salePrice: 246.5,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-acs-soft-olive.jpg",
        "/images/products/jacket-acs-soft-black.jpg",
        "/images/products/jacket-acs-soft-gray.jpg",
        "/images/products/jacket-acs-soft-navy.jpg",
      ],
    },
    {
      id: 7,
      name: "STRIKER ULT COMBAT JACKET",
      originalPrice: 270,
      salePrice: 229.5,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-striker-ult-olive.jpg",
        "/images/products/jacket-striker-ult-black.jpg",
        "/images/products/jacket-striker-ult-gray.jpg",
        "/images/products/jacket-striker-ult-navy.jpg",
      ],
    },
    {
      id: 8,
      name: "STRIKER HT COMBAT JACKET",
      originalPrice: 299,
      salePrice: 254.15,
      discount: 15,
      colors: ["#4B5320", "#000000", "#5a5a5a", "#2d3e50"],
      images: [
        "/images/products/jacket-striker-ht-olive.jpg",
        "/images/products/jacket-striker-ht-black.jpg",
        "/images/products/jacket-striker-ht-gray.jpg",
        "/images/products/jacket-striker-ht-navy.jpg",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-zinc-950 border-l border-[#21f31f]/20 z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#21f31f]/20">
            <h2 className="text-xl font-bold tracking-wide uppercase text-white">YOUR CART ({cartItems.length})</h2>
            <button onClick={() => setCartOpen(false)} className="hover:text-[#21f31f] transition-colors text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-zinc-800">
                    <div className="w-24 h-24 bg-zinc-900 rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold mb-2 uppercase leading-tight text-white">{item.name}</h3>
                      <p className="text-xs text-gray-400 mb-1">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <p className="text-[#21f31f] font-bold mb-2">${item.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#21f31f] hover:text-black transition-colors rounded-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#21f31f] hover:text-black transition-colors rounded-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-[#21f31f]/20 p-6 bg-black">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold uppercase text-white">Total:</span>
                <span className="text-2xl font-bold text-[#21f31f]">${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-12">
                CHECKOUT
              </Button>
            </div>
          )}
        </div>
      </div>

      {cartOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setCartOpen(false)} />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#0a0a0a] border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end h-10 text-xs font-black text-white uppercase tracking-widest">
              <div className="hidden md:flex items-center gap-1">
                <Flag className="w-3 h-3 text-[#21f31f]" />
              </div>
              <span className="mx-3 text-zinc-700 hidden md:block">|</span>
              <button className="hover:text-[#21f31f] transition-colors hidden md:block">CONTACT US</button>
              <span className="mx-3 text-zinc-700 hidden md:block">|</span>
              <button className="hover:text-[#21f31f] transition-colors hidden md:block">SUBSCRIBE</button>
              <span className="mx-3 text-zinc-700 hidden md:block">|</span>
              <button className="hover:text-[#21f31f] transition-colors hidden md:block">BLOG</button>
              <span className="mx-3 text-zinc-700 hidden md:block">|</span>
              <button className="hover:text-[#21f31f] transition-colors hidden md:block">LOCATIONS</button>
              <span className="mx-3 text-zinc-700 hidden md:block">|</span>
              <button className="flex items-center gap-2 hover:text-[#21f31f] transition-colors">
                <Heart className="w-3 h-3" />
                <span className="hidden md:inline">Saved gear</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#333333] to-black">
          <div className="container mx-auto px-4">
            <div className="flex items-stretch h-24 md:h-28">
              <div className="flex items-center pr-4 md:pr-8 border-r border-white/20">
                <Link href="/">
                  <img
                    src="/images/logo-pdf-vegaltex-1-removebg-preview.png"
                    alt="VEGALTEX TACTICAL COLOMBIA"
                    className="h-20 md:h-24 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <nav className="hidden lg:flex items-stretch flex-1">
                <Link
                  href="/"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center text-white"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 bg-gradient-to-b from-[#21f31f]/20 to-[#4B5320]/20 transition-all duration-200 flex items-center text-white"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  JACKETS
                </Link>
                <Link
                  href="/"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center text-white"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  SHIRTS
                </Link>
                <Link
                  href="/"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center text-white"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  CAPS
                </Link>
                <Link
                  href="/"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center text-white"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  ACCESSORIES
                </Link>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center px-4 ml-auto border-l border-white/20 text-white"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-stretch">
                <button className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center justify-center text-white">
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center justify-center relative text-white"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-4 right-2 md:right-4 bg-[#21f31f] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-black border-t border-white/20">
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
                <Link
                  href="/"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all text-white"
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase bg-[#21f31f]/20 transition-all text-white"
                >
                  JACKETS
                </Link>
                <Link
                  href="/"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all text-white"
                >
                  SHIRTS
                </Link>
                <Link
                  href="/"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all text-white"
                >
                  CAPS
                </Link>
                <Link
                  href="/"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all text-white"
                >
                  ACCESSORIES
                </Link>
              </nav>
            </div>
          )}
        </div>

        <div className="bg-[#CCCCCC]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-10 gap-2 text-xs md:text-sm font-black uppercase">
              <Flag className="w-3 md:w-4 h-3 md:h-4 text-[#21f31f]" />
              <span className="text-black text-center">UNLOCK FREE SHIPPING & FREE RETURNS WITH EVERY ORDER.</span>
              <a href="#" className="text-[#4B5320] font-black hover:underline hidden md:inline">
                START HERE
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[146px] md:h-[162px]" />

      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[500px] flex items-center"
        style={{
          backgroundImage: "url('/images/image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4 md:mb-6 uppercase text-white">
              VEGALTEX JACKETS
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              Built for deployments in which severe weather & rough terrain will be factors. Browse our industry leading
              combat, tactical and EDC jackets.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-zinc-100 border-b border-zinc-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 md:py-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase text-sm">ALL JACKETS</span>
              <span className="text-zinc-600">9 RESULTS</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-sm font-bold uppercase">FILTER:</span>
              <Button
                variant="outline"
                className="bg-white border-zinc-300 text-black hover:bg-zinc-50 hover:border-[#21f31f] rounded-none uppercase font-bold text-xs"
              >
                TYPE <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="bg-white border-zinc-300 text-black hover:bg-zinc-50 hover:border-[#21f31f] rounded-none uppercase font-bold text-xs"
              >
                COLOUR <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="bg-white border-zinc-300 text-black hover:bg-zinc-50 hover:border-[#21f31f] rounded-none uppercase font-bold text-xs"
              >
                SIZE <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jackets.map((jacket) => {
              const selectedColorIndex = selectedColors[jacket.id] || 0
              const currentImage = jacket.images[selectedColorIndex]

              return (
                <Card
                  key={jacket.id}
                  className="group bg-white border-zinc-300 rounded-none overflow-hidden hover:border-[#21f31f] hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    {/* Black Friday Badge */}
                    <div className="absolute top-0 right-0 bg-black text-white px-4 py-8 font-black text-xs uppercase z-10 transform rotate-45 translate-x-8 -translate-y-4 origin-bottom-left">
                      <div className="transform -rotate-45 flex flex-col items-center">
                        <span className="text-[#21f31f]">BLACK</span>
                        <span className="text-[#21f31f]">FRIDAY</span>
                        <span className="text-yellow-400 text-sm mt-1">-{jacket.discount}%</span>
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
                    <h3 className="text-sm font-bold tracking-wide uppercase mb-3 h-10 line-clamp-2 text-card">{jacket.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg line-through text-zinc-500">{jacket.originalPrice}€</span>
                      <span className="text-2xl font-bold text-[#21f31f]">{jacket.salePrice}€</span>
                      <span className="ml-auto text-[#21f31f] text-sm">✓</span>
                    </div>
                    <div className="flex gap-2">
                      {jacket.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColors({ ...selectedColors, [jacket.id]: idx })}
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
    </div>
  )
}
