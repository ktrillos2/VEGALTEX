"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingCart,
  Heart,
  Flag,
  X,
  Droplet,
  Shield,
  Wind,
  Zap,
  Plus,
  Minus,
  Menu,
  Award,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react"

export default function TacticalProLandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

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
    {
      id: 2,
      name: "HUNTER FZ GEN.3 TACTICAL SOFTSHELL JACKET",
      price: 148.75,
      quantity: 1,
      color: "Black",
      size: "M",
      image: "/images/image.png",
    },
  ])

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const products = [
    {
      id: 1,
      name: "P-40 ALL-TERRAIN GEN.2 PANTS",
      price: "$249.99",
      colors: ["#4B5320", "#21f31f", "#333333"],
    },
    {
      id: 2,
      name: "STRIKER HT COMBAT SHIRT",
      price: "$159.99",
      colors: ["#21f31f", "#4B5320", "#333333"],
    },
    {
      id: 3,
      name: "DELTA ACE PLUS GEN.2 JACKET",
      price: "$449.99",
      colors: ["#333333", "#4B5320", "#21f31f"],
    },
    {
      id: 4,
      name: "STRIKER X COMBAT PANTS",
      price: "$279.99",
      colors: ["#4B5320", "#333333", "#21f31f"],
    },
  ]

  const categories = [
    { name: "STRIKER COMBAT PANTS", image: "/tactical-combat-pants-military.jpg", link: "/pants" },
    { name: "TACTICAL JACKETS", image: "/military-tactical-jacket.jpg", link: "/jackets" },
    { name: "COMBAT SHIRTS", image: "/tactical-combat-shirt.jpg", link: "/shirts" },
  ]

  const latestProducts = [
    {
      id: 1,
      name: "HUNTER FZ GEN.3 TACTICAL SOFTSHELL JACKET",
      price: "175€",
      image: "/images/jacket-hunter-olive.jpg",
      badge: "NEW",
      colors: 4,
    },
    {
      id: 2,
      name: "P-40 ALL-TERRAIN GEN.3 TACTICAL PANTS",
      price: "195€",
      image: "/images/pants-p40-olive.jpg",
      badge: "NEW",
      colors: 5,
    },
    {
      id: 3,
      name: "P-40 MARK I RANGE PANTS",
      price: "169€",
      image: "/images/pants-p40-mark-brown.jpg",
      badge: "NEW",
      colors: 5,
    },
    {
      id: 4,
      name: "WAIST/FLEX V-BUCKLE BELT",
      price: "39€",
      image: "/images/accessories-belt-olive.jpg",
      badge: "NEW",
      colors: 2,
    },
  ]

  const testimonials = [
    {
      name: "Special Operations Unit",
      text: "The durability and functionality of Vegaltex gear has proven essential in our operations. Outstanding quality.",
      rating: 5,
    },
    {
      name: "Mountain Rescue Team",
      text: "Weather protection is flawless. We rely on this equipment in the most extreme conditions.",
      rating: 5,
    },
    {
      name: "Law Enforcement",
      text: "Comfort and mobility combined with tactical functionality. This is the gear we trust.",
      rating: 5,
    },
  ]

  const recommendedProducts = [
    {
      id: 1,
      name: "Delta ML Gen.3 Tactical Winter Jacket",
      price: 272,
      image: "/images/product-jacket-1.jpg",
      category: "Jackets",
    },
    {
      id: 2,
      name: "P-40 All-Terrain Gen.2 Tactical Pants",
      price: 185,
      image: "/images/product-pants-1.jpg",
      category: "Pants",
    },
    {
      id: 3,
      name: "Combat Tactical Shirt Pro",
      price: 95,
      image: "/images/product-shirt-1.jpg",
      category: "Shirts",
    },
    {
      id: 4,
      name: "Tactical Operator Cap",
      price: 45,
      image: "/images/product-cap-1.jpg",
      category: "Caps",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)
    const timer = setTimeout(() => {
      // Simulate search API call
      const mockResults = [
        {
          id: 1,
          name: "Delta ML Gen.3 Tactical Winter Jacket",
          price: 272,
          image: "/images/product-jacket-1.jpg",
          category: "Jackets",
        },
        {
          id: 2,
          name: "Hunter FZ Gen.3 Tactical Softshell Jacket",
          price: 148.75,
          image: "/images/product-jacket-2.jpg",
          category: "Jackets",
        },
        {
          id: 3,
          name: "P-40 All-Terrain Gen.2 Tactical Pants",
          price: 185,
          image: "/images/product-pants-1.jpg",
          category: "Pants",
        },
      ].filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchResults(mockResults)
      setSearchLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cart Sidebar - existing code */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-zinc-950 border-l border-[#21f31f]/20 z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#21f31f]/20">
            <h2 className="text-xl font-bold tracking-wide uppercase">YOUR CART ({cartItems.length})</h2>
            <button onClick={() => setCartOpen(false)} className="hover:text-[#21f31f] transition-colors">
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
                      <h3 className="text-sm font-bold mb-2 uppercase leading-tight">{item.name}</h3>
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
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
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
                <span className="text-lg font-bold uppercase">Total:</span>
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

      <div
        className={`fixed inset-x-0 top-0 bg-black/98 backdrop-blur-lg z-50 transition-transform duration-500 ease-out border-b border-[#21f31f]/30 ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-wide text-[#21f31f]">SEARCH</h2>
            <button
              onClick={() => {
                setSearchOpen(false)
                setSearchQuery("")
                setSearchResults([])
              }}
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Search tactical gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-zinc-900 border-[#21f31f]/30 focus:border-[#21f31f] text-white placeholder:text-gray-500 rounded-none text-lg"
              autoFocus
            />
          </div>

          {/* Loading State */}
          {searchLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#21f31f]" />
            </div>
          )}

          {/* Search Results */}
          {!searchLoading && searchQuery && searchResults.length > 0 && (
            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-4">
                SEARCH RESULTS ({searchResults.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 group"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#21f31f] mb-1">{product.category}</p>
                      <h4 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h4>
                      <p className="text-[#21f31f] font-bold">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!searchLoading && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No products found for "{searchQuery}"</p>
            </div>
          )}

          {/* Recommended Products (shown when no search query) */}
          {!searchQuery && (
            <div>
              <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-4">RECOMMENDED PRODUCTS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 group"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[#21f31f] mb-1">{product.category}</p>
                      <h4 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h4>
                      <p className="text-[#21f31f] font-bold">${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header - existing code */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/20">
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
                  href="/pants"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  JACKETS
                </Link>
                <Link
                  href="/shirts"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  SHIRTS
                </Link>
                <Link
                  href="/caps"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  CAPS
                </Link>
                <Link
                  href="/accessories"
                  className="px-6 xl:px-8 h-full font-black text-sm tracking-widest uppercase border-r border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center"
                  style={{ transform: "scaleX(1.1)" }}
                >
                  ACCESSORIES
                </Link>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center px-4 ml-auto border-l border-white/20"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-stretch">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-gradient-to-b hover:from-[#21f31f]/20 hover:to-[#4B5320]/20 transition-all duration-200 flex items-center justify-center"
                >
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

          {mobileMenuOpen && (
            <div className="lg:hidden bg-black border-t border-white/20">
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
                <Link
                  href="/pants"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PANTS
                </Link>
                <Link
                  href="/jackets"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  JACKETS
                </Link>
                <Link
                  href="/shirts"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SHIRTS
                </Link>
                <Link
                  href="/caps"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CAPS
                </Link>
                <Link
                  href="/accessories"
                  className="px-4 py-3 font-black text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
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

      {/* Hero Section - existing code */}
      <section
        className="relative h-[500px] md:h-[700px] flex items-center"
        style={{
          backgroundImage: "url('/tactical-military-operator-action.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-4 md:mb-6 uppercase text-balance">
              DEFINING THE FUTURE OF TACTICAL GEAR
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              Engineered for mission-critical performance in the harshest environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-12 md:h-14 px-8">
                SHOP NOW
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold tracking-wider uppercase rounded-none h-12 md:h-14 px-8 bg-transparent"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-black">
              LATEST PRODUCT DROPS
            </h2>
            <p className="text-lg text-gray-600">Discover our newest tactical innovations</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-[#21f31f] text-black px-4 py-2 font-black text-sm tracking-wider rotate-[-5deg]">
                      {product.badge}
                    </div>
                  </div>
                  <img
                    src={product.image || "/placeholder.svg?height=400&width=300"}
                    alt={product.name}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-bold tracking-wide uppercase mb-2 text-black">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-[#21f31f]">{product.price}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: product.colors }).map((_, idx) => (
                        <div key={idx} className="w-4 h-4 rounded-full bg-zinc-300 border border-zinc-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid - existing code with link addition */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.link}>
                <div className="group relative h-96 overflow-hidden cursor-pointer rounded-none">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold tracking-wide uppercase">{category.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-[#21f31f]">
                      <span className="text-sm font-semibold tracking-wide">EXPLORE</span>
                      <Zap className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[500px] overflow-hidden">
              <img
                src="/images/featured-cold-weather.jpg"
                alt="Delta Cold Weather Gear"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-block bg-[#21f31f] text-black px-3 py-1 text-xs font-bold mb-3">
                  FEATURED COLLECTION
                </div>
                <h3 className="text-3xl font-bold uppercase mb-2">DELTA COLD-WEATHER GEAR</h3>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">
                ENGINEERED FOR EXTREME CONDITIONS
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                With our expertly engineered Delta cold-weather gear, you'll maintain peak agility with exceptional
                warmth. Designed for professionals who operate in the harshest winter environments.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#21f31f] flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Premium insulation technology for superior heat retention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#21f31f] flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Windproof and water-resistant outer shell</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#21f31f] flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Unrestricted mobility for tactical operations</span>
                </li>
              </ul>
              <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-12 px-8">
                MORE INTEL <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers - existing code */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold tracking-wide uppercase mb-12 text-center">BEST SELLERS</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group bg-[#333333] border-[#4B5320] rounded-none overflow-hidden hover:border-[#21f31f] transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <div
                    className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('/tactical-gear-product---product-id-.jpg')`,
                    }}
                  />
                  <Button className="absolute bottom-4 left-4 right-4 bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ADD TO CART
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold tracking-wide uppercase mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-[#21f31f] mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-zinc-600 cursor-pointer hover:border-[#21f31f] transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4">TRUSTED BY PROFESSIONALS</h2>
            <p className="text-lg text-gray-400">Elite units worldwide depend on our gear</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-zinc-950 border-zinc-800 rounded-none p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-[#21f31f]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <p className="font-bold text-sm uppercase tracking-wide text-[#21f31f]">{testimonial.name}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#21f31f] mb-2">25+</div>
              <div className="text-sm uppercase tracking-wide text-gray-400">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#21f31f] mb-2">50K+</div>
              <div className="text-sm uppercase tracking-wide text-gray-400">Professionals Equipped</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#21f31f] mb-2">120+</div>
              <div className="text-sm uppercase tracking-wide text-gray-400">Countries Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#21f31f] mb-2">98%</div>
              <div className="text-sm uppercase tracking-wide text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - existing code */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-wide uppercase mb-6">
                ADVANCED MATERIALS FOR EXTREME CONDITIONS
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our gear integrates cutting-edge technologies like GORE-TEX® and military-grade ripstop fabrics to
                ensure maximum performance when it matters most.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#333333] rounded-none">
                    <Droplet className="w-6 h-6 text-[#21f31f]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wide uppercase mb-2">WATERPROOF</h3>
                    <p className="text-gray-400">
                      Advanced membrane technology keeps you dry in any weather condition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#333333] rounded-none">
                    <Wind className="w-6 h-6 text-[#21f31f]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wide uppercase mb-2">BREATHABLE</h3>
                    <p className="text-gray-400">Moisture-wicking fabrics ensure comfort during intense operations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#333333] rounded-none">
                    <Shield className="w-6 h-6 text-[#21f31f]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wide uppercase mb-2">DURABLE</h3>
                    <p className="text-gray-400">
                      Military-grade ripstop construction withstands the toughest environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] overflow-hidden">
              <img
                src="/tactical-fabric-texture-close-up.jpg"
                alt="Advanced fabric technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-[#21f31f]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-[#21f31f] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-6">JOIN THE ELITE</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Subscribe to get exclusive access to new products, special offers, and tactical gear insights from
              industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-zinc-900 border-2 border-zinc-800 text-white placeholder-gray-500 focus:border-[#21f31f] focus:outline-none rounded-none"
              />
              <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-14 px-8">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - existing code */}
      <footer className="bg-black border-t border-zinc-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-bold tracking-wide uppercase mb-6">SHOP</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/pants" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Pants
                  </Link>
                </li>
                <li>
                  <Link href="/jackets" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Jackets
                  </Link>
                </li>
                <li>
                  <Link href="/shirts" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Shirts
                  </Link>
                </li>
                <li>
                  <Link href="/caps" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Caps
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-wide uppercase mb-6">SUPPORT</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-wide uppercase mb-6">LEGAL</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold tracking-wide uppercase mb-6">NEWSLETTER</h4>
              <p className="text-gray-400 mb-4 text-sm">Stay updated with the latest gear and exclusive offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:border-[#21f31f] focus:outline-none rounded-none text-sm"
                />
                <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold uppercase rounded-none px-4">
                  GO
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center text-gray-500 text-sm">
            <p>&copy; 2025 VEGALTEX TACTICAL COLOMBIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
