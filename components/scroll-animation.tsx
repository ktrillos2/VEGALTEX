"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollAnimation({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in"
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const baseClasses = "transition-all duration-1000 ease-out opacity-0"
  
  const animationClasses = {
    "fade-up": "translate-y-12",
    "fade-in": "",
    "slide-left": "translate-x-12",
    "slide-right": "-translate-x-12",
    "zoom-in": "scale-95",
  }

  const visibleClasses = {
    "fade-up": "translate-y-0 opacity-100",
    "fade-in": "opacity-100",
    "slide-left": "translate-x-0 opacity-100",
    "slide-right": "translate-x-0 opacity-100",
    "zoom-in": "scale-100 opacity-100",
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
