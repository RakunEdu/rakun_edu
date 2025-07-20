"use client"

import type React from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
      setSearchQuery("")
      setIsMobileMenuOpen(false)
      searchInputRef.current?.blur()
    }
  }

  const catalogItems = [
    { name: "Ta'lim O'yinlari", href: "/board-games?category=education", icon: "🎓" },
    { name: "Strategiya O'yinlari", href: "/board-games?category=strategy", icon: "🎯" },
    { name: "Oilaviy O'yinlar", href: "/board-games?category=family", icon: "👨‍👩‍👧‍👦" },
    { name: "Hamkorlik O'yinlari", href: "/board-games?category=cooperative", icon: "🤝" },
    { name: "Karta O'yinlari", href: "/board-games?category=card", icon: "🃏" },
    { name: "My Hero Kitoblar", href: "/my-hero", icon: "🦸" },
    { name: "Tez Orada", href: "/upcoming", icon: "⭐" },
  ]

  // Close catalog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false)
      }
    }

    if (isCatalogOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCatalogOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCatalogOpen(false)
  }, [pathname])

  // Keyboard navigation for catalog
  const handleCatalogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsCatalogOpen(false)
    }
  }

  return (
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/logo.png"
                alt="Rakun Logo"
                width={40}
                height={40}
                className="rounded-lg transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-slate-600 font-medium text-sm md:text-base">EDU</span>
            </Link>


          {/* Search Bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Stol o'yinlari va kitoblar qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent ${
                  isSearchFocused ? "border-slate-400 shadow-md" : "border-slate-300"
                }`}
                aria-label="Mahsulotlarni qidirish"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 rounded-md hover:bg-slate-100"
                aria-label="Qidirish"
                disabled={!searchQuery.trim()}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right side - Account and Cart */}
          <div className="flex items-center space-x-2">
            {/* Account - hidden on mobile, shown on desktop */}
            <Link
              href="/account"
              className="hidden md:flex items-center space-x-2 hover:bg-slate-100 transition-colors duration-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
            >
              <User className="h-5 w-5 text-slate-600" />
              <span className="text-slate-700 font-medium">Akkaunt</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              aria-label={`Savat - ${totalItems} ta mahsulot`}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="mt-4 hidden md:flex items-center space-x-1" role="navigation" aria-label="Asosiy navigatsiya">
          <div className="relative" ref={catalogRef}>
            <Button
              variant="ghost"
              className="bg-orange-500 text-white hover:bg-orange-600 rounded-lg px-4 py-2 transition-all duration-200 focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              onKeyDown={handleCatalogKeyDown}
              aria-expanded={isCatalogOpen}
              aria-haspopup="true"
              aria-label="Katalogni ochish"
            >
              <Menu className="h-4 w-4 mr-2" />
              Katalog
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform duration-200 ${isCatalogOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {/* Catalog Dropdown */}
            {isCatalogOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-2" role="menu" aria-label="Katalog menyusi">
                  {catalogItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors duration-200 focus:outline-none focus:bg-slate-100"
                      onClick={() => setIsCatalogOpen(false)}
                      role="menuitem"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/board-games"
            className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 ${
              pathname === "/board-games"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Stol O'yinlari
          </Link>

          <Link
            href="/my-hero"
            className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 ${
              pathname === "/my-hero"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            My Hero
          </Link>

          <Link
            href="/upcoming"
            className={`px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 ${
              pathname === "/upcoming"
                ? "bg-slate-800 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Tez Orada
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-slate-200 pt-4 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
                  aria-label="Mahsulotlarni qidirish"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  aria-label="Qidirish"
                  disabled={!searchQuery.trim()}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Account Link */}
            <Link
              href="/account"
              className="flex items-center space-x-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-slate-100 mb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Akkaunt</span>
            </Link>

            {/* Mobile Navigation */}
            <nav className="space-y-2" role="navigation" aria-label="Mobil navigatsiya">
              <Link
                href="/board-games"
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🎲 Stol O'yinlari
              </Link>
              <Link
                href="/my-hero"
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📚 My Hero
              </Link>
              <Link
                href="/upcoming"
                className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ⭐ Tez Orada
              </Link>

              {/* Mobile Catalog */}
              <div className="border-t border-slate-200 pt-2 mt-2">
                <p className="px-4 py-2 text-sm font-medium text-slate-500 uppercase tracking-wide">Kategoriyalar</p>
                {catalogItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:bg-slate-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
