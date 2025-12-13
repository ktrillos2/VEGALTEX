"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
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

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState("L")
  const [scrollSlideIndex, setScrollSlideIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Product data - in a real app, this would come from an API
  const product = {
    id: 1,
    name: "DELTA ML GEN.3 TACTICAL WINTER JACKET",
    price: 320,
    badge: "NEW",
    rating: 5,
    reviews: 7,
    description:
      "A versatile cold-weather solution with premium insulation, windproof protection, and innovative features for optimal performance in harsh conditions.",
    colors: [
      {
        name: "Black",
        hex: "#000000",
        images: [
          "/images/products/jacket-delta-ml-black.jpg",
          "/images/products/jacket-delta-ml-black.jpg",
          "/images/products/jacket-delta-ml-black.jpg",
          "/images/products/jacket-delta-ml-black.jpg",
        ],
      },
      {
        name: "Brown Grey",
        hex: "#4B5320",
        images: [
          "/images/products/jacket-delta-ml-olive.jpg",
          "/images/products/jacket-delta-ml-olive.jpg",
          "/images/products/jacket-delta-ml-olive.jpg",
          "/images/products/jacket-delta-ml-olive.jpg",
        ],
      },
      {
        name: "Steel Grey",
        hex: "#5a5a5a",
        images: [
          "/images/products/jacket-delta-ml-gray.jpg",
          "/images/products/jacket-delta-ml-gray.jpg",
          "/images/products/jacket-delta-ml-gray.jpg",
          "/images/products/jacket-delta-ml-gray.jpg",
        ],
      },
      {
        name: "Navy Blue",
        hex: "#2d3e50",
        images: [
          "/images/products/jacket-delta-ml-navy.jpg",
          "/images/products/jacket-delta-ml-navy.jpg",
          "/images/products/jacket-delta-ml-navy.jpg",
          "/images/products/jacket-delta-ml-navy.jpg",
        ],
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    features: [
      "Premium insulation for extreme cold",
      "Windproof and water-resistant",
      "Multiple tactical pockets",
      "Reinforced elbows and shoulders",
      "YKK zippers throughout",
      "Adjustable hood and cuffs",
    ],
    upgradeWith: [
      {
        name: "URBAN T-SHIRT",
        price: 43,
        image: "/images/products/shirt-urban-olive.jpg",
        colors: ["#000000", "#4B5320", "#8B7355", "#2d3e50"],
      },
      {
        name: "URBAN POLO SHIRT",
        price: 49,
        image: "/images/products/shirt-polo-olive.jpg",
        colors: ["#4B5320", "#000000", "#8B7355", "#2d3e50"],
      },
      {
        name: "WATCH CAP",
        price: 32,
        image: "/images/products/cap-watch-olive.jpg",
        colors: ["#4B5320", "#000000"],
      },
    ],
  }

  const currentImages = product.colors[selectedColor].images

  const addToCart = () => {
    // In a real implementation, this would update a global context
    console.log("Added to cart")
  }

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const container = scrollContainerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      // Check if the slider section is in the viewport
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight

      if (isInView) {
        const totalSlides = slides.length
        const delta = e.deltaY

        // If we're in the middle of slides, always prevent scroll
        if (scrollSlideIndex > 0 && scrollSlideIndex < totalSlides - 1) {
          e.preventDefault()
          if (delta > 0) {
            setScrollSlideIndex((prev) => prev + 1)
          } else {
            setScrollSlideIndex((prev) => prev - 1)
          }
        }
        // At first slide, scrolling up - allow normal scroll
        else if (scrollSlideIndex === 0 && delta < 0) {
          // Allow normal scroll up
          return
        }
        // At first slide, scrolling down - prevent and advance
        else if (scrollSlideIndex === 0 && delta > 0) {
          e.preventDefault()
          setScrollSlideIndex(1)
        }
        // At last slide, scrolling down - allow normal scroll
        else if (scrollSlideIndex === totalSlides - 1 && delta > 0) {
          // Allow normal scroll down
          return
        }
        // At last slide, scrolling up - prevent and go back
        else if (scrollSlideIndex === totalSlides - 1 && delta < 0) {
          e.preventDefault()
          setScrollSlideIndex((prev) => prev - 1)
        }
      }
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [scrollSlideIndex])

  const slides = [
    {
      title: "WINDPROOF AND WATER-REPELLENT FACE FABRIC.",
      description:
        "A polyamide fabric with natural stretch and a polyurethane membrane protects you from light rain and cold winds.",
      image: "/images/products/jacket-feature-windproof.jpg",
    },
    {
      title: "HIGH-PERFORMANCE LIGHTWEIGHT INSULATION.",
      description:
        "Advanced synthetic insulation provides exceptional warmth-to-weight ratio for extreme cold weather operations.",
      image: "/images/products/jacket-feature-insulation.jpg",
    },
    {
      title: "FAST-DRYING AND BREATHABLE BASE LINING.",
      description:
        "Moisture-wicking interior lining ensures comfort during high-intensity activities and rapid temperature changes.",
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
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-3">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-600">{product.reviews} reviews</span>
                </div>
                <div className="text-3xl font-black mb-4">{product.price}€</div>
                <p className="text-zinc-700 leading-relaxed">
                  {product.description}{" "}
                  <Link href="#" className="text-[#4B5320] font-bold hover:underline">
                    More Info
                  </Link>
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3">COLOUR:</label>
                <div className="flex gap-3 mb-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(idx)
                        setSelectedImage(0)
                      }}
                      className={`relative group`}
                    >
                      <div
                        className={`w-16 h-16 border-3 transition-all ${selectedColor === idx
                          ? "border-[#21f31f] ring-2 ring-[#21f31f]/30"
                          : "border-zinc-400 hover:border-zinc-600"
                          }`}
                      >
                        <img
                          src={color.images[0] || "/placeholder.svg"}
                          alt={color.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-zinc-600">{product.colors[selectedColor].name}</p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-3">SIZE:</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 font-bold text-sm uppercase transition-all ${selectedSize === size
                        ? "bg-[#21f31f] border-[#21f31f] text-black"
                        : "bg-white border-zinc-300 text-black hover:border-[#21f31f]"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-[#4B5320]" />
                <span>Est. delivery on or before Friday, 12 Dec</span>
              </div>

              {/* Add to Basket */}
              <div className="flex gap-3">
                <Button
                  onClick={addToCart}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-6 rounded-none uppercase tracking-wider text-base"
                >
                  ADD TO BASKET
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-14 h-14 border-zinc-700 hover:bg-zinc-100 rounded-none bg-transparent"
                >
                  <Heart className="w-6 h-6" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-zinc-700 text-black hover:bg-zinc-100 py-4 rounded-none uppercase font-bold text-sm bg-transparent"
              >
                Find your size
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade With Section */}
      <section className="py-12 md:py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-center mb-12 tracking-tight">UPGRADE WITH:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.upgradeWith.map((item, idx) => (
              <Card
                key={idx}
                className="bg-white rounded-none border-zinc-300 overflow-hidden hover:border-[#21f31f] hover:shadow-lg transition-all"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-black uppercase text-lg mb-3">{item.name}</h3>
                  <p className="text-2xl font-bold mb-4">{item.price}€</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {item.colors.map((color, colorIdx) => (
                      <div
                        key={colorIdx}
                        className="w-6 h-6 border-2 border-zinc-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Button className="w-full bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold rounded-none uppercase tracking-wider">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Locked Vertical Slider Section */}
      <section ref={scrollContainerRef} className="relative h-screen bg-black overflow-hidden">
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
          <div className="relative flex items-center justify-center p-8 md:p-16">
            <div className="max-w-xl space-y-12">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`transition-opacity duration-700 ${scrollSlideIndex === idx ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">{slide.title}</h2>
                  {scrollSlideIndex === idx && (
                    <p className="text-lg text-zinc-300 leading-relaxed">{slide.description}</p>
                  )}
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
      </section>

      {/* Detailed Product Information Sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Technical Specifications */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              TECHNICAL SPECIFICATIONS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg uppercase mb-4 text-[#21f31f]">MATERIALS</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Outer Shell:</span>
                    <span className="font-bold">Nylon Ripstop</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Insulation:</span>
                    <span className="font-bold">PrimaLoft® Gold</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Membrane:</span>
                    <span className="font-bold">Polyurethane</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Lining:</span>
                    <span className="font-bold">Polyester Mesh</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg uppercase mb-4 text-[#21f31f]">PERFORMANCE</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Water Resistance:</span>
                    <span className="font-bold">10,000mm</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Breathability:</span>
                    <span className="font-bold">10,000g/m²/24h</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Weight:</span>
                    <span className="font-bold">890g (Size M)</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-200 pb-2">
                    <span>Temperature Range:</span>
                    <span className="font-bold">-20°C to 5°C</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              KEY FEATURES
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "YKK Zippers", desc: "Heavy-duty YKK zippers throughout for reliability" },
                {
                  icon: Shield,
                  title: "Reinforced Construction",
                  desc: "Reinforced elbows and shoulders for durability",
                },
                { icon: Package, title: "Multiple Pockets", desc: "8 tactical pockets with secure closures" },
                { icon: Thermometer, title: "Temperature Control", desc: "Pit zips for ventilation control" },
                { icon: Layers, title: "Adjustable Fit", desc: "Adjustable hood, cuffs, and hem" },
                { icon: Tag, title: "Hook & Loop", desc: "Velcro panels for patches and ID" },
              ].map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={idx}
                    className="p-6 border-2 border-zinc-200 hover:border-[#21f31f] transition-all duration-300 rounded-none hover:shadow-[0_0_20px_rgba(33,243,31,0.3)] cursor-pointer group"
                  >
                    <IconComponent className="w-10 h-10 mb-3 text-[#21f31f] group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg uppercase mb-2 text-white">{feature.title}</h3>
                    <p className="text-sm text-card-foreground">{feature.desc}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 border-b-4 border-[#21f31f] pb-4 text-black">
              CARE INSTRUCTIONS
            </h2>
            <div className="bg-zinc-50 p-8 border-l-4 border-[#21f31f]">
              <ul className="space-y-3 text-zinc-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span>Machine wash at 30°C with similar colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span>Do not bleach or use fabric softener</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span>Tumble dry on low heat or hang dry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span>Iron on low setting if needed, avoid direct heat on prints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#21f31f] font-bold">•</span>
                  <span>Store in a cool, dry place away from direct sunlight</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                FOR WHATEVER WINTER THROWS AT YOU.
              </h2>
              <p className="text-zinc-300 mb-8 leading-relaxed text-lg">
                Originally designed as a mid-layer, the new generation Delta ML works also as stand-alone jacket for
                when temperatures hit the zero mark. The jacket offers exceptional weather protection, great wear
                comfort and can be modified according to your layering needs.
              </p>
              <div className="space-y-4">
                <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold px-8 py-6 rounded-none uppercase tracking-wider text-base">
                  <Play className="w-5 h-5 mr-2" />
                  WATCH VIDEO
                </Button>
                <Button
                  variant="outline"
                  className="ml-4 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 rounded-none uppercase tracking-wider text-base bg-transparent"
                >
                  WATCH DEEP DIVE
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
