"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { PRODUCT_CATEGORIES } from "@/config"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Category = typeof PRODUCT_CATEGORIES[number]

interface NavItemProps {
    category: Category
    handleOpen: () => void
    isOpen: boolean
    isAnyOpen: boolean
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
    return (
        <div className="flex">
            <div className="relative flex items-center">
                <Button className="gap-1.5 text-white hover:bg-gray-800" onClick={handleOpen} variant={isOpen ? "secondary" : "ghost"}>
                    {category.label}
                    <ChevronDown className={cn("h-4 w-4 transition-all text-white", { '-rotate-180': isOpen })} />
                </Button>
            </div>
            {isOpen ? (
                <div className={cn(
                    "absolute inset-x-0 top-full text-sm text-gray-300 bg-gray-900 border border-gray-700 shadow-lg rounded-md",
                    { "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen }
                )}>
                    <div className="relative bg-gray-900">
                        <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                                    {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75">
                                                <Image src={item.imageSrc} alt='product category image' fill className="object-cover object-center" />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-white group-hover:text-blue-400">
                                                {item.name}
                                            </a>
                                            <p className="mt-1 text-gray-400" aria-hidden='true'>
                                                Shop now
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default NavItem;
