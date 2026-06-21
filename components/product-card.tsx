"use client"

import type { Product } from "@/types"
import { Star, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const statusColors: Record<string, string> = {
    Available: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    "Out of Stock": "bg-red-100 text-red-800 border border-red-300",
    "Coming Soon": "bg-amber-100 text-amber-800 border border-amber-300",
  }

  const statusIcons: Record<string, string> = {
    Available: "✓",
    "Out of Stock": "✕",
    "Coming Soon": "⏰",
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 transform"
    >
      {/* Image Container */}
      <div className="relative bg-neutral-100 h-40 md:h-48 overflow-hidden flex-shrink-0">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300&query=product"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[product.status]}`}
        >
          <span className="mr-1">{statusIcons[product.status]}</span>
          {product.status}
        </div>

        {/* Add to Cart Icon */}
        <div className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          <ShoppingCart className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow gap-3">
        {/* Name */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-blue-600 transition-colors text-sm md:text-base">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">{product.brand}</p>
        </div>

        {/* Rating and Stock */}
        <div className="flex items-center justify-between text-xs md:text-sm">
          {product.rating ? (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-neutral-700">{product.rating}</span>
              <span className="text-neutral-500">({product.reviews})</span>
            </div>
          ) : (
            <span className="text-neutral-500">No ratings yet</span>
          )}
          <span className={product.quantity > 0 ? "text-emerald-700 font-medium" : "text-red-700 font-medium"}>
            {product.quantity > 0 ? `${product.quantity}x` : "Out"}
          </span>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-lg md:text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
          <div className="flex gap-2">
            {product.color && (
              <div
                className="w-6 h-6 rounded-full border-2 border-neutral-300"
                style={{
                  backgroundColor:
                    product.color.toLowerCase() === "black"
                      ? "#000"
                      : product.color.toLowerCase() === "white"
                        ? "#fff"
                        : product.color.toLowerCase() === "silver"
                          ? "#c0c0c0"
                          : product.color.toLowerCase() === "gray"
                            ? "#808080"
                            : "#e5e7eb",
                }}
                title={product.color}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
