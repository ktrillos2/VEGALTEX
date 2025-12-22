"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-16 md:pt-24">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 font-monument">
                        CONTÁCTENOS
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Estamos listos para equiparte. Comunícate con nosotros para consultas sobre productos, pedidos especiales o soporte táctico.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="bg-zinc-950 border border-zinc-800 p-8">
                        <h2 className="text-2xl font-bold uppercase text-white mb-8 border-l-4 border-[#21f31f] pl-4">
                            ENVIAR MENSAJE
                        </h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase text-gray-400">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-[#21f31f] outline-none transition-colors"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase text-gray-400">Apellido</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-[#21f31f] outline-none transition-colors"
                                        placeholder="Tu apellido"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase text-gray-400">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-[#21f31f] outline-none transition-colors"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase text-gray-400">Asunto</label>
                                <select className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-[#21f31f] outline-none transition-colors appearance-none">
                                    <option>Consulta General</option>
                                    <option>Estado del Pedido</option>
                                    <option>Devoluciones / Garantía</option>
                                    <option>Ventas Mayoristas</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase text-gray-400">Mensaje</label>
                                <textarea
                                    className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-[#21f31f] outline-none transition-colors min-h-[150px]"
                                    placeholder="¿En qué podemos ayudarte?"
                                ></textarea>
                            </div>

                            <Button className="w-full bg-[#21f31f] hover:bg-[#1dd11b] text-black font-bold h-14 uppercase tracking-wider text-lg rounded-none">
                                ENVIAR COMUNICACIÓN
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none group hover:border-[#21f31f] transition-all">
                                <Phone className="w-8 h-8 text-[#21f31f] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold uppercase text-white mb-2">TELÉFONO</h3>
                                <p className="text-gray-400 text-sm mb-1">Lunes a Viernes, 9am - 6pm</p>
                                <p className="text-xl font-bold text-white">+57 300 000 0000</p>
                            </Card>

                            <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none group hover:border-[#21f31f] transition-all">
                                <Mail className="w-8 h-8 text-[#21f31f] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-bold uppercase text-white mb-2">EMAIL</h3>
                                <p className="text-gray-400 text-sm mb-1">Respuesta en 24 horas</p>
                                <p className="text-lg font-bold text-white">info@vegaltex.com</p>
                            </Card>
                        </div>

                        <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none group hover:border-[#21f31f] transition-all">
                            <MapPin className="w-8 h-8 text-[#21f31f] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold uppercase text-white mb-2">UBICACIÓN TÁCTICA</h3>
                            <p className="text-gray-400 mb-2">
                                Calle 123 #45-67, Bogotá D.C.<br />
                                Colombia
                            </p>
                            <Button variant="link" className="text-[#21f31f] p-0 h-auto font-bold uppercase hover:text-white">
                                VER EN EL MAPA &rarr;
                            </Button>
                        </Card>

                        <div className="bg-[#21f31f]/10 border border-[#21f31f]/30 p-6">
                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 text-[#21f31f] mt-1" />
                                <div className="flex-1">
                                    <h3 className="font-bold uppercase text-white mb-2">HORARIO DE OPERACIONES</h3>
                                    <div className="space-y-1 text-sm text-gray-300">
                                        <div className="flex justify-between gap-12">
                                            <span>Lunes - Viernes:</span>
                                            <span className="font-bold text-white">9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between gap-12">
                                            <span>Sábado:</span>
                                            <span className="font-bold text-white">10:00 AM - 4:00 PM</span>
                                        </div>
                                        <div className="flex justify-between gap-12">
                                            <span>Domingo:</span>
                                            <span className="text-[#21f31f] font-bold">CERRADO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
