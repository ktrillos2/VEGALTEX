"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"
import { CategoryFilter } from "@/components/category-filter"
//
export default function ChalecosPage() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const chalecos = products.filter((p) => p.category === "CHALECOS")

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[550px] flex items-center justify-center bg-zinc-900"
      >
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f8f8] to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-white font-monument">
            CHALECOS TÁCTICOS
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Protección, capacidad de carga y movilidad extrema para cualquier situación.
          </p>
        </div>
      </section>

      <main className="bg-[#f8f8f8] min-h-screen">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span>{chalecos.length} PRODUCTOS</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-bold text-gray-500 uppercase whitespace-nowrap">FILTRAR POR:</span>
                <CategoryFilter currentCategory="CHALECOS" />
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
              {chalecos.map((product) => {
                const selectedColorIndex = selectedColors[product.id] || 0
                const currentImage = product.images[selectedColorIndex] || product.images[0]

                return (
                  <div key={product.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-white overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-0 left-0 z-10">
                          <div className="bg-[#21f31f] text-black font-black text-xs uppercase px-3 py-1.5 shadow-sm">
                            -{product.discount}%
                          </div>
                        </div>
                      )}

                      <Link href={`/product/${product.id}`} className="block w-full h-full">
                        <div
                          className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${currentImage}')` }}
                        />
                      </Link>

                      {/* Add to Cart Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/90 to-transparent">
                        <Link href={`/product/${product.id}`}>
                          <Button className="w-full bg-black text-white hover:bg-[#21f31f] hover:text-black font-bold uppercase rounded-sm h-12 transition-colors shadow-lg">
                            VER PRODUCTO
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Link href={`/product/${product.id}`} className="group-hover:text-[#4B5320] transition-colors">
                        <h3 className="text-base font-extrabold uppercase text-gray-900 leading-tight mb-2 font-monument">
                          {product.name || "CHALECO"}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-2 flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                          {product.salePrice > 0 ? (
                            <>
                              <span className="text-lg font-bold text-gray-900">{formatCOP(product.salePrice)}</span>
                              {product.originalPrice > product.salePrice && (
                                <span className="text-sm text-gray-400 line-through font-medium">{formatCOP(product.originalPrice)}</span>
                              )}
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">Próximamente</span>
                          )}
                        </div>

                        {/* Color Swatches */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1.5 h-6">
                            {product.colors.map((color, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedColors({ ...selectedColors, [product.id]: idx })}
                                className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${selectedColorIndex === idx ? "scale-125 ring-1 ring-gray-400 border-transparent" : "hover:scale-110"
                                  }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${idx}`}
                              />
                            ))}
                            {product.colors.length > 1 && (
                              <span className="text-xs text-gray-400 ml-1 font-medium">+{product.colors.length - 1} COLORES</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        {/* Estilos para animación de fondo */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes subtlePan {
            0% { transform: scale(1.05) translate(0, 0); }
            50% { transform: scale(1.1) translate(-1%, 1%); }
            100% { transform: scale(1.05) translate(0, 0); }
          }
          .animate-subtle-pan {
            animation: subtlePan 20s ease-in-out infinite;
          }
        `}} />

        {/* Banner Chalecos con Fondo Natural y Diseño Superpuesto */}
        <section className="relative w-full h-[calc(100vh-130px)] md:h-[calc(100vh-146px)] mt-12 group overflow-hidden">
          {/* Fondo de naturaleza (Helechos húmedos/bosque táctico) */}
          <div
            className="absolute inset-0 bg-cover bg-center animate-subtle-pan"
            style={{ backgroundImage: "url('/nature.webp')" }}
          />
          <div className="absolute inset-0 bg-[#0f140a]/50" /> {/* Tinte verde oscuro para el ambiente */}

          {/* Difuminado hacia el color de fondo */}
          <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-[#f8f8f8] to-transparent z-10" />

          {/* Imagen superpuesta */}
          <div className="absolute right-0 bottom-0 z-20 w-full md:w-[60%] h-[90%] md:h-full flex items-end justify-center md:justify-end pr-0 md:pr-24 lg:pr-40 pointer-events-none">
            <img
              src="/CHALECOS/9D9A1074-EB0B-40E4-A213-6ABD80A8130A-Photoroom.JPG"
              alt="Chalecos Tácticos"
              className="max-h-[75%] md:max-h-[80%] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] mb-6 md:mb-12"
            />
          </div>

          {/* Caja de texto */}
          <div className="relative z-10 container mx-auto h-full flex items-end md:items-center pb-8 md:pb-0 px-4 md:px-24 lg:px-40">
            <div className="bg-[#1f2418]/90 backdrop-blur-md p-6 md:p-8 max-w-[450px] w-full border-l-[6px] border-[#879a4a] shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-wider uppercase mb-4 text-white drop-shadow-lg font-monument leading-none">
                PROTECCIÓN<br />SUPERIOR
              </h2>
              <p className="text-sm md:text-base text-gray-300 mb-8 font-medium leading-relaxed">
                Diseñados para la máxima movilidad y protección.
                Nuestros chalecos tácticos integran compartimentos estratégicos
                y materiales resistentes para soportar las condiciones más extremas.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
