"use client"

import type { Product } from "@/types"
import { X, ShoppingCart, Star, Package, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) return null

  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    Available: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "✓" },
    "Out of Stock": { bg: "bg-red-50", text: "text-red-700", icon: "✕" },
    "Coming Soon": { bg: "bg-amber-50", text: "text-amber-700", icon: "⏰" },
  }

  const status = statusColors[product.status]

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl md:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 md:p-6 border-b border-neutral-200 bg-white rounded-t-2xl md:rounded-t-2xl">
          <h2 className="text-lg md:text-2xl font-bold text-foreground line-clamp-2">{product.name}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-500 hover:text-foreground"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Image */}
            <div className="bg-neutral-100 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 md:h-80 object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-4 md:space-y-6">
              {/* Status and Rating */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border ${status.bg} ${status.text} border-opacity-20`}
                >
                  <span>{status.icon}</span>
                  <span>{product.status}</span>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-1 ml-auto">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                            i < Math.floor(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-semibold ml-1">{product.rating}</span>
                    <span className="text-xs md:text-sm text-neutral-600">({product.reviews})</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <span className="text-neutral-600 min-w-fit font-medium">Category:</span>
                  <span className="text-foreground">{product.category}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-600 min-w-fit font-medium">Brand:</span>
                  <span className="text-foreground font-semibold">{product.brand}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-600 min-w-fit font-medium">Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-neutral-300"
                      style={{
                        backgroundColor:
                          product.color.toLowerCase() === "black"
                            ? "#000"
                            : product.color.toLowerCase() === "white"
                              ? "#f5f5f5"
                              : product.color.toLowerCase() === "silver"
                                ? "#c0c0c0"
                                : product.color.toLowerCase() === "gray"
                                  ? "#808080"
                                  : "#e5e7eb",
                      }}
                    />
                    <span className="text-foreground">{product.color}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-200" />

              {/* Price */}
              <div>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
                <p
                  className={`text-sm md:text-base font-medium ${
                    product.quantity > 0 ? "text-emerald-700" : "text-red-700"
                  }`}
                >
                  {product.quantity > 0 ? `${product.quantity} in stock` : "Out of Stock"}
                </p>
              </div>

              {/* Stock and SKU */}
              <div className="bg-neutral-50 rounded-lg p-3 md:p-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Quantity Available: <strong>{product.quantity}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Code2 className="w-4 h-4 flex-shrink-0" />
                  <span>
                    SKU: <strong className="font-mono">{product.sku}</strong>
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                disabled={product.quantity === 0}
                className="w-full h-11 md:h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed text-sm md:text-base"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-neutral-200 pt-4 md:pt-6 md:col-span-2">
              <h3 className="font-bold text-foreground text-base md:text-lg mb-3">Description</h3>
              <p className="text-neutral-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
