"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"

import { CategoryFilter } from "@/components/category-filter"

export default function BootsPage() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const boots = products.filter((p) => p.category === "BOTAS")

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[550px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f8f8] to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-white font-monument">
            BOTAS TÁCTICAS
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Calzado de alto rendimiento diseñado para terrenos extremos. Estabilidad, protección y confort en cada paso.
          </p>
        </div>
      </section>

      <main className="bg-[#f8f8f8] min-h-screen">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span>{boots.length} PRODUCTOS</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-bold text-gray-500 uppercase whitespace-nowrap">FILTRAR POR:</span>
                <CategoryFilter currentCategory="BOTAS" />
                {['TIPO', 'COLOR', 'TALLA', 'PRECIO'].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    className="bg-zinc-950 border border-[#21f31f]/30 text-white hover:bg-black hover:border-[#21f31f] transition-all duration-300 rounded-none shadow-md uppercase font-bold text-xs h-10 px-5 whitespace-nowrap group"
                  >
                    {filter} <ChevronDown className="w-4 h-4 ml-2 text-[#21f31f]/70 group-hover:text-[#21f31f] transition-colors" />
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
              {boots.map((boot) => {
                const selectedColorIndex = selectedColors[boot.id] || 0
                const currentImage = boot.images[selectedColorIndex]

                return (
                  <div key={boot.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-white overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Badge */}
                      {boot.discount > 0 && (
                        <div className="absolute top-0 left-0 z-10">
                          <div className="bg-[#21f31f] text-black font-black text-xs uppercase px-3 py-1.5 shadow-sm">
                            -{boot.discount}%
                          </div>
                        </div>
                      )}

                      <Link href={`/product/${boot.id}`} className="block w-full h-full">
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${currentImage}')` }}
                        />
                      </Link>

                      {/* Add to Cart Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/90 to-transparent">
                        <Link href={`/product/${boot.id}`}>
                          <Button className="w-full bg-black text-white hover:bg-[#21f31f] hover:text-black font-bold uppercase rounded-sm h-12 transition-colors shadow-lg">
                            VER PRODUCTO
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Link href={`/product/${boot.id}`} className="group-hover:text-[#4B5320] transition-colors">
                        <h2 className="text-base font-extrabold uppercase text-gray-900 leading-tight mb-2 font-monument">
                          {boot.name}
                        </h2>
                      </Link>

                      <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">{formatCOP(boot.salePrice)}</span>
                          {boot.originalPrice > boot.salePrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">{formatCOP(boot.originalPrice)}</span>
                          )}
                        </div>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 h-6">
                          {boot.colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedColors({ ...selectedColors, [boot.id]: idx })}
                              className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${selectedColorIndex === idx ? "scale-125 ring-1 ring-gray-400 border-transparent" : "hover:scale-110"
                                }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select color ${idx}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1 font-medium">+{boot.colors.length} COLORES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Estilos para animación de fondo de Botas (Rocas/Terreno Fuerte) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes subtleRockPan {
            0% { transform: scale(1.05) translate(0, 0); }
            50% { transform: scale(1.1) translate(1%, -1%); }
            100% { transform: scale(1.05) translate(0, 0); }
          }
          .animate-subtle-rock-pan {
            animation: subtleRockPan 25s ease-in-out infinite;
          }
        `}} />

        {/* Banner Inferior de Botas con Fondo Animado */}
        <section className="py-32 md:py-48 relative overflow-hidden group flex flex-col justify-center min-h-[500px]">
          {/* Fondo oscuro base */}
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          
          {/* Fondo de piedras trituradas animado */}
          <div 
            className="absolute inset-0 bg-cover bg-center animate-subtle-rock-pan"
            style={{ backgroundImage: "url('/piedras.webp')" }}
          />
          {/* Overlay oscuro adicional para legibilidad */}
          <div className="absolute inset-0 bg-zinc-950/70 mix-blend-multiply transition-opacity duration-700 group-hover:bg-zinc-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8] via-transparent to-transparent h-24" />

          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-white font-monument">
                TERRENO <span className="text-[#21f31f]">EXTREMO</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Conquista cualquier obstáculo con el calzado diseñado para soportar las condiciones más duras.
              </p>
            </div>
            <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 max-w-6xl mx-auto">
              <div className="border border-dashed border-gray-500/50 h-[300px] md:h-[400px] flex items-center justify-center text-gray-500 font-bold tracking-widest text-sm uppercase md:-translate-y-8">
                ESPACIO PARA IMAGEN 1
              </div>
              <div className="border border-dashed border-gray-500/50 h-[300px] md:h-[400px] flex items-center justify-center text-gray-500 font-bold tracking-widest text-sm uppercase md:translate-y-8">
                ESPACIO PARA IMAGEN 2
              </div>
              <div className="border border-dashed border-gray-500/50 h-[300px] md:h-[400px] flex items-center justify-center text-gray-500 font-bold tracking-widest text-sm uppercase md:-translate-y-8">
                ESPACIO PARA IMAGEN 3
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
