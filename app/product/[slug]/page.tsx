"use client"

import { useState, useEffect, useRef, use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Heart,
  Star,
  Truck,
  Play,
  Lock,
  Shield,
  Package,
  Thermometer,
  Layers,
  Tag,
} from "lucide-react"
import { toast } from "sonner"
import { useFavorites } from "@/lib/hooks/use-favorites"
import { TacticalToast } from "@/components/tactical-toast"
import { useCart } from "@/lib/context/cart-context"
import { formatCOP } from "@/lib/utils"
import { products } from "@/lib/products"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  // Unwrap params Promise (Next.js 15/16 requirement)
  const { slug } = use(params)

  // ─── TODOS LOS HOOKS DEBEN IR ANTES DE CUALQUIER RETURN ────────────────
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [scrollSlideIndex, setScrollSlideIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { toggleFavorite, isFavorite, isLoaded } = useFavorites()
  const { addItem } = useCart()

  // useEffect siempre se llama, usa 3 como constante de slides para no depender de product
  useEffect(() => {
    const SLIDES_COUNT = 3
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      const rect = scrollContainerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = -rect.top / viewportHeight
      if (progress >= -0.5 && progress < SLIDES_COUNT + 0.5) {
        let newIndex = Math.round(progress)
        if (newIndex < 0) newIndex = 0
        if (newIndex >= SLIDES_COUNT) newIndex = SLIDES_COUNT - 1
        setScrollSlideIndex(newIndex)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  // ───────────────────────────────────────────────────────────────────────

  // Buscar el producto por ID usando el slug ya resuelto
  const productId = parseInt(slug, 10)
  const rawProduct = products.find((p) => p.id === productId)

  // Si no se encontró el producto, mostrar 404 (DESPUÉS de todos los hooks)
  if (!rawProduct) return notFound()


  // Adaptar el producto al formato que necesita esta página
  const product = {
    id: rawProduct.id,
    name: rawProduct.name,
    price: rawProduct.salePrice,
    badge: rawProduct.badge,
    rating: 5,
    reviews: 12,
    description: `Producto táctico de alta calidad de la categoría ${rawProduct.category.toLowerCase()}. Diseñado para ofrecer rendimiento máximo en condiciones exigentes con materiales premium.`,
    colors: rawProduct.colors.map((hex, idx) => ({
      name: `Color ${idx + 1}`,
      hex,
      images: [rawProduct.images[idx] || rawProduct.images[0] || "/placeholder.svg"],
    })),
    allImages: rawProduct.images,
    sizes: rawProduct.category === "BOTAS"
      ? ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
      : ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    features: [
      "Material de alta resistencia para uso táctico",
      "Diseño ergonómico para máxima comodidad",
      "Construcción reforzada en zonas de desgaste",
      "Costuras de doble pespunte industriales",
      "Acabados de alta durabilidad",
      "Probado en condiciones extremas",
    ],
    upgradeWith: [
      {
        name: "CINTURÓN TÁCTICO DUAL D-RING",
        price: 72000,
        image: "/images/products/belt-dual-olive.jpg",
        colors: ["#4B5320", "#000000", "#5a5a5a", "#8B7355"],
      },
      {
        name: "RODILLERAS DE COMBATE 3D",
        price: 38000,
        image: "/images/products/knee-pads-black.jpg",
        colors: ["#000000", "#4B5320"],
      },
      {
        name: "GORRA TÁCTICA LIGERA STRIKER",
        price: 34000,
        image: "/images/products/cap-light-olive.jpg",
        colors: ["#4B5320", "#000000", "#5a5a5a"],
      },
    ],
  }

  // Galería: usar todas las imágenes del producto
  const currentImages = product.allImages.length > 0
    ? product.allImages
    : ["/placeholder.svg"]

  const addToCart = () => {
    addItem(rawProduct, product.colors[selectedColor]?.name ?? "Default", selectedSize)
    toast.custom(
      () => (
        <TacticalToast
          title="AGREGADO"
          message={`${product.name} agregado al carrito.`}
        />
      ),
      { duration: 5000 }
    )
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id, product.name)
  }

  const slides = [
    {
      title: "TEJIDO EXTERIOR CORTAVIENTOS Y REPELENTE AL AGUA.",
      description: "Un tejido de poliamida con elasticidad natural y una membrana de poliuretano te protege de la lluvia ligera y vientos fríos.",
      image: "/images/products/jacket-feature-windproof.jpg",
    },
    {
      title: "AISLAMIENTO LIGERO DE ALTO RENDIMIENTO.",
      description: "El aislamiento sintético avanzado proporciona una relación calor-peso excepcional para operaciones en clima frío extremo.",
      image: "/images/products/jacket-feature-insulation.jpg",
    },
    {
      title: "FORRO BASE TRANSPIRABLE Y DE SECADO RÁPIDO.",
      description: "El forro interior que absorbe la humedad garantiza comodidad durante actividades de alta intensidad y cambios rápidos de temperatura.",
      image: "/images/products/jacket-feature-breathable.jpg",
    },
  ]


  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">

      {/* Product Detail Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Thumbnail Column */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-20">
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border-2 overflow-hidden transition-all ${selectedImage === idx ? "border-[#21f31f]" : "border-zinc-300 hover:border-zinc-400"
                        }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 relative bg-zinc-100">
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-[#21f31f] text-black px-6 py-2 font-black text-sm uppercase z-10 transform rotate-12">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={currentImages[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 text-black">{product.name}</h1>
                <div className="text-3xl font-black mb-4 text-black">{formatCOP(product.price)}</div>
                <p className="text-zinc-800 leading-relaxed font-medium">
                  {product.description}{" "}
                  <Link href="#" className="text-[#4B5320] font-bold hover:underline ml-1">
                    Más Info
                  </Link>
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-black">COLOR:</label>
                <div className="flex gap-3 mb-2 flex-wrap">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(idx)
                        setSelectedImage(0)
                      }}
                      className={`relative group`}
                      title={color.name}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-3 transition-all ${selectedColor === idx
                          ? "ring-2 ring-[#21f31f] ring-offset-2"
                          : "hover:ring-2 hover:ring-zinc-400 hover:ring-offset-1"
                          }`}
                        style={{ backgroundColor: color.hex, borderColor: color.hex === '#ffffff' ? '#e5e5e5' : 'transparent' }}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-zinc-600">{product.colors[selectedColor]?.name}</p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3 text-black">TALLA:</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 font-bold text-sm uppercase transition-all ${selectedSize === size
                        ? "bg-[#21f31f] border-[#21f31f] text-black"
                        : "bg-white border-zinc-300 text-black hover:border-zinc-800 hover:bg-zinc-50"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-3 text-sm text-zinc-800 font-medium">
                <Truck className="w-5 h-5 text-[#4B5320]" />
                <span>
                  Entrega est. el {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Add to Basket */}
              <div className="flex gap-3">
                <Button
                  onClick={addToCart}
                  className="flex-1 bg-zinc-900 text-white font-bold h-14 rounded-none uppercase tracking-wider text-base border-none shadow-none relative overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">AGREGAR AL CARRITO</span>
                  <div className="absolute inset-0 bg-[#21f31f] transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Button>
                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  size="icon"
                  className={`w-14 h-14 rounded-none border-2 transition-all ${isFavorite(product.id)
                    ? "bg-zinc-100 border-[#21f31f] text-[#21f31f]"
                    : "bg-[#bfbfbf] border-[#bfbfbf] text-white hover:bg-[#a6a6a6] hover:border-[#a6a6a6]"
                    }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade With Section */}
      <section className="py-12 md:py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-center mb-12 tracking-tight text-black">MEJORA TU EQUIPO CON:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.upgradeWith.map((item, idx) => (
              <Card
                key={idx}
                className="bg-white rounded-none border-zinc-200 overflow-hidden hover:border-[#21f31f] hover:shadow-lg transition-all"
              >
                <div className="h-80 overflow-hidden bg-zinc-100">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 text-transparent"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-black uppercase text-lg mb-3 text-black">{item.name}</h3>
                  <p className="text-2xl font-bold mb-4 text-zinc-900">{formatCOP(item.price)}</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {item.colors.map((color, colorIdx) => (
                      <div
                        key={colorIdx}
                        className="w-6 h-6 border shadow-sm"
                        style={{ backgroundColor: color, borderColor: color === '#ffffff' ? '#e5e5e5' : 'transparent' }}
                      />
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-2 border-black text-black hover:bg-black hover:text-white font-bold rounded-none uppercase tracking-wider py-6 transition-colors">
                    VER PRODUCTO
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Locked Vertical Slider Section */}
      <section ref={scrollContainerRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-[146px] md:top-[162px] h-[calc(100vh-146px)] md:h-[calc(100vh-162px)] overflow-hidden">
          <div className="grid md:grid-cols-2 h-full">
            {/* Left: Product Image */}
            <div className="relative h-full overflow-hidden">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ${scrollSlideIndex === idx ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Right: Feature Content */}
            <div className="relative flex items-center justify-center p-8 md:p-16 bg-black">
              <div className="max-w-xl space-y-12">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute top-1/2 left-8 right-8 -translate-y-1/2 transition-opacity duration-700 ${scrollSlideIndex === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                  >
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">{slide.title}</h2>
                    <p className="text-lg text-zinc-300 leading-relaxed">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-1 h-48 bg-zinc-800">
                <div
                  className="w-full bg-[#21f31f] transition-all duration-700"
                  style={{
                    height: `${((scrollSlideIndex + 1) / slides.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Detailed Product Information Sections */}
      < section className="py-16 md:py-24 bg-white" >
        <div className="container mx-auto px-4">
          {/* Technical Specifications */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              ESPECIFICACIONES TÉCNICAS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg uppercase mb-4 text-[#21f31f]">MATERIALES</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Capa Exterior:</span>
                    <span className="font-bold text-black">Nylon Ripstop</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Aislamiento:</span>
                    <span className="font-bold text-black">PrimaLoft® Gold</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Membrana:</span>
                    <span className="font-bold text-black">Poliuretano</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Forro:</span>
                    <span className="font-bold text-black">Malla de Poliéster</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg uppercase mb-4 text-[#21f31f]">RENDIMIENTO</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Resistencia al Agua:</span>
                    <span className="font-bold text-black">10,000mm</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Transpirabilidad:</span>
                    <span className="font-bold text-black">10,000g/m²/24h</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Peso:</span>
                    <span className="font-bold text-black">890g (Talla M)</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span className="font-medium text-black">Rango de Temperatura:</span>
                    <span className="font-bold text-black">-20°C a 5°C</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              CARACTERÍSTICAS CLAVE
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "Cremalleras YKK", desc: "Cremalleras YKK de alta resistencia para fiabilidad" },
                {
                  icon: Shield,
                  title: "Construcción Reforzada",
                  desc: "Codos y hombros reforzados para durabilidad",
                },
                { icon: Package, title: "Múltiples Bolsillos", desc: "8 bolsillos tácticos con cierres seguros" },
                { icon: Thermometer, title: "Control de Temp.", desc: "Cremalleras en axilas para ventilación" },
                { icon: Layers, title: "Ajuste Personalizado", desc: "Capucha, puños y dobladillo ajustables" },
                { icon: Tag, title: "Panel de Velcro", desc: "Paneles para parches e identificación" },
              ].map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={idx}
                    className="p-6 border-2 border-zinc-200 hover:border-[#21f31f] transition-all duration-300 rounded-none hover:shadow-[0_0_20px_rgba(33,243,31,0.3)] cursor-pointer group bg-white"
                  >
                    <IconComponent className="w-10 h-10 mb-3 text-[#21f31f] group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg uppercase mb-2 text-black">{feature.title}</h3>
                    <p className="text-sm text-zinc-600">{feature.desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>
          {/* ... (Care instructions translated below) */}
          {/* Care Instructions */}
          <div className="max-w-full mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              INSTRUCCIONES DE CUIDADO
            </h2>
            <div className="bg-zinc-50 p-8 border-l-4 border-[#21f31f]">
              <ul className="space-y-3 text-zinc-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span className="text-black font-medium">Lavar a máquina a 30°C con colores similares</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span className="text-black font-medium">No usar lejía ni suavizante</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span className="text-black font-medium">Secar en secadora a baja temperatura o colgar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span className="text-black font-medium">Planchar a baja temperatura si es necesario</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span className="text-black font-medium">Guardar en un lugar fresco y seco alejado del sol directo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section >

      {/* Feature Highlight */}
      < section className="py-16 md:py-24 bg-black text-white" >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                PARA LO QUE SEA QUE EL INVIERNO TE LANCE.
              </h2>
              <p className="text-zinc-300 mb-8 leading-relaxed text-lg">
                Originalmente diseñada como capa intermedia, la nueva generación Delta ML funciona también como chaqueta independiente para cuando las temperaturas rozan los cero grados. Ofrece protección excepcional contra el clima y comodidad.
              </p>
              <div className="space-y-4">
                <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold px-8 py-6 rounded-none uppercase tracking-wider text-base">
                  <Play className="w-5 h-5 mr-2" />
                  VER VIDEO
                </Button>
                <Button
                  variant="outline"
                  className="ml-4 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 rounded-none uppercase tracking-wider text-base bg-transparent"
                >
                  VER ANÁLISIS
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="/images/jackets-hero-banner.jpg" alt="Feature highlight" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
