"use client"

import { getUpcomingProducts } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import { ChevronDown, Clock } from "lucide-react"
import { useState, useMemo } from "react"

export default function UpcomingPage() {
  const [sortBy, setSortBy] = useState("newest")

  const filteredProducts = useMemo(() => {
    const filtered = getUpcomingProducts()

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
        <div className="flex items-center space-x-3 mb-2">
          <Clock className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-slate-900">Tez Orada</h1>
          <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium">Yangi</span>
        </div>
        <p className="text-slate-600">Kutilayotgan yangi mahsulotlar - oldindan buyurtma bering!</p>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 text-orange-800">
          <Clock className="h-5 w-5" />
          <p className="font-medium">Bu mahsulotlar hali chiqmagan va oldindan buyurtma qabul qilinmoqda.</p>
        </div>
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
