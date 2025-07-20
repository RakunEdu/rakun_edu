"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { useState } from "react"
import { formatPrice } from "@/lib/utils"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface ProductGridProps {
  products: Product[]
  compact?: boolean
  loading?: boolean
}

// Loading skeleton component
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 animate-pulse">
      <div className="aspect-square bg-slate-200 rounded-t-lg"></div>
      <div className="p-2 md:p-4 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="flex space-x-1">
          <div className="h-6 bg-slate-200 rounded w-16"></div>
          <div className="h-6 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  )
}

export default function ProductGrid({ products, compact = false, loading = false }: ProductGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const { addToCart } = useCart()

  const handleQuickAdd = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    setAddingToCart(product.id)

    try {
      addToCart(product, 1)
      // Simulate API call delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))
    } finally {
      setAddingToCart(null)
    }
  }

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId))
  }

  const generateStars = (rating = 4.8) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center space-x-0.5" aria-label={`${rating} yulduz reytingi`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-3 w-3 fill-amber-600 text-amber-600" />
        ))}
        {hasHalfStar && <Star className="h-3 w-3 fill-amber-600/50 text-amber-600" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-3 w-3 text-slate-300" />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Mahsulotlar topilmadi</h3>
        <p className="text-slate-600">Hozircha bu kategoriyada mahsulotlar yo'q.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
          aria-label={`${product.name} - ${formatPrice(product.price)}`}
        >
          <div className="relative aspect-square overflow-hidden rounded-t-lg bg-slate-50">
            {!imageErrors.has(product.id) ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-300 ${
                  hoveredProduct === product.id ? "scale-105" : ""
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                onError={() => handleImageError(product.id)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Overlay buttons */}
            <div
              className={`absolute inset-0 bg-black transition-all duration-300 ${
                hoveredProduct === product.id ? "bg-opacity-10" : "bg-opacity-0"
              }`}
            >
              <div
                className={`absolute top-2 right-2 md:top-3 md:right-3 flex flex-col space-y-1 md:space-y-2 transition-all duration-300 ${
                  hoveredProduct === product.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 md:opacity-0 md:-translate-y-2"
                } sm:opacity-100 sm:translate-y-0 md:opacity-0 md:-translate-y-2`}
              >
                <button
                  className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-800"
                  aria-label={`${product.name}ni sevimlilarga qo'shish`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // TODO: Implement wishlist functionality
                  }}
                >
                  <Heart className="h-3 w-3 md:h-4 md:w-4" />
                </button>
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  disabled={addingToCart === product.id}
                  className="p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`${product.name}ni savatchaga qo'shish`}
                >
                  {addingToCart === product.id ? (
                    <div className="h-3 w-3 md:h-4 md:w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  ) : (
                    <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sale badge */}
            <div className="absolute top-2 left-2 md:top-3 md:left-3">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium shadow-sm">
                Yangi
              </span>
            </div>
          </div>

          <div className="p-2 md:p-4">
            <h3
              className={`font-medium text-slate-900 mb-1 transition-colors duration-300 text-xs md:text-sm line-clamp-2 leading-tight ${
                hoveredProduct === product.id ? "text-slate-800" : ""
              }`}
            >
              {product.name}
            </h3>
            <p className="text-slate-500 mb-2 text-xs line-clamp-1">{product.category}</p>

            <div className="mb-2">
              <p className="font-bold text-slate-900 text-xs md:text-sm mb-1">{formatPrice(product.price)}</p>
              <div className="flex items-center space-x-1">
                {generateStars()}
                <span className="text-xs text-slate-500 ml-1">(4.8)</span>
              </div>
            </div>

            {/* Features - hidden on mobile for space */}
            <div className="hidden md:block">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs text-slate-400 px-1">+{product.features.length - 2}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
