import SearchPageClient from "./SearchPageClient"

export const dynamic = "force-static"

// Or alternatively, you can pre-generate some common search terms:
export async function generateStaticParams() {
  const commonSearches = ["rakun", "stol", "oyini", "komiks"]
  return commonSearches.map((q) => ({ q }))
}

export default function SearchPage() {
  return <SearchPageClient />
}
