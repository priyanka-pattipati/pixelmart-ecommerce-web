export interface Product {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  brand: string
  status: "Available" | "Out of Stock" | "Coming Soon"
  color: string
  sku: string
  image: string
  description?: string
  rating?: number
  reviews?: number
}

export interface FilterOptions {
  search: string
  category: string[]
  brand: string[]
  status: string[]
  priceRange: [number, number]
  sortBy: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}
