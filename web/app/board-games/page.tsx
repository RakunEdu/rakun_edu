"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import { ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"

export default function BoardGamesPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const [sortBy, setSortBy] = useState("newest")

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.category.toLowerCase().includes("stol o'yini") ||
        product.category.toLowerCase().includes("strategiya") ||
        product.category.toLowerCase().includes("oilaviy") ||
        product.category.toLowerCase().includes("hamkorlik"),
    )

    // Filter by category if specified
    if (category) {
      switch (category) {
        case "strategy":
          filtered = filtered.filter((p) => p.category.toLowerCase().includes("strategiya"))
          break
        case "family":
          filtered = filtered.filter((p) => p.category.toLowerCase().includes("oilaviy"))
          break
        case "cooperative":
          filtered = filtered.filter((p) => p.category.toLowerCase().includes("hamkorlik"))
          break
        case "card":
          filtered = filtered.filter((p) => p.features.some((f) => f.toLowerCase().includes("karta")))
          break
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // newest
        break
    }

    return filtered
  }, [category, sortBy])

  const getCategoryTitle = () => {
    switch (category) {
      case "strategy":
        return "Strategiya O'yinlari"
      case "family":
        return "Oilaviy O'yinlar"
      case "cooperative":
        return "Hamkorlik O'yinlari"
      case "card":
        return "Karta O'yinlari"
      default:
        return "Stol O'yinlari"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{getCategoryTitle()}</h1>

      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Saralash</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-slate-300 bg-white pr-8 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent rounded-lg cursor-pointer"
            >
              <option value="newest">Eng Yangi</option>
              <option value="price-low">Narx: Arzondan Qimmatge</option>
              <option value="price-high">Narx: Qimmatdan Arzonga</option>
              <option value="name">Nom bo'yicha</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-slate-400" />
          </div>
        </div>
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  )
}
