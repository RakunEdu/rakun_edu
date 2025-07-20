import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Biz Haqimizda</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Bizning jamoa"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Bizning Hikoyamiz</h2>
              <p className="text-gray-600 mb-4">
                2020-yilda tashkil etilgan kompaniyamiz O'zbekiston bo'ylab o'yin va komiks sevuvchilarga eng yaxshi
                stol o'yinlari va komikslarni yetkazib berishga ishtiyoqli. Bizning sayohatimiz oddiy maqsad bilan
                boshlandi: o'yinchilar va komiks sevuvchilar ajoyib hikoyalar va tajribalarni kashf eta oladigan jamiyat
                yaratish.
              </p>
              <p className="text-gray-600">
                Klassik strategiya o'yinlaridan tortib eng so'nggi grafik romanlargacha, biz barcha yoshdagi kishilar
                uchun sifat va o'yin-kulgi ta'minlash uchun to'plamimizni ehtiyotkorlik bilan tanlaymiz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎲</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sifatli O'yinlar</h3>
              <p className="text-gray-600">
                Biz faqat dunyo bo'ylab ishonchli nashriyotchilardan eng yuqori sifatli stol o'yinlarini tanlaymiz.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ajoyib Komikslar</h3>
              <p className="text-gray-600">
                Superqahramon sarguzashtlaridan tortib mustaqil grafik romanlargacha, har bir o'quvchi uchun
                hikoyalarimiz bor.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tez Yetkazib Berish</h3>
              <p className="text-gray-600">
                O'yinlar va komikslaringizni tezda sizga yetkazib berish uchun O'zbekiston bo'ylab tez va ishonchli
                yetkazib berish.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Bizning Jamiyatga Qo'shiling</h2>
            <p className="text-gray-600 mb-6">
              Siz tajribali o'yinchi bo'lasizmi yoki komiks to'plamingizni endigina boshlayotgan bo'lasizmi, biz sizga
              keyingi sevimli sarguzashtingizni topishda yordam berishga tayyormiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/board-games">
                <Button className="bg-black hover:bg-gray-700 text-white transition-colors">
                  Stol O'yinlarini O'rganing
                </Button>
              </Link>
              <Link href="/comics">
                <Button variant="outline" className="hover:bg-gray-100 transition-colors bg-transparent">
                  Komikslarni Ko'ring
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Biz Bilan Bog'laning</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
              <div>
                <h3 className="font-semibold">Manzil</h3>
                <p>
                  O'yin Ko'chasi 123
                  <br />
                  Toshkent, O'zbekiston
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Telefon</h3>
                <p>+998 90 123 45 67</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@oyinmagazin.uz</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
