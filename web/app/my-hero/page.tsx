"use client"

import { getMyHeroProducts } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import { ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"

export default function MyHeroPage() {
  const [sortBy, setSortBy] = useState("newest")

  const filteredProducts = useMemo(() => {
    const filtered = getMyHeroProducts()

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
  }, [sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Hero</h1>
        <p className="text-slate-600">Qahramonlik haqidagi ajoyib hikoyalar</p>
      </div>

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
