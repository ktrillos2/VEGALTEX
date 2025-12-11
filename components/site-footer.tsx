import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
    return (
        <footer className="bg-black border-t border-zinc-800 py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
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
                    <div>
                        <h4 className="text-lg font-bold tracking-wide uppercase mb-6 text-white">BOLETÍN</h4>
                        <p className="text-gray-400 mb-4 text-sm">Mantente actualizado con lo último en equipamiento y ofertas exclusivas.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo"
                                className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:border-[#21f31f] focus:outline-none rounded-none text-sm"
                            />
                            <Button className="bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold uppercase rounded-none px-4">
                                IR
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-800 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 VEGALTEX TACTICAL COLOMBIA. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
