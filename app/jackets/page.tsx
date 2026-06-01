"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"

import { CategoryFilter } from "@/components/category-filter"

export default function JacketsPage() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const jackets = products.filter((p) => p.category === "CHAQUETAS")

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[550px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f8f8] to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-white font-monument">
            CHAQUETAS TÁCTICAS
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Protección superior contra los elementos. Diseñadas para operar en las condiciones más exigentes.
          </p>
        </div>
      </section >

      <main className="bg-[#f8f8f8] min-h-screen">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span>{jackets.length} PRODUCTOS</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-bold text-gray-500 uppercase whitespace-nowrap">FILTRAR POR:</span>
                <CategoryFilter currentCategory="CHAQUETAS" />
                {['TIPO', 'COLOR', 'TALLA', 'PRECIO'].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    className="bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:text-black rounded-sm uppercase font-bold text-xs h-9 px-4 whitespace-nowrap"
                  >
                    {filter} <ChevronDown className="w-3 h-3 ml-2" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {jackets.map((jacket) => {
                const selectedColorIndex = selectedColors[jacket.id] || 0
                const currentImage = jacket.images[selectedColorIndex]

                return (
                  <div key={jacket.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-white overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Badge */}
                      {jacket.discount > 0 && (
                        <div className="absolute top-0 left-0 z-10">
                          <div className="bg-[#21f31f] text-black font-black text-xs uppercase px-3 py-1.5 shadow-sm">
                            -{jacket.discount}%
                          </div>
                        </div>
                      )}

                      <Link href={`/product/${jacket.id}`} className="block w-full h-full">
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${currentImage}')` }}
                        />
                      </Link>

                      {/* Add to Cart Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/90 to-transparent">
                        <Link href={`/product/${jacket.id}`}>
                          <Button className="w-full bg-black text-white hover:bg-[#21f31f] hover:text-black font-bold uppercase rounded-sm h-12 transition-colors shadow-lg">
                            VER PRODUCTO
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Link href={`/product/${jacket.id}`} className="group-hover:text-[#4B5320] transition-colors">
                        <h3 className="text-base font-extrabold uppercase text-gray-900 leading-tight mb-2 font-monument">
                          {jacket.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">{formatCOP(jacket.salePrice)}</span>
                          {jacket.originalPrice > jacket.salePrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">{formatCOP(jacket.originalPrice)}</span>
                          )}
                        </div>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 h-6">
                          {jacket.colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedColors({ ...selectedColors, [jacket.id]: idx })}
                              className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${selectedColorIndex === idx ? "scale-125 ring-1 ring-gray-400 border-transparent" : "hover:scale-110"
                                }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select color ${idx}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1 font-medium">+{jacket.colors.length} COLORES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Estilos para animación de fondo de Chaquetas (Nieve/Montaña) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes subtleSnowPan {
            0% { transform: scale(1.05) translate(0, 0); }
            50% { transform: scale(1.1) translate(-1%, 1%); }
            100% { transform: scale(1.05) translate(0, 0); }
          }
          .animate-subtle-snow-pan {
            animation: subtleSnowPan 25s ease-in-out infinite;
          }
        `}} />

        {/* Featured Jackets Gallery with Animations */}
        <section className="py-32 md:py-48 relative overflow-hidden group flex flex-col justify-center min-h-[500px]">
          {/* Fondo de montaña nevada animado */}
          <div 
            className="absolute inset-0 bg-cover bg-center animate-subtle-snow-pan"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')" }}
          />
          {/* Overlay oscuro para asegurar contraste y legibilidad */}
          <div className="absolute inset-0 bg-zinc-950/80 mix-blend-multiply transition-opacity duration-700 group-hover:bg-zinc-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8] via-transparent to-transparent h-24" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-white font-monument">
                DISEÑO Y TECNOLOGÍA
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Descubre los detalles de nuestras chaquetas tácticas de alto rendimiento.
              </p>
            </div>
            <div className="flex justify-center mt-12 relative z-20">
              <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-black tracking-widest uppercase rounded-none h-14 px-12 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(33,243,31,0.3)]">
                VER CATÁLOGO
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
