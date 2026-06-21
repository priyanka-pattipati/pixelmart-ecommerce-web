"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Header } from "@/components/header"
import { AddProductForm } from "@/components/add-product-form"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function AddProductPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white sticky top-16 md:top-20 z-20">
        <div className="container-app py-3 md:py-4">
          <Link
            href="/products"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <div className="container-app py-6 md:py-8">
        <div className="max-w-3xl">
          {/* Heading */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Add New Product</h1>
            <p className="text-neutral-600 text-sm md:text-base">
              Fill in the details below to add a new product to your inventory
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 md:p-8">
            <AddProductForm
              onSuccess={() => {
                router.push("/products")
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
