import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rakun Edu - ",
  description: "Rakun Edu kompaniyasidan eng yaxshi stol o'yinlarini xarid qiling",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <div>{children}</div>
        </CartProvider>
      </body>
    </html>
  )
}
