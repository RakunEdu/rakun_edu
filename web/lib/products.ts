import type { Product } from "./types"

export interface ProductWithGallery extends Product {
  gallery?: string[]
}

export const products: ProductWithGallery[] = [
  // Board Games
  {
    id: "rakun-quruvchi",
    name: "Rakun Quruvchi",
    category: "Ta'lim Stol O'yini",
    price: 250000,
    features: ["2-4 O'yinchi", "30+ Daqiqa", "Ta'lim"],
    image: "/images/rakun_q.png",
    gallery: [
      "/images/rakun_1_board.png",
    ],
  },
  {
    id: "rakun-tilchi",
    name: "Rakun Tilchi",
    category: "Til O'rganish O'yini Ta'lim Stol O'yini",
    price: 100000,
    features: ["1-6 O'yinchi", "45+ Daqiqa", "Ta'lim"],
    image: "/images/rakun_l.png",
    gallery: [
      "/images/rakun_t_board.png",
    ],
  },
  
  // My Hero
  {
    id: "samira-va-oltin-pat",
    name: "Samira va Oltin Pat",
    category: "My Hero Kitob",
    price: 200000,
    features: ["Premium Nashr", "Rangli", "Bolalar uchun"],
    image: "/images/rakun_hero.png",
    gallery: [
    ],
  },

  // Upcoming Products
  {
    id: "rakun-matematik",
    name: "Rakun Matematik",
    category: "Matematik O'yin",
    price: 200000,
    features: ["2-4 O'yinchi", "30+ Daqiqa", "Ta'lim"],
    image: "/images/rakun_m.png",
    gallery: [
    ],
  },
  {
    id: "rakun-kimyogar",
    name: "Rakun Kimyogar",
    category: "Kimyo O'yini",
    price: 200000,
    features: ["1-4 O'yinchi", "45+ Daqiqa", "Ta'lim"],
    image: "/images/rakun_k.png",
    gallery: [
  
    ],
  },
]

// Helper functions to get products by category
export const getBoardGames = () =>
  products.filter(
    (product) =>
      product.category.includes("Stol O'yini") ||
      (product.category.includes("O'yin") &&
        !product.category.includes("My Hero") &&
        !["rakun-matematik", "rakun-kimyogar"].includes(product.id)),
  )

export const getMyHeroProducts = () => products.filter((product) => product.category.includes("My Hero"))

export const getUpcomingProducts = () =>
  products.filter((product) => ["rakun-matematik", "rakun-kimyogar"].includes(product.id))
