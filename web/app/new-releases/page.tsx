import { products } from "@/lib/products"
import ProductGrid from "@/components/product-grid"
import { ChevronDown } from "lucide-react"

export default function NewReleasesPage() {
  // For demo purposes, we'll show the latest products (reverse order)
  const newReleases = [...products].reverse()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Yangi Chiqarilganlar</h1>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Saralash</span>
          <div className="relative">
            <select className="appearance-none border border-slate-300 bg-white pr-8 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent rounded-lg cursor-pointer">
              <option>Eng Yangi</option>
              <option>Narx: Arzondan Qimmatge</option>
              <option>Narx: Qimmatdan Arzonga</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-slate-400" />
          </div>
        </div>
      </div>
      <ProductGrid products={newReleases} />
    </div>
  )
}
