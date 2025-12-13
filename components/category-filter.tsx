"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

const CATEGORIES = [
    { name: "CHAQUETAS", href: "/jackets" },
    { name: "PANTALONES", href: "/pants" },
    { name: "CAMISAS", href: "/shirts" },
    { name: "GORRAS", href: "/caps" },
    { name: "ACCESORIOS", href: "/accessories" },
]

interface CategoryFilterProps {
    currentCategory: string
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button
                    variant="outline"
                    className="bg-white border-gray-300 text-black hover:border-gray-900 rounded-sm uppercase font-bold text-xs h-9 px-4 whitespace-nowrap min-w-[140px] justify-between data-[state=open]:border-gray-900"
                >
                    CATEGORÍA: <span className="text-[#4B5320] ml-1">{currentCategory}</span>
                    <ChevronDown className="w-3 h-3 ml-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[200px] bg-white border border-gray-200 shadow-xl z-50 rounded-sm overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100 will-change-[transform,opacity]"
                    sideOffset={5}
                    align="start"
                >
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <DropdownMenu.Item key={cat.name} asChild>
                                <Link
                                    href={cat.href}
                                    className={`block px-4 py-2.5 text-xs font-bold uppercase transition-colors outline-none cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 ${cat.name === currentCategory
                                            ? "text-[#21f31f] bg-black hover:bg-black/90 focus:bg-black/90"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            </DropdownMenu.Item>
                        ))}
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
