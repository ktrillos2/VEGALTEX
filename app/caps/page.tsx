"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"

export default function CapsPage() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const caps = products.filter((p) => p.category === "GORRAS")

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
            GORRAS Y SOMBREROS
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Protección esencial para la cabeza. Gorras tácticas, boonies y gorros para cualquier entorno operativo.
          </p>
        </div>
      </section>

      <main className="bg-[#f8f8f8] min-h-screen">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span>{caps.length} PRODUCTOS</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-bold text-gray-500 uppercase whitespace-nowrap">FILTRAR POR:</span>
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
              {caps.map((cap) => {
                const selectedColorIndex = selectedColors[cap.id] || 0
                const currentImage = cap.images[selectedColorIndex]

                return (
                  <div key={cap.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-white overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Badge */}
                      {cap.discount > 0 && (
                        <div className="absolute top-0 left-0 z-10">
                          <div className="bg-[#21f31f] text-black font-black text-xs uppercase px-3 py-1.5 shadow-sm">
                            -{cap.discount}%
                          </div>
                        </div>
                      )}

                      <Link href={`/product/${cap.id}`} className="block w-full h-full">
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${currentImage}')` }}
                        />
                      </Link>

                      {/* Add to Cart Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/90 to-transparent">
                        <Link href={`/product/${cap.id}`}>
                          <Button className="w-full bg-black text-white hover:bg-[#21f31f] hover:text-black font-bold uppercase rounded-sm h-12 transition-colors shadow-lg">
                            VER PRODUCTO
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Link href={`/product/${cap.id}`} className="group-hover:text-[#4B5320] transition-colors">
                        <h3 className="text-base font-extrabold uppercase text-gray-900 leading-tight mb-2 font-monument">
                          {cap.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">{formatCOP(cap.salePrice)}</span>
                          {cap.originalPrice > cap.salePrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">{formatCOP(cap.originalPrice)}</span>
                          )}
                        </div>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 h-6">
                          {cap.colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedColors({ ...selectedColors, [cap.id]: idx })}
                              className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${selectedColorIndex === idx ? "scale-125 ring-1 ring-gray-400 border-transparent" : "hover:scale-110"
                                }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select color ${idx}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1 font-medium">+{cap.colors.length} COLORES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Estilos para animación de fondo de Gorras */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes subtleForestPan {
            0% { transform: scale(1.05) translate(0, 0); }
            50% { transform: scale(1.1) translate(-1%, 1%); }
            100% { transform: scale(1.05) translate(0, 0); }
          }
          .animate-subtle-forest-pan {
            animation: subtleForestPan 25s ease-in-out infinite;
          }
        `}} />

        {/* Sección con Fondo Animado (Gorras) */}
        <section className="py-20 md:py-32 relative overflow-hidden group">
          {/* Fondo de bosque animado */}
          <div 
            className="absolute inset-0 bg-cover bg-center animate-subtle-forest-pan"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop')" }}
          />
          {/* Overlay oscuro para asegurar contraste */}
          <div className="absolute inset-0 bg-zinc-950/80 mix-blend-multiply transition-opacity duration-700 group-hover:bg-zinc-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8] via-transparent to-transparent h-24" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-white font-monument">
              PROTECCIÓN Y <span className="text-[#21f31f]">ESTILO</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16">
              Descubre los detalles de nuestras gorras tácticas.
            </p>
            
            {/* Espacio para que el usuario agregue las imágenes luego */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="h-[400px] border-2 border-dashed border-gray-600 rounded flex items-center justify-center text-gray-500 uppercase tracking-widest font-bold">
                Espacio para Imagen 1
              </div>
              <div className="h-[400px] border-2 border-dashed border-gray-600 rounded flex items-center justify-center text-gray-500 uppercase tracking-widest font-bold">
                Espacio para Imagen 2
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
