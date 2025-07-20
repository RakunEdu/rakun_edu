"use client"

import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"
import type { ProductWithGallery } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Shield, Truck, RotateCcw, Users, Clock } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"

export default function ProductPageClient({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) as ProductWithGallery | undefined
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Mahsulot topilmadi</div>
  }

  // Use product's gallery images or fallback to main image
  const productImages = product.gallery || [
    product.image,
    "/placeholder.svg?height=400&width=400&text=No+Gallery",
    "/placeholder.svg?height=400&width=400&text=No+Gallery",
    "/placeholder.svg?height=400&width=400&text=No+Gallery",
    "/placeholder.svg?height=400&width=400&text=No+Gallery",
  ]

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, quantity)

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const isComicOrBook =
    product.category.toLowerCase().includes("komiks") ||
    product.category.toLowerCase().includes("grafik") ||
    product.category.toLowerCase().includes("kitob")

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
          <Link href="/" className="hover:text-slate-800">
            Bosh sahifa
          </Link>
          <span>/</span>
          <Link href={isComicOrBook ? "/my-hero" : "/board-games"} className="hover:text-slate-800">
            {isComicOrBook ? "My Hero" : "Stol O'yinlari"}
          </Link>
          <span>/</span>
          <span className="text-slate-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-7">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col space-y-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedImage === index
                        ? "border-slate-800 ring-2 ring-slate-200"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative aspect-square bg-slate-50 rounded-lg overflow-hidden">
                  <Image
                    src={productImages[selectedImage] || "/placeholder.svg"}
                    alt={`${product.name} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={selectedImage === 0}
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="absolute top-4 right-16 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm">
                    {selectedImage + 1} / {productImages.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Asl Mahsulot Kafolati</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
              <p className="text-slate-600">{product.category}</p>
            </div>

            {/* Seller Info */}
            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">RE</span>
              </div>
              <div>
                <p className="font-medium">Rakun Edu Official</p>
                <p className="text-sm text-slate-600">100% ijobiy • Sotuvchining boshqa mahsulotlari</p>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</div>
              <p className="text-slate-600">yoki Eng Yaxshi Taklif</p>
              <p className="text-sm text-slate-500">
                oyiga {formatPrice(Math.floor(product.price / 12))} dan moliyalashtirish bilan
              </p>
            </div>

            {/* Condition */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-700">Holat:</span>
              <span className="font-medium">Yangi</span>
            </div>

            {/* Game/Comic Features */}
            <div className="space-y-3">
              <h3 className="font-medium text-slate-900">Xususiyatlar:</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    {!isComicOrBook && index === 0 && <Users className="h-4 w-4 text-slate-500" />}
                    {!isComicOrBook && index === 1 && <Clock className="h-4 w-4 text-slate-500" />}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-700">Miqdor:</span>
              <div className="flex items-center border border-slate-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-slate-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-lg"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Qo'shilmoqda..." : "Hozir Sotib Olish"}
              </Button>

              <Button
                variant="outline"
                className="w-full py-4 text-lg font-medium rounded-lg border-2 hover:bg-slate-50 bg-transparent"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                Savatchaga Qo'shish
              </Button>

              <Button
                variant="outline"
                className="w-full py-4 text-lg font-medium rounded-lg border-2 hover:bg-slate-50 bg-transparent"
              >
                Taklif Qilish
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">Bepul yetkazib berish</p>
                  <p className="text-sm text-slate-600">2-3 ish kuni ichida</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">30 kunlik qaytarish</p>
                  <p className="text-sm text-slate-600">Bepul qaytarish va almashtirish</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">Kafolat</p>
                  <p className="text-sm text-slate-600">Asl mahsulot kafolati</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
