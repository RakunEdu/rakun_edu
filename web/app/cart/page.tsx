"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart()

  const shipping = items.length > 0 ? 71880 : 0 // 5.99 USD * 12000 UZS
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    setUpdatingItems((prev) => new Set(prev).add(productId))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    updateQuantity(productId, newQuantity)
    setUpdatingItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
  }

  const handleRemoveItem = async (productId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(productId))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    removeFromCart(productId)
    setUpdatingItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    // Redirect to checkout or show success message
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-6">
          <ShoppingBag className="h-6 w-6 text-slate-600" />
          <h1 className="text-2xl font-bold text-slate-900">Sizning Savatchangiz</h1>
          {items.length > 0 && (
            <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full font-medium">
              {items.length} ta mahsulot
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
            <div className="text-slate-400 mb-4">
              <ShoppingBag className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Savatchangiz bo'sh</h2>
            <p className="text-slate-600 mb-6">Sevimli mahsulotlaringizni qo'shib, xaridni boshlang!</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Xaridni Boshlash
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="p-4 md:p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Mahsulotlar</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Barchasini o'chirish
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 bg-slate-50 relative flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        <div className="flex-grow space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-grow">
                              <h3 className="font-medium text-slate-900 text-base md:text-lg">{item.product.name}</h3>
                              <p className="text-slate-500 text-sm">{item.product.category}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.product.features.slice(0, 2).map((feature, index) => (
                                  <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-bold text-lg text-slate-900">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              <p className="text-sm text-slate-500">
                                {formatPrice(item.product.price)} x {item.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-slate-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityUpdate(item.product.id, item.quantity - 1)}
                                  disabled={updatingItems.has(item.product.id) || item.quantity <= 1}
                                  className="px-3 py-2 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                                  aria-label="Miqdorni kamaytirish"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-4 py-2 border-l border-r border-slate-300 font-medium min-w-[3rem] text-center">
                                  {updatingItems.has(item.product.id) ? (
                                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto" />
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={() => handleQuantityUpdate(item.product.id, item.quantity + 1)}
                                  disabled={updatingItems.has(item.product.id)}
                                  className="px-3 py-2 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                                  aria-label="Miqdorni ko'paytirish"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              disabled={updatingItems.has(item.product.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Mahsulotni o'chirish"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 md:p-6 border-t border-slate-200">
                  <Link href="/">
                    <Button variant="outline" className="hover:bg-slate-100 transition-colors bg-transparent">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Xaridni Davom Ettirish
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Buyurtma Xulosasi</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Oraliq Jami</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Yetkazib Berish</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Bepul" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Soliq</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg text-slate-900">
                    <span>Jami</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Jarayon...
                    </div>
                  ) : (
                    "To'lov Qilish"
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">Xavfsiz to'lov SSL shifrlash bilan himoyalangan</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
