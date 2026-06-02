"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"
import {
  Droplet,
  Shield,
  Wind,
  Zap,
} from "lucide-react"

import { products } from "@/lib/products"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { formatCOP } from "@/lib/utils"

export default function TacticalProLandingPage() {
  const [scrolled, setScrolled] = useState(false)

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const categories = [
    { name: "PANTALONES DE COMBATE STRIKER", image: "/tactical-combat-pants-military.webp", link: "/pants" },
    { name: "CHAQUETAS TÁCTICAS", image: "/military-tactical-jacket.webp", link: "/jackets" },
    { name: "CAMISAS DE COMBATE", image: "/tactical-combat-shirt.webp", link: "/shirts" },
    { name: "BOTAS TÁCTICAS", image: "/botas/botas-c.webp", link: "/boots" },
  ]

  const HERO_SLIDES = [
    {
      id: 1,
      image: "/tactical-military-operator-action.webp",
      title: "DEFINIENDO EL FUTURO DEL EQUIPAMIENTO TÁCTICO",
      subtitle: "Diseñado para misiones críticas en los entornos más hostiles. Equípate con la ventaja definitiva.",
      ctaPrimary: "VER CATÁLOGO",
      ctaSecondary: "SABER MÁS"
    },
    {
      id: 2,
      image: "/images/image.webp",
      title: "PROTECCIÓN SUPERIOR. RENDIMIENTO EXTREMO.",
      subtitle: "Nuestra nueva línea de chaquetas está diseñada para desafiar los elementos y mantenerte operativo.",
      ctaPrimary: "VER CHAQUETAS",
      ctaSecondary: "TECNOLOGÍA"
    },
    {
      id: 3,
      image: "/images/featured-cold-weather.webp",
      title: "DOMINA EL FRÍO",
      subtitle: "Aislamiento térmico avanzado para cuando la temperatura desciende. No dejes que el clima te detenga.",
      ctaPrimary: "COLECCIÓN INVIERNO",
      ctaSecondary: "CALIDEZ TÁCTICA"
    }
  ]

  // Map real products to the Latest Products format expected by the UI
  const latestProducts = products.slice(0, 4).map((product) => ({
    id: product.id,
    name: product.name,
    price: formatCOP(product.salePrice),
    image: product.images[0],
    badge: product.badge,
    colors: product.colors.length,
  }))

  const testimonials = [
    {
      name: "Unidad de Operaciones Especiales",
      text: "La durabilidad y funcionalidad del equipo Vegaltex ha demostrado ser esencial en nuestras operaciones. Calidad excepcional.",
      rating: 5,
    },
    {
      name: "Equipo de Rescate de Montaña",
      text: "La protección contra el clima es impecable. Confiamos en este equipo en las condiciones más extremas.",
      rating: 5,
    },
    {
      name: "Fuerzas del Orden",
      text: "Comodidad y movilidad combinadas con funcionalidad táctica. Este es el equipo en el que confiamos.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Estilos para animación del hero */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-subtle-zoom {
          animation: subtleZoom 25s ease-in-out infinite;
        }
      `}} />

      {/* Hero Section - Carousel Slider */}
      <section className="relative h-[600px] md:h-[800px] font-monument group overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-0 h-full">
            {HERO_SLIDES.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 h-full relative w-full">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={slide.id === 1}
                    className="object-cover object-[center_30%] z-0 animate-subtle-zoom"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
                  {/* Bottom fade to white for smooth transition */}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent z-10" />

                  <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-4xl pt-20">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 uppercase text-white drop-shadow-lg leading-tight">
                        {slide.title.split(" ").map((word, i) =>
                          word === "FUTURO" || word === "TÁCTICO" || word === "EXTREMO" || word === "FRÍO" ? (
                            <span key={i} className="text-[#21f31f]">{word} </span>
                          ) : (
                            <span key={i}>{word} </span>
                          )
                        )}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl font-sans font-medium drop-shadow-md">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold tracking-wider uppercase rounded-none h-14 px-10 text-lg transition-transform hover:scale-105">
                          {slide.ctaPrimary}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-2 border-white text-white hover:bg-white hover:text-black font-bold tracking-wider uppercase rounded-none h-14 px-10 text-lg bg-transparent backdrop-blur-sm transition-transform hover:scale-105"
                        >
                          {slide.ctaSecondary}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-transparent border-white/20 text-white hover:bg-[#21f31f] hover:text-black hover:border-[#21f31f] transition-colors rounded-none w-12 h-12 hidden md:flex" />
          <CarouselNext className="right-4 bg-transparent border-white/20 text-white hover:bg-[#21f31f] hover:text-black hover:border-[#21f31f] transition-colors rounded-none w-12 h-12 hidden md:flex" />
        </Carousel>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-black">
                ÚLTIMOS LANZAMIENTOS
              </h2>
              <p className="text-lg text-gray-600">Descubre nuestras innovaciones tácticas más recientes</p>
            </div>
          </ScrollAnimation>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product, idx) => (
              <ScrollAnimation key={product.id} animation="fade-up" delay={idx * 150}>
                <div className="group relative">
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 150}>
                <Link href={category.link}>
                  <div className="group relative h-96 overflow-hidden cursor-pointer rounded-none">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold tracking-wide uppercase">{category.name}</h3>
                      <div className="flex items-center gap-2 mt-2 text-[#21f31f]">
                        <span className="text-sm font-semibold tracking-wide">EXPLORAR</span>
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <ScrollAnimation animation="slide-right">
              <div className="relative h-[350px] md:h-[500px] overflow-hidden">
                <img
                  src="/images/featured-cold-weather.webp"
                  alt="Operaciones en Clima Frío"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="bg-[#21f31f] text-black text-xs font-bold px-3 py-1 inline-block mb-4 uppercase">
                    Tecnología Destacada
                  </div>
                  <h3 className="text-3xl font-bold uppercase mb-2">DOMINA EL FRÍO</h3>
                  <p className="text-gray-300">Aislamiento térmico avanzado para temperaturas bajo cero.</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={200}>
              <div>
                <div className="mb-8">
                  <span className="text-[#21f31f] font-bold tracking-widest text-sm uppercase">POR QUÉ ELEGIR VEGALTEX</span>
                  <h2 className="text-4xl font-bold uppercase mt-2 mb-6">INGENIERÍA DE PRECISIÓN</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    Cada costura, cada bolsillo y cada material es seleccionado con un propósito. No hacemos moda;
                    hacemos equipamiento táctico diseñado para superar los estándares militares más estrictos.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Materiales Schoeller®-dynamic elásticos y resistentes",
                      "Aislamiento térmico G-LOFT®",
                      "Diseño ergonómico UF PRO® air/pac®",
                      "Sistemas de rodilleras y coderas modulares"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#21f31f]" />
                        <span className="font-bold text-gray-300 uppercase">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="bg-transparent border-2 border-[#21f31f] text-[#21f31f] hover:bg-[#21f31f] hover:text-black font-bold tracking-wider uppercase rounded-none h-14 px-10 text-lg">
                  NUESTRA TECNOLOGÍA
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4">CONFIADO POR PROFESIONALES</h2>
              <p className="text-lg text-gray-400">Unidades de élite en todo el mundo dependen de nuestro equipo</p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, idx) => (
              <ScrollAnimation key={idx} animation="fade-up" delay={idx * 150}>
                <Card className="relative overflow-hidden bg-gradient-to-br from-[#b89547] via-[#dfc476] to-[#7a5e20] border border-[#f5e39b]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] shadow-black/50 rounded-sm p-8 h-full group">
                  {/* Metallic shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <p className="text-black/90 mb-6 leading-relaxed font-bold relative z-10">{testimonial.text}</p>
                  <p className="font-black text-sm uppercase tracking-widest text-black relative z-10">{testimonial.name}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-right">
              <div>
                <h2 className="text-5xl font-bold tracking-wide uppercase mb-6">
                  MATERIALES AVANZADOS PARA CONDICIONES EXTREMAS
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Nuestro equipo integra tecnologías de punta como GORE-TEX® y telas ripstop de grado militar para
                  garantizar el máximo rendimiento cuando más importa.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#333333] rounded-none">
                      <Droplet className="w-6 h-6 text-[#21f31f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-wide uppercase mb-2">IMPERMEABLE</h3>
                      <p className="text-gray-400">
                        Tecnología de membrana avanzada que te mantiene seco en cualquier condición climática.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#333333] rounded-none">
                      <Wind className="w-6 h-6 text-[#21f31f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-wide uppercase mb-2">TRANSPIRABLE</h3>
                      <p className="text-gray-400">Telas que absorben la humedad aseguran confort durante operaciones intensas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#333333] rounded-none">
                      <Shield className="w-6 h-6 text-[#21f31f]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-wide uppercase mb-2">DURABLE</h3>
                      <p className="text-gray-400">
                        Construcción ripstop de grado militar que resiste los entornos más duros.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-left" delay={200}>
              <div className="relative h-[350px] md:h-[600px] overflow-hidden">
                <img
                  src="/tactical-fabric-texture-close-up.webp"
                  alt="Advanced fabric technology"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Carousel de Accesorios Destacados */}
      <section 
        className="py-20 bg-black bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url('/fondo-soluciones-tact.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase mb-4 text-white">
                MÁS SOLUCIONES TÁCTICAS
              </h2>
              <p className="text-lg text-gray-400">
                Complementa tu equipamiento con accesorios de alto rendimiento
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="zoom-in" delay={200}>
            <div className="max-w-5xl mx-auto px-4 md:px-12">
              <Carousel
                className="w-full"
                opts={{ loop: true, align: "start" }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-2">
                    <div className="relative overflow-hidden group h-[400px] md:h-[500px]">
                      <img
                        src="/accesorios-a.webp"
                        alt="Accesorios A"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-2">
                    <div className="relative overflow-hidden group h-[400px] md:h-[500px]">
                      <img
                        src="/accesorios-b.webp"
                        alt="Accesorios B"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-black border-zinc-800 text-white hover:bg-[#21f31f] hover:text-black hover:border-[#21f31f] rounded-none w-10 h-10 md:w-12 md:h-12 flex" />
              <CarouselNext className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-black border-zinc-800 text-white hover:bg-[#21f31f] hover:text-black hover:border-[#21f31f] rounded-none w-10 h-10 md:w-12 md:h-12 flex" />
            </Carousel>
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </div >
  )
}


