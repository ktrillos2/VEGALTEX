"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { products } from "@/lib/products"
import { formatCOP } from "@/lib/utils"

import { CategoryFilter } from "@/components/category-filter"

export default function PantsPage() {
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>({})

  const pants = products.filter((p) => p.category === "PANTALONES")

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <section
        className="relative h-[300px] md:h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero.png')", // You might want a different background for pants if available
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase text-white font-monument">
            PANTALONES TÁCTICOS
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
            Movilidad extrema y durabilidad sin concesiones. Equipamiento probado en combate para cualquier misión.
          </p>
        </div>
      </section>

      <main className="bg-[#f8f8f8] min-h-screen">
        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <span>{pants.length} PRODUCTOS</span>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <span className="text-sm font-bold text-gray-500 uppercase whitespace-nowrap">FILTRAR POR:</span>
                <CategoryFilter currentCategory="PANTALONES" />
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
              {pants.map((pant) => {
                const selectedColorIndex = selectedColors[pant.id] || 0
                const currentImage = pant.images[selectedColorIndex]

                return (
                  <div key={pant.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] bg-white overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Badge */}
                      {pant.discount > 0 && (
                        <div className="absolute top-0 left-0 z-10">
                          <div className="bg-[#21f31f] text-black font-black text-xs uppercase px-3 py-1.5 shadow-sm">
                            -{pant.discount}%
                          </div>
                        </div>
                      )}

                      <Link href={`/product/${pant.id}`} className="block w-full h-full">
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${currentImage}')` }}
                        />
                      </Link>

                      {/* Add to Cart Button Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/90 to-transparent">
                        <Link href={`/product/${pant.id}`}>
                          <Button className="w-full bg-black text-white hover:bg-[#21f31f] hover:text-black font-bold uppercase rounded-sm h-12 transition-colors shadow-lg">
                            VER PRODUCTO
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <Link href={`/product/${pant.id}`} className="group-hover:text-[#4B5320] transition-colors">
                        <h3 className="text-base font-extrabold uppercase text-gray-900 leading-tight mb-2 font-monument">
                          {pant.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">{formatCOP(pant.salePrice)}</span>
                          {pant.originalPrice > pant.salePrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">{formatCOP(pant.originalPrice)}</span>
                          )}
                        </div>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 h-6">
                          {pant.colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedColors({ ...selectedColors, [pant.id]: idx })}
                              className={`w-4 h-4 rounded-full border border-gray-300 transition-transform ${selectedColorIndex === idx ? "scale-125 ring-1 ring-gray-400 border-transparent" : "hover:scale-110"
                                }`}
                              style={{ backgroundColor: color }}
                              aria-label={`Select color ${idx}`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-1 font-medium">+{pant.colors.length} COLORES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
