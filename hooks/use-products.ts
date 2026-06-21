"use client"
import { useProducts as useProductsContext } from "@/context/product-context"

export function useProducts() {
  return useProductsContext()
}
