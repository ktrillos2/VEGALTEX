"use client"

import Link from "next/link"
import { useFavorites } from "@/lib/hooks/use-favorites"
import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Ghost, ShoppingBag } from "lucide-react"

export default function FeaturedPage() {
    const { favorites, toggleFavorite, isLoaded } = useFavorites()

    // Filter products that are in the favorites list
    const favoriteProducts = products.filter(product => favorites.includes(product.id))

    if (!isLoaded) {
        return <div className="min-h-screen bg-white pt-24 px-4 flex items-center justify-center">
            <div className="animate-pulse text-zinc-400">CARGANDO BASE DE DATOS...</div>
        </div>
    }

    return (
        <div className="min-h-screen bg-black pt-24 md:pt-32 pb-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-4 border-[#21f31f] pb-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 text-white">
                            DESTACADOS
                        </h1>
                        <p className="text-zinc-400 font-mono">
                            TU ARSENAL SELECCIONADO: {favoriteProducts.length} ÍTEMS
                        </p>
                    </div>
                </div>

                {favoriteProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {favoriteProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="group relative border-2 border-zinc-800 bg-zinc-900 rounded-none overflow-hidden hover:border-[#21f31f] hover:shadow-[0_0_20px_rgba(33,243,31,0.2)] transition-all duration-300"
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div className="absolute top-2 right-2 z-10 bg-[#21f31f] text-black text-xs font-black px-2 py-1 uppercase transform skew-x-[-10deg]">
                                        {product.badge}
                                    </div>
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(product.id, product.name);
                                    }}
                                    className="absolute top-2 left-2 z-10 w-8 h-8 flex items-center justify-center bg-black/80 hover:bg-[#21f31f] border border-zinc-700 hover:border-[#21f31f] transition-all text-zinc-400 hover:text-black"
                                    title="Eliminar de destacados"
                                >
                                    <Heart className="w-5 h-5 fill-current text-red-500" />
                                </button>

                                {/* Image */}
                                <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-zinc-800">
                                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={product.images[0] || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                                    <div className="text-xs text-zinc-500 font-bold mb-1 uppercase tracking-wider">
                                        {product.category}
                                    </div>
                                    <Link href={`/product/${product.id}`} className="block">
                                        <h3 className="font-bold text-lg leading-tight uppercase mb-2 text-white group-hover:text-[#21f31f] transition-colors line-clamp-2 min-h-[3rem]">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="flex flex-col">
                                            {product.originalPrice > product.salePrice && (
                                                <span className="text-xs text-zinc-500 line-through">
                                                    {formatCOP(product.originalPrice)}
                                                </span>
                                            )}
                                            <span className="text-xl font-black text-[#21f31f]">
                                                {formatCOP(product.salePrice)}
                                            </span>
                                        </div>

                                        <Link href={`/product/${product.id}`}>
                                            <Button size="sm" className="rounded-none bg-zinc-800 hover:bg-[#21f31f] hover:text-black text-white font-bold uppercase tracking-wider border border-zinc-700 hover:border-[#21f31f]">
                                                VER
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-zinc-800 bg-zinc-900/50">
                        <div className="bg-zinc-800 p-6 rounded-full mb-6 relative group">
                            <Ghost className="w-16 h-16 text-zinc-500 group-hover:text-[#21f31f] transition-colors" />
                            <div className="absolute inset-0 border border-zinc-600 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-2">
                            ZONA ESTÉRIL DETECTADA
                        </h2>
                        <p className="text-zinc-400 max-w-md mx-auto mb-8 font-mono">
                            No se han marcado objetivos prioritarios. Explora el catálogo para agregar equipamiento a tu lista de destacados.
                        </p>
                        <Link href="/jackets">
                            <Button className="h-14 px-8 bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold text-lg uppercase tracking-widest rounded-none shadow-[0_4px_0_#1a7f1a] hover:shadow-[0_2px_0_#1a7f1a] translate-y-[-2px] hover:translate-y-[0px] transition-all">
                                <ShoppingBag className="w-5 h-5 mr-3" />
                                EXPLORAR EQUIPAMIENTO
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
