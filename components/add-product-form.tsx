"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { useProducts } from "@/context/product-context"
import { validateProductForm, sanitizeInput } from "@/utils/validation"
import { CATEGORIES, BRANDS, PRODUCT_STATUS, COLORS } from "@/utils/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle } from "lucide-react"

interface AddProductFormProps {
  onSuccess?: () => void
}

export function AddProductForm({ onSuccess }: AddProductFormProps) {
  const { addProduct, products } = useProducts()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    sku: "",
    color: "",
    status: "Available",
    image: "",
    description: "",
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")
    setLoading(true)

    try {
      const validation = validateProductForm(formData, products)

      if (!validation.valid) {
        setErrors(validation.errors)
        return
      }

      await addProduct({
        name: sanitizeInput(formData.name),
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        category: formData.category,
        brand: formData.brand,
        sku: sanitizeInput(formData.sku),
        color: formData.color,
        status: formData.status as "Available" | "Out of Stock" | "Coming Soon",
        image: formData.image || "/diverse-products-still-life.png",
        description: formData.description ? sanitizeInput(formData.description) : undefined,
      })

      setSuccessMessage("Product added successfully! Redirecting...")

      // Reset form
      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: "",
        brand: "",
        sku: "",
        color: "",
        status: "Available",
        image: "",
        description: "",
      })

      setTimeout(() => onSuccess?.(), 1500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm md:text-base">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-emerald-800 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Product Information Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-neutral-200">Product Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Product Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              className={`h-11 ${errors.name ? "border-red-500 focus:border-red-500" : "border-neutral-300"}`}
            />
            {errors.name && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="font-medium">
              Price ($) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className={`h-11 ${errors.price ? "border-red-500 focus:border-red-500" : "border-neutral-300"}`}
            />
            {errors.price && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.price}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-medium">
              Quantity *
            </Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="0"
              className={`h-11 ${errors.quantity ? "border-red-500 focus:border-red-500" : "border-neutral-300"}`}
            />
            {errors.quantity && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.quantity}
              </div>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="font-medium">
              SKU (Unique) *
            </Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="e.g., PROD-001"
              className={`h-11 ${errors.sku ? "border-red-500 focus:border-red-500" : "border-neutral-300"}`}
            />
            {errors.sku && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.sku}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Classification Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-neutral-200">Classification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="font-medium">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className={`h-11 ${errors.category ? "border-red-500" : "border-neutral-300"}`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </div>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <Label htmlFor="brand" className="font-medium">
              Brand *
            </Label>
            <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
              <SelectTrigger className={`h-11 ${errors.brand ? "border-red-500" : "border-neutral-300"}`}>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brand && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.brand}
              </div>
            )}
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color" className="font-medium">
              Color *
            </Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
              <SelectTrigger className={`h-11 ${errors.color ? "border-red-500" : "border-neutral-300"}`}>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.color && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.color}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="font-medium">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="h-11 border-neutral-300">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_STATUS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Media & Description Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-neutral-200">Media & Description</h2>
        <div className="space-y-4 md:space-y-6">
          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="font-medium">
              Image URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="h-11 border-neutral-300"
            />
            {formData.image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-neutral-200">
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-32 md:h-40 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/diverse-products-still-life.png"
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description (optional)"
              rows={4}
              className="border-neutral-300 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 md:gap-4 pt-4 border-t border-neutral-200">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-11 md:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 text-sm md:text-base"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </Button>
      </div>
    </form>
  )
}
