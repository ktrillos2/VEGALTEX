"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crosshair, AlertTriangle } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-[#21f31f] flex flex-col items-center justify-center relative overflow-hidden font-mono">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(#21f31f 1px, transparent 1px), linear-gradient(90deg, #21f31f 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Radar Scan Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="absolute w-[800px] h-[800px] border border-[#21f31f]/20 rounded-full opacity-50" />
                <div className="absolute w-[600px] h-[600px] border border-[#21f31f]/20 rounded-full opacity-50" />
                <div className="absolute w-[400px] h-[400px] border border-[#21f31f]/20 rounded-full opacity-50" />
                <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-transparent via-[#21f31f]/10 to-transparent rounded-full mix-blend-screen"
                    style={{ animation: 'spin 4s linear infinite' }}
                />
            </div>

            <div className="relative z-10 text-center px-4">
                {/* Animated Glitch Text */}
                <div className="mb-2 flex justify-center">
                    <AlertTriangle className="w-16 h-16 text-[#21f31f] animate-pulse" />
                </div>

                <h1 className="text-8xl md:text-9xl font-black mb-4 tracking-tighter relative select-none font-monument">
                    <span className="relative inline-block">
                        404
                        <span className="absolute top-0 left-0 -translate-x-[2px] opacity-50 animate-pulse">404</span>
                        <span className="absolute top-0 left-0 translate-x-[2px] opacity-50 animate-pulse duration-75">404</span>
                    </span>
                </h1>

                <div className="bg-[#21f31f] text-black px-4 py-1 text-xl font-bold inline-block mb-8 animate-bounce uppercase tracking-widest">
                    SEÑAL PERDIDA
                </div>

                <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 border-l-2 border-[#21f31f] pl-4 text-left font-mono leading-relaxed">
                    &gt; ERROR CRÍTICO<br />
                    &gt; EL OBJETIVO SOLICITADO NO SE ENCUENTRA EN EL RADAR.<br />
                    &gt; COORDENADAS INVÁLIDAS O ARCHIVO CLASIFICADO.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                        <Button className="bg-[#21f31f] text-black hover:bg-[#1dd11b] font-bold uppercase tracking-wider h-14 px-8 rounded-none border-2 border-transparent hover:scale-105 transition-transform">
                            <Crosshair className="w-5 h-5 mr-2" />
                            REGRESAR A LA BASE
                        </Button>
                    </Link>

                    <Link href="/jackets">
                        <Button variant="outline" className="border-[#21f31f] text-[#21f31f] hover:bg-[#21f31f] hover:text-black font-bold uppercase tracking-wider h-14 px-8 rounded-none bg-transparent hover:scale-105 transition-all">
                            EXPLORAR EQUIPAMIENTO
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4 border-[#21f31f] opacity-50" />
            <div className="absolute top-10 right-10 w-16 h-16 border-t-4 border-r-4 border-[#21f31f] opacity-50" />
            <div className="absolute bottom-10 left-10 w-16 h-16 border-b-4 border-l-4 border-[#21f31f] opacity-50" />
            <div className="absolute bottom-10 right-10 w-16 h-16 border-b-4 border-r-4 border-[#21f31f] opacity-50" />

            <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
