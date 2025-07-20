import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import { getBoardGames, getMyHeroProducts, getUpcomingProducts } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const boardGames = getBoardGames().slice(0, 5)
  const myHeroProducts = getMyHeroProducts()
  const upcomingProducts = getUpcomingProducts()

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection />

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Board Games Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Stol O'yinlari</h2>
              <p className="text-slate-600">Ta'lim va qiziqarli o'yinlar to'plami</p>
            </div>
            <Link href="/board-games">
              <Button variant="outline" className="hover:bg-slate-100 transition-colors bg-transparent">
                Barchasini Ko'rish
              </Button>
            </Link>
          </div>
          <ProductGrid products={boardGames} />
        </section>

        {/* My Hero Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">My Hero</h2>
              <p className="text-slate-600">Qahramonlik haqidagi ajoyib hikoyalar</p>
            </div>
            <Link href="/my-hero">
              <Button variant="outline" className="hover:bg-slate-100 transition-colors bg-transparent">
                Batafsil
              </Button>
            </Link>
          </div>
          <ProductGrid products={myHeroProducts} />
        </section>

        {/* Upcoming Section */}
        <section>
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-3xl font-bold text-slate-900">Tez Orada</h2>
              <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full font-medium">Yangi</span>
            </div>
            <p className="text-slate-600">Kutilayotgan yangi mahsulotlar</p>
          </div>
          <ProductGrid products={upcomingProducts} />
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Stol O'yinlari</h3>
              <p className="text-slate-600 mb-6">Ta'lim va strategiya o'yinlari</p>
              <Link href="/board-games">
                <Button className="bg-slate-800 text-white hover:bg-slate-700 transition-colors">Ko'rish</Button>
              </Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">My Hero</h3>
              <p className="text-slate-600 mb-6">Qahramonlik haqidagi kitoblar</p>
              <Link href="/my-hero">
                <Button className="bg-slate-800 text-white hover:bg-slate-700 transition-colors">Ko'rish</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
