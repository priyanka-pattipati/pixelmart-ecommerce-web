"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { ProductFilter } from "@/components/product-filter"
import { ProductModal } from "@/components/product-modal"
import { Pagination } from "@/components/pagination"
import { ITEMS_PER_PAGE } from "@/utils/constants"
import type { Product, FilterOptions } from "@/types"
import { Search, Menu, X } from "lucide-react"

export default function ProductsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { products, loading: productsLoading } = useProducts()
  const router = useRouter()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: [],
    brand: [],
    status: [],
    priceRange: [0, 1000],
    sortBy: "newest",
  })

  // Check auth
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category))
    }

    // Brand filter
    if (filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand))
    }

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((p) => filters.status.includes(p.status))
    }

    // Price range filter
    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    // Sorting
    switch (filters.sortBy) {
      case "rating-high":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "rating-low":
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0))
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
    }

    setFilteredProducts(result)
    setCurrentPage(1)
  }, [filters, products])

  if (authLoading || productsLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthenticated) {
    return null
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      {/* Search Bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="container-app flex items-center gap-3 py-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm md:text-base"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden flex items-center justify-center w-10 h-10 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {showMobileFilter ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-app py-6 md:py-8">
        <div className="flex gap-4 md:gap-6">
          {/* Sidebar Filter */}
          <aside
            className={`fixed md:static inset-0 top-auto md:top-0 bg-white md:bg-transparent z-40 md:z-auto md:w-64 md:flex-shrink-0 ${
              showMobileFilter ? "block" : "hidden md:block"
            } overflow-y-auto max-h-[calc(100vh-200px)]`}
          >
            <ProductFilter currentFilters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Products Section */}
          <div className="flex-1 w-full md:w-auto">
            {/* Sort and Count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm md:text-base text-neutral-600">
                Showing <strong className="text-foreground">{paginatedProducts.length}</strong> of{" "}
                <strong className="text-foreground">{filteredProducts.length}</strong> products
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-3 md:px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm font-medium bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
              </select>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsModalOpen(true)
                      }}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            ) : (
              <div className="text-center py-12 md:py-16">
                <p className="text-neutral-600 text-base md:text-lg font-medium">
                  No products found matching your criteria
                </p>
                <p className="text-neutral-500 text-sm md:text-base mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
