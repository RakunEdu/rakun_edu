"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import { ChevronDown, Filter, X } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function SearchPageClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [query])

  const categories = [
    "Strategiya Stol O'yini",
    "Oilaviy Stol O'yini",
    "Hamkorlik Stol O'yini",
    "Superqahramon Komiks",
    "Grafik Roman",
    "Ilmiy-Fantastik Komiks",
  ]

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase()
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.features.some((feature) => feature.toLowerCase().includes(searchTerm)),
    )

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.some((cat) => product.category.includes(cat)))
    }

    // Apply price filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

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
      case "relevance":
        // Sort by relevance (name matches first, then category, then features)
        filtered.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(searchTerm)
          const bNameMatch = b.name.toLowerCase().includes(searchTerm)
          if (aNameMatch && !bNameMatch) return -1
          if (!aNameMatch && bNameMatch) return 1
          return 0
        })
        break
      default: // newest
        break
    }

    return filtered
  }, [query, sortBy, selectedCategories, priceRange])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000000])
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000000

  if (!query.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-slate-900 mb-2">Qidiruv so'rovi kiritilmagan</h2>
          <p className="text-slate-600">Mahsulotlarni qidirish uchun yuqoridagi qidiruv maydonidan foydalaning.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Qidiruv natijalari: <span className="text-orange-600">"{query}"</span>
        </h1>
        {!isLoading && (
          <p className="text-slate-600">
            {filteredProducts.length} ta mahsulot topildi
            {hasActiveFilters && " (filtrlar qo'llanilgan)"}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Filtrlar</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Tozalash
                </Button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-slate-900 mb-3">Kategoriyalar</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-slate-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-slate-900 mb-3">Narx oralig'i</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ""}
                    onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] === 1000000 ? "" : priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 1000000])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {!isLoading && filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrlar
                </Button>
                {hasActiveFilters && (
                  <span className="text-sm text-slate-600 bg-orange-50 px-2 py-1 rounded-full">
                    {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 1000000 ? 1 : 0)} ta filtr
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Saralash:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-slate-300 bg-white pr-8 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent rounded-lg cursor-pointer"
                  >
                    <option value="relevance">Mos kelishi bo'yicha</option>
                    <option value="newest">Eng Yangi</option>
                    <option value="price-low">Narx: Arzondan Qimmatge</option>
                    <option value="price-high">Narx: Qimmatdan Arzonga</option>
                    <option value="name">Nom bo'yicha</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-slate-400" />
                </div>
              </div>
            </div>
          )}

          <ProductGrid products={filteredProducts} loading={isLoading} />

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-slate-900 mb-2">Hech narsa topilmadi</h2>
              <p className="text-slate-600 mb-6">
                "{query}" uchun hech qanday mahsulot topilmadi. Boshqa kalit so'zlar bilan qidirib ko'ring.
              </p>
              <div className="space-y-2 text-sm text-slate-500 max-w-md mx-auto">
                <p className="font-medium">Maslahatlar:</p>
                <ul className="list-disc list-inside space-y-1 text-left">
                  <li>Imlo xatolarini tekshiring</li>
                  <li>Umumiy kalit so'zlardan foydalaning</li>
                  <li>Kamroq so'zlar bilan qidirib ko'ring</li>
                  <li>Filtrlarni olib tashlang</li>
                </ul>
              </div>
              {hasActiveFilters && (
                <Button onClick={clearFilters} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Barcha filtrlarni olib tashlash
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
