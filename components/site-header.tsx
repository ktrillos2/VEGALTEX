"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Heart, Flag, X, Menu, Minus, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products" // Use shared products for search

export function SiteHeader() {
    const [cartOpen, setCartOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])

    // Sample initial cart state
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "CHAQUETA TÁCTICA DE INVIERNO DELTA ML GEN.3",
            price: 272,
            quantity: 1,
            color: "Oliva",
            size: "L",
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

    // Search Logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            setSearchLoading(false)
            return
        }

        setSearchLoading(true)
        const timer = setTimeout(() => {
            // Simulate search API call using centralized products
            const results = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(p => ({
                ...p,
                price: p.salePrice,
                image: p.images[0]
            }))

            setSearchResults(results)
            setSearchLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    return (
        <>
            {/* Cart Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-96 bg-zinc-950 border-l border-[#21f31f]/20 z-50 transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-[#21f31f]/20">
                        <h2 className="text-xl font-bold tracking-wide uppercase text-white">TU CARRITO ({cartItems.length})</h2>
                        <button onClick={() => setCartOpen(false)} className="hover:text-[#21f31f] transition-colors text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-zinc-700" />
                                <p className="text-gray-400">Tu carrito está vacío</p>
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
                                                Color: {item.color} | Talla: {item.size}
                                            </p>
                                            <p className="text-[#21f31f] font-bold mb-2">${item.price}</p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#21f31f] hover:text-black transition-colors rounded-sm text-white"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-6 h-6 flex items-center justify-center bg-zinc-800 hover:bg-[#21f31f] hover:text-black transition-colors rounded-sm text-white"
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
                                PAGAR
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {cartOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setCartOpen(false)} />}

            {/* Search Overlay */}
            <div
                className={`fixed inset-x-0 top-0 bg-black/98 backdrop-blur-lg z-50 transition-transform duration-500 ease-out border-b border-[#21f31f]/30 ${searchOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold tracking-wide text-[#21f31f]">BUSCAR</h2>
                        <button
                            onClick={() => {
                                setSearchOpen(false)
                                setSearchQuery("")
                                setSearchResults([])
                            }}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="mb-8">
                        <Input
                            type="text"
                            placeholder="Buscar equipo táctico..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 bg-zinc-900 border-[#21f31f]/30 focus:border-[#21f31f] text-white placeholder:text-gray-500 rounded-none text-lg"
                            autoFocus
                        />
                    </div>

                    {searchLoading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-[#21f31f]" />
                        </div>
                    )}

                    {!searchLoading && searchQuery && searchResults.length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-4">
                                RESULTADOS DE BÚSQUEDA ({searchResults.length})
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
                                            <h4 className="font-bold text-sm mb-2 line-clamp-2 text-white">{product.name}</h4>
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
                            <p className="text-gray-400">No se encontraron productos para "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 font-monument">
                <div className="bg-gradient-to-b from-[#1a1a1a] to-black">
                    {/* Top Bar */}
                    <div className="border-b border-white/10">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center justify-end h-10 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
                                <div className="hidden md:flex items-center gap-1">
                                    <Flag className="w-3 h-3 text-[#21f31f]" />
                                </div>
                                <span className="mx-3 text-zinc-700 hidden md:block">|</span>
                                <button className="hover:text-[#21f31f] transition-colors hidden md:block">CONTÁCTENOS</button>
                                <span className="mx-3 text-zinc-700 hidden md:block">|</span>
                                <button className="flex items-center gap-2 hover:text-[#21f31f] transition-colors">
                                    <Heart className="w-3 h-3" />
                                    <span className="hidden md:inline">Guardado</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#2e3238] to-[#1a1d21] shadow-lg relative z-20">
                        <div className="container mx-auto px-4">
                            <div className="flex items-stretch h-20 md:h-24">
                                <div className="flex items-center pr-4 md:pr-8 border-r border-[#545659]">
                                    <Link href="/">
                                        <img
                                            src="/images/logo-pdf-vegaltex-1-removebg-preview.png"
                                            alt="VEGALTEX TACTICAL COLOMBIA"
                                            className="h-20 md:h-24 w-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-md"
                                        />
                                    </Link>
                                </div>

                                <nav className="hidden lg:flex items-stretch flex-1 border-r border-[#545659]">
                                    {[
                                        { label: "PANTALONES", href: "/pants" },
                                        { label: "CHAQUETAS", href: "/jackets" },
                                        { label: "CAMISAS", href: "/shirts" },
                                        { label: "GORRAS", href: "/caps" },
                                        { label: "ACCESORIOS", href: "/accessories" }
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="relative px-6 xl:px-10 h-full flex items-center justify-center border-l border-[#545659] border-b border-[#1f2226] overflow-hidden group transition-all duration-200"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#21f31f]/20 via-[#21f31f]/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />
                                            <span className="absolute top-0 left-0 w-full h-[1px] bg-[#21f31f] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-75 z-20" />
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#21f31f] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-75 z-20" />
                                            <span className="font-monument font-bold text-[11px] md:text-xs xl:text-sm tracking-[1.12px] relative z-20 text-gray-300 group-hover:text-[#21f31f] group-hover:drop-shadow-[0_0_8px_rgba(33,243,31,0.5)] transition-all duration-200">
                                                {item.label}
                                            </span>
                                        </Link>
                                    ))}
                                </nav>

                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden flex items-center justify-center px-4 ml-auto border-l border-[#545659] text-white"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>

                                <div className="flex items-stretch">
                                    <button
                                        onClick={() => setSearchOpen(true)}
                                        className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-[#21f31f]/10 hover:text-[#21f31f] transition-colors duration-200 flex items-center justify-center text-white"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setCartOpen(true)}
                                        className="px-4 md:px-8 h-full border-l border-white/20 hover:bg-[#21f31f]/10 hover:text-[#21f31f] transition-colors duration-200 flex items-center justify-center relative text-white"
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
                                    {[
                                        { label: "PANTALONES", href: "/pants" },
                                        { label: "CHAQUETAS", href: "/jackets" },
                                        { label: "CAMISAS", href: "/shirts" },
                                        { label: "GORRAS", href: "/caps" },
                                        { label: "ACCESORIOS", href: "/accessories" }
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="px-4 py-3 font-bold text-sm tracking-widest uppercase hover:bg-[#21f31f]/20 hover:text-[#21f31f] transition-all text-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#CCCCCC] font-sans">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center h-10 gap-2 text-xs md:text-sm font-black uppercase">
                            <Flag className="w-3 md:w-4 h-3 md:h-4 text-[#21f31f]" />
                            <span className="text-black text-center">ENVÍO Y DEVOLUCIONES GRATIS EN CADA PEDIDO.</span>
                            <a href="#" className="text-[#4B5320] font-black hover:underline hidden md:inline">
                                EMPIEZA AQUÍ
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-[146px] md:h-[162px]" />
        </>
    )
}
