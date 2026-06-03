"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Heart, Flag, X, Menu, Minus, Plus, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products" // Use shared products for search
import { formatCOP } from "@/lib/utils"

import { useCart } from "@/lib/context/cart-context" // Add import
import { useFavorites } from "@/lib/hooks/use-favorites"

export function SiteHeader() {
    const pathname = usePathname()
    const [cartOpen, setCartOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Use Cart Logic
    const { items: cartItems, updateQuantity, cartTotal, cartCount, removeItem } = useCart()
    const { favorites } = useFavorites()

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 100)
        }
    }, [searchOpen])

    // Search Logic (kept logic related to searches...)
    // ...


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
                className={`fixed inset-y-0 right-0 w-full md:w-96 bg-zinc-950 border-l border-[#21f31f]/20 z-[70] transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"
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
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-[#21f31f] font-bold">{formatCOP(item.price)}</p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                                    title="Eliminar producto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
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
                                <span className="text-2xl font-bold text-[#21f31f]">{formatCOP(cartTotal)}</span>
                            </div>
                            <Link href="/checkout" onClick={() => setCartOpen(false)}>
                                <Button className="w-full bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-12">
                                    PAGAR
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {cartOpen && <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setCartOpen(false)} />}

            {/* Search Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${searchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
                onClick={() => setSearchOpen(false)}
            />
            <div
                className={`fixed inset-0 bg-black/95 z-[70] transition-all duration-500 ease-in-out flex flex-col ${searchOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
                    }`}
            >
                <div className="container mx-auto px-4 py-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-wide text-[#21f31f] font-monument">BUSCAR</h2>
                        <button
                            onClick={() => {
                                setSearchOpen(false)
                                setSearchQuery("")
                                setSearchResults([])
                            }}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="mb-12">
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="¿Qué estás buscando hoy?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-16 bg-zinc-900/50 border-b-2 border-[#21f31f]/30 focus:border-[#21f31f] border-t-0 border-x-0 rounded-none text-2xl text-white placeholder:text-gray-500 px-0 focus-visible:ring-0"
                            autoFocus={searchOpen}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {searchLoading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 animate-spin text-[#21f31f]" />
                            </div>
                        )}

                        {!searchLoading && !searchQuery && (
                            <div>
                                <h3 className="text-sm font-bold tracking-widest text-[#21f31f] mb-6 uppercase border-b border-white/10 pb-4">
                                    Productos Destacados
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {products.slice(0, 4).map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="group block"
                                            onClick={() => setSearchOpen(false)}
                                        >
                                            <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900 rounded-lg mb-4">
                                                <Image
                                                    src={product.images[0] || "/placeholder.svg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                    <span className="text-[#21f31f] font-bold text-sm tracking-widest uppercase">Ver Producto</span>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-[#21f31f] transition-colors">{product.name}</h4>
                                            <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                                            <p className="text-[#21f31f] font-bold text-lg">{formatCOP(product.salePrice)}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!searchLoading && searchQuery && searchResults.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold tracking-widest text-gray-400 mb-6">
                                    RESULTADOS DE BÚSQUEDA ({searchResults.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {searchResults.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-300 group rounded-lg overflow-hidden border border-white/5 hover:border-[#21f31f]/30"
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
                                                <p className="text-xs text-[#21f31f] mb-1 uppercase tracking-wider">{product.category}</p>
                                                <h4 className="font-bold text-base mb-2 line-clamp-2 text-white group-hover:text-[#21f31f] transition-colors">{product.name}</h4>
                                                <p className="text-white font-bold">{formatCOP(product.price)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {!searchLoading && searchQuery && searchResults.length === 0 && (
                            <div className="text-center py-24">
                                <Search className="w-16 h-16 mx-auto mb-6 text-zinc-700" />
                                <h3 className="text-xl text-white font-bold mb-2">No encontramos resultados</h3>
                                <p className="text-gray-400">Intenta con otros términos de búsqueda para "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 font-monument">
                <div className="bg-gradient-to-b from-[#1a1a1a] to-black">
                    {/* Top Bar */}
                    <div className="border-b border-white/10">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center justify-end h-10 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest font-sans">
                                <div className="hidden md:flex items-center gap-1">
                                    <Flag className="w-3 h-3 text-[#21f31f]" />
                                </div>
                                <span className="mx-3 text-zinc-700 hidden md:block">|</span>
                                <Link href="/contact" className="hover:text-[#21f31f] transition-colors hidden md:block">CONTÁCTENOS</Link>
                                <span className="mx-3 text-zinc-700 hidden md:block">|</span>
                                <Link href="/destacados" className="flex items-center gap-2 hover:text-[#21f31f] transition-colors">
                                    <Heart className="w-3 h-3" />
                                    <span className="hidden md:inline">FAVORITOS ({favorites.length})</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#2e3238] to-[#1a1d21] shadow-lg relative z-20">
                        <div className="container mx-auto px-4">
                            <div className="flex items-stretch h-20 md:h-24">
                                <div className="flex items-center border-r border-[#545659] relative w-32 md:w-40 shrink-0">
                                    <Link href="/" className="w-full h-full flex items-center justify-center">
                                        <img
                                            src="/images/logo-pdf-vegaltex-1-removebg-preview.webp"
                                            alt="VEGALTEX TACTICAL COLOMBIA"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 md:h-28 w-auto object-contain cursor-pointer hover:scale-105 transition-transform drop-shadow-md z-30"
                                        />
                                    </Link>
                                </div>

                                <nav className="hidden lg:flex items-stretch flex-1 border-r border-[#545659]">
                                    {[
                                        { label: "PANTALONES", href: "/pants" },
                                        { label: "CHAQUETAS", href: "/jackets" },
                                        { label: "CAMISAS", href: "/shirts" },
                                        { label: "GORRAS", href: "/caps" },
                                        { label: "BOTAS", href: "/boots" },
                                        { label: "ACCESORIOS", href: "/accessories" }
                                    ].map((item) => {
                                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                                        return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="relative px-6 xl:px-10 h-full flex items-center justify-center border-l border-[#545659] border-b border-[#1f2226] overflow-hidden group transition-all duration-300 hover:bg-[#21f31f]/10"
                                        >
                                            {/* Fondo con gradiente que sube */}
                                            <div className={`absolute inset-0 bg-gradient-to-t from-[#21f31f]/40 via-[#21f31f]/10 to-transparent transition-all duration-300 ease-out z-10 ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`} />
                                            
                                            {/* Efecto de luz de barrido (sweep) */}
                                            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#21f31f]/40 to-transparent transform -skew-x-12 z-10 transition-transform duration-700 ease-in-out group-hover:translate-x-[400%]" />

                                            {/* Bordes que se expanden con resplandor */}
                                            <span className={`absolute top-0 left-0 w-full h-[3px] bg-[#21f31f] shadow-[0_0_10px_#21f31f] transition-transform duration-300 ease-out z-20 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                            <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#21f31f] shadow-[0_0_10px_#21f31f] transition-transform duration-300 ease-out z-20 origin-right ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                            
                                            {/* Texto animado que salta, escala y brilla */}
                                            <span className={`font-monument font-black text-[11px] md:text-xs xl:text-sm tracking-[1.5px] relative z-20 transition-all duration-300 transform inline-block ${isActive ? "text-[#21f31f] drop-shadow-[0_0_12px_rgba(33,243,31,0.8)] scale-110" : "text-gray-300 group-hover:text-[#21f31f] group-hover:drop-shadow-[0_0_20px_rgba(33,243,31,1)] group-hover:scale-110 group-hover:-translate-y-1"}`}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    )})}
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
                                        { label: "BOTAS", href: "/boots" },
                                        { label: "ACCESORIOS", href: "/accessories" }
                                    ].map((item) => {
                                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                                        return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`px-4 py-3 font-bold text-sm tracking-widest uppercase transition-all ${isActive ? "bg-[#21f31f]/20 text-[#21f31f]" : "hover:bg-[#21f31f]/20 hover:text-[#21f31f] text-white"}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )})}
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
                            <Link href="/" className="text-[#4B5320] font-black hover:underline hidden md:inline">
                                EMPIEZA AQUÍ
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-[146px] md:h-[162px]" />
        </>
    )
}
