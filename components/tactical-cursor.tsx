"use client"

import { useEffect, useRef } from "react"

export function TacticalCursor() {
    const cursorPreciseRef = useRef<HTMLDivElement>(null)
    const cursorRingContainerRef = useRef<HTMLDivElement>(null)
    const mechRingVisualRef = useRef<HTMLDivElement>(null)
    const ringWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // --- Configuración ---
        const LAG_FACTOR = 0.45

        // --- Estado ---
        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let ringX = mouseX
        let ringY = mouseY

        // --- Eventos ---
        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseDown = () => {
            if (mechRingVisualRef.current) {
                mechRingVisualRef.current.classList.add("clicking")
                mechRingVisualRef.current.style.transform = "scale(0.9) rotate(45deg)"
            }
        }

        const onMouseUp = () => {
            if (mechRingVisualRef.current) {
                mechRingVisualRef.current.classList.remove("clicking")
                mechRingVisualRef.current.style.transform = "scale(1) rotate(0deg)"
            }
        }

        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0]
            mouseX = touch.clientX
            mouseY = touch.clientY
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mousedown", onMouseDown)
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("touchmove", onTouchMove, { passive: true })

        // Hide default cursor globally ONLY on desktop
        // document.body.style.cursor = "none" // Removed direct assignment to allow CSS media query control

        // Also add a style tag for elements that might force a cursor
        const style = document.createElement("style")
        style.innerHTML = `
            @media (min-width: 1024px) {
                * {
                    cursor: none !important;
                }
                
                /* Custom styles for cursor elements */
                .crosshair-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #21f31f; /* Neon green matching theme */
                    border-radius: 50%;
                    box-shadow: 0 0 10px #21f31f;
                    transform: translate(-50%, -50%);
                }

                .crosshair-line-h {
                    position: absolute;
                    top: 0;
                    left: -18px;
                    width: 36px;
                    height: 4px;
                    background-color: #21f31f;
                    transform: translateY(-50%);
                }

                .crosshair-line-v {
                    position: absolute;
                    left: 0;
                    top: -18px;
                    height: 36px;
                    width: 4px;
                    background-color: #21f31f;
                    transform: translateX(-50%);
                }

                .mech-ring {
                    width: 100%;
                    height: 100%;
                    border: 2px dashed #21f31f;
                    border-radius: 50%;
                    box-shadow: 0 0 5px #21f31f;
                    animation: spin-slow 10s linear infinite; 
                    transition: border-width 0.1s, background-color 0.1s;
                }

                .mech-ring.clicking {
                    background-color: rgba(33, 243, 31, 0.2);
                    border-style: solid;
                    border-width: 3px;
                }

                @keyframes spin-slow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            }
        `
        document.head.appendChild(style)

        // --- Loop Principal (requestAnimationFrame) ---
        let animationFrameId: number

        function animate() {
            // Only run logic if needed, though harmless on mobile as elements are hidden

            // 1. Física del Anillo (Interpolación lineal - Lerp)
            const dx = mouseX - ringX
            const dy = mouseY - ringY

            // Movimiento: posición actual + (distancia * factor)
            ringX += dx * LAG_FACTOR
            ringY += dy * LAG_FACTOR

            // 2. Mover elementos visuales usando translate3d para GPU (Preciso e Inercia)
            if (cursorPreciseRef.current) {
                cursorPreciseRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
            }
            if (cursorRingContainerRef.current) {
                // Offset by 25px (half of 50px width/height) to center perfectly
                cursorRingContainerRef.current.style.transform = `translate3d(${ringX - 25}px, ${ringY - 25}px, 0)`
            }

            // 3. Calcular velocidad para efectos de deformación
            const speed = Math.abs(dx) + Math.abs(dy) // Aproximación rápida de velocidad

            // Efecto de inclinación/escala basado en velocidad 
            const scale = 1 + Math.min(speed * 0.005, 0.5)
            const rotation = dx * 0.5

            // Aplicamos esto al wrapper interno para deformación si hay movimiento significativo
            if (speed > 0.1 && ringWrapperRef.current) {
                // Removed translate(-50%, -50%) as container is now centered
                ringWrapperRef.current.style.transform = `scale(${scale}) rotate(${rotation}deg)`
            } else if (ringWrapperRef.current) {
                // Return to normal when stopped
                ringWrapperRef.current.style.transform = `scale(1) rotate(0deg)`
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        // Iniciar motor
        animate()

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mousedown", onMouseDown)
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("touchmove", onTouchMove)
            cancelAnimationFrame(animationFrameId)
            document.head.removeChild(style)
            document.body.style.cursor = "auto"
        }
    }, [])

    return (
        <>
            {/* 1. Cursor de Precisión - Hidden on mobile/tablet */}
            <div
                ref={cursorPreciseRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform hidden lg:block"
            >
                <div className="crosshair-dot" />
                <div className="crosshair-line-h" />
                <div className="crosshair-line-v" />
            </div>

            {/* 2. Cursor de Anillo - Hidden on mobile/tablet */}
            <div
                ref={cursorRingContainerRef}
                className="fixed top-0 left-0 w-[50px] h-[50px] pointer-events-none z-[9999] will-change-transform hidden lg:block"
            >
                <div ref={ringWrapperRef} className="w-full h-full">
                    <div ref={mechRingVisualRef} className="mech-ring" />
                </div>
            </div>
        </>
    )
}
