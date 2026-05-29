import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
    return (
        <footer className="bg-black border-t border-zinc-800 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h4 className="text-lg font-bold tracking-wide uppercase mb-6 text-white">TIENDA</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/pants" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Pantalones
                                </Link>
                            </li>
                            <li>
                                <Link href="/jackets" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Chaquetas
                                </Link>
                            </li>
                            <li>
                                <Link href="/shirts" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Camisas
                                </Link>
                            </li>
                            <li>
                                <Link href="/caps" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Gorras
                                </Link>
                            </li>
                            <li>
                                <Link href="/boots" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Botas
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessories" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Accesorios
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold tracking-wide uppercase mb-6 text-white">SOPORTE</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Contáctenos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Guía de Tallas
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Información de Envío
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Devoluciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Preguntas Frecuentes
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold tracking-wide uppercase mb-6 text-white">LEGAL</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Términos y Condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-[#21f31f] transition-colors">
                                    Política de Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-800 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} VEGALTEX TACTICAL COLOMBIA. Todos los derechos reservados.</p>
                    <p className="mt-2">
                        <a
                            href="https://www.kytcode.lat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#21f31f] hover:underline hover:text-[#1dd11b] transition-colors font-bold inline-flex items-center gap-1"
                        >
                            Desarrollado por K&T <span className="text-white">♥</span>
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
