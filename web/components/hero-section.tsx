"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Users, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Rakun Quruvchi",
    subtitle: "Ta'lim O'yini",
    price: 250000,
    originalPrice: 349000,
    description:
      "Bolalar uchun qiziqarli qurilish va yaratish o'yini. Kreativlikni rivojlantiradi va mantiqiy fikrlashni kuchaytiradi.",
    image: "/images/rakun_q.png",
    cta: "Hozir Sotib Olish",
    link: "/product/rakun-quruvchi",
    features: ["2-4 O'yinchi", "30+ Daqiqa", "6+ Yosh"],
    rating: 4.9,
    reviews: 127,
    badge: "Eng Mashhur",
  },
  {
    id: 2,
    title: "Samira va Oltin Pat",
    subtitle: "My Hero Seriyasi",
    price: 200000,
    originalPrice: 229000,
    description: "Qahramonlik haqida ajoyib hikoya. Bolalarga yaxshi va yomon o'rtasidagi farqni o'rgatadi.",
    image: "/image/rakun_hero.png",
    cta: "Hozir Sotib Olish",
    link: "/product/samira-va-oltin-pat",
    features: ["Premium Nashr", "Rangli", "Bolalar uchun"],
    rating: 4.8,
    reviews: 89,
    badge: "Yangi",
  },
  {
    id: 3,
    title: "Rakun Tilchi",
    subtitle: "Til O'rganish O'yini",
    price: 100000,
    originalPrice: 279000,
    description: "Tillarni o'rganishning qiziqarli usuli. Ingliz va o'zbek tillarini o'rganish uchun ideal.",
    image: "/images/rakun_l.png",
    cta: "Hozir Sotib Olish",
    link: "/product/rakun-tilchi",
    features: ["1-6 O'yinchi", "45+ Daqiqa", "8+ Yosh"],
    rating: 4.7,
    reviews: 156,
    badge: "Tavsiya Etiladi",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 300)
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 300)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("UZS", "so'm")
  }

  const currentSlideData = slides[currentSlide]
  const discount = Math.round(
    ((currentSlideData.originalPrice - currentSlideData.price) / currentSlideData.originalPrice) * 100,
  )

  return (
    <div className="relative h-[350px] lg:h-[450px] overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-orange-100/30 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-slate-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-orange-50/20 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full py-6">
          {/* Content */}
          <div
            className={`space-y-4 transition-all duration-700 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            {/* Badge and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm inline-block w-fit">
                {currentSlideData.badge}
              </span>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(currentSlideData.rating) ? "text-amber-600 fill-amber-600" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  {currentSlideData.rating} ({currentSlideData.reviews} sharh)
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <p className="text-orange-600 font-medium text-sm uppercase tracking-wide">{currentSlideData.subtitle}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                {currentSlideData.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed max-w-md text-sm lg:text-base">
              {currentSlideData.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1.5 shadow-sm"
                >
                  {index === 0 && <Users className="h-3.5 w-3.5 text-orange-500" />}
                  {index === 1 && <Clock className="h-3.5 w-3.5 text-orange-500" />}
                  {index === 2 && <Award className="h-3.5 w-3.5 text-orange-500" />}
                  <span className="text-xs font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl lg:text-3xl font-bold text-slate-800">
                  {formatPrice(currentSlideData.price)}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(currentSlideData.originalPrice)}
                </span>
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-md">-{discount}%</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={currentSlideData.link}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg w-full sm:w-auto">
                  {currentSlideData.cta}
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 w-full sm:w-auto bg-transparent"
              >
                Batafsil Ma'lumot
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div
              className={`relative transition-all duration-700 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {/* Product Card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
                {/* Discount Badge */}
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                  -{discount}%
                </div>

                <img
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt={currentSlideData.title}
                  className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain mx-auto transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Quick Stats */}
                <div className="mt-4 flex justify-between items-center text-slate-500 text-xs">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3.5 w-3.5 text-amber-600 fill-amber-600" />
                    <span>{currentSlideData.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{currentSlideData.reviews} sharh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="bg-white/90 backdrop-blur-sm hover:bg-white disabled:opacity-50 text-slate-600 p-2 rounded-full transition-all duration-300 hover:shadow-md border border-slate-200"
          aria-label="Oldingi slayd"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-8 h-2 bg-orange-500" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`${index + 1}-slaydga o'tish`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="bg-white/90 backdrop-blur-sm hover:bg-white disabled:opacity-50 text-slate-600 p-2 rounded-full transition-all duration-300 hover:shadow-md border border-slate-200"
          aria-label="Keyingi slayd"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
