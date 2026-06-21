"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/types"

interface ProductContextType {
  products: Product[]
  staticProducts: Product[]
  userProducts: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, "id">) => Promise<void>
  getProductById: (id: string) => Product | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [staticProducts, setStaticProducts] = useState<Product[]>([])
  const [userProducts, setUserProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeProducts = async () => {
      try {
        // Load static products from JSON (only once)
        const res = await fetch("/data/products.json")
        const staticData = await res.json()
        setStaticProducts(staticData)

        // Load user-added products from localStorage
        const storedUserProducts = localStorage.getItem("WearMart_user_products")
        if (storedUserProducts) {
          setUserProducts(JSON.parse(storedUserProducts))
        } else {
          setUserProducts([])
        }
      } catch (error) {
        console.error("[v0] Error loading products:", error)
        setUserProducts([])
      } finally {
        setLoading(false)
      }
    }
    initializeProducts()
  }, [])

  const addProduct = async (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: `user-${Date.now()}`,
    }
    const updatedUserProducts = [...userProducts, newProduct]
    setUserProducts(updatedUserProducts)
    localStorage.setItem("WearMart_user_products", JSON.stringify(updatedUserProducts))
  }

  const getProductById = (id: string) => {
    const allProducts = [...staticProducts, ...userProducts]
    return allProducts.find((p) => p.id === id)
  }

  const allProducts = [...staticProducts, ...userProducts]

  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        staticProducts,
        userProducts,
        loading,
        addProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within ProductProvider")
  }
  return context
}
