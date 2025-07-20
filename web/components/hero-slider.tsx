"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Ajoyib Stol O'yinlarini Kashf Eting",
    subtitle: "Strategiya va oilaviy o'yinlar to'plamimizni o'rganing",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Stol O'yinlari",
    link: "/board-games",
  },
  {
    id: 2,
    title: "Epik Komiks To'plami",
    subtitle: "Superqahramonlardan tortib ilmiy-fantastik sarguzashtlargacha",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Komikslarni Ko'rish",
    link: "/comics",
  },
  {
    id: 3,
    title: "Har Hafta Yangi Mahsulotlar",
    subtitle: "Eng so'nggi chiqarilgan mahsulotlar bilan tanishib turing",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Barcha Mahsulotlar",
    link: "/",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
              <Link href={slide.link}>
                <Button className="bg-white text-black hover:bg-gray-200 transition-colors px-8 py-3 text-lg">
                  {slide.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
        aria-label="Oldingi slayd"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
        aria-label="Keyingi slayd"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`${index + 1}-slaydga o'tish`}
          />
        ))}
      </div>
    </div>
  )
}
