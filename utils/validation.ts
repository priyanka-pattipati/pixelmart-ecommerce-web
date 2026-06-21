export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "").substring(0, 500)
}

export function validateProductForm(
  data: any,
  existingProducts: any[] = [],
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Product name is required"
  }

  if (!data.price || data.price <= 0) {
    errors.price = "Price must be greater than 0"
  }

  if (!data.quantity || data.quantity < 0) {
    errors.quantity = "Quantity cannot be negative"
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Category is required"
  }

  if (!data.brand || data.brand.trim().length === 0) {
    errors.brand = "Brand is required"
  }

  if (!data.sku || data.sku.trim().length === 0) {
    errors.sku = "SKU is required"
  } else {
    const skuExists = existingProducts.some((p) => p.sku.toUpperCase() === data.sku.toUpperCase())
    if (skuExists) {
      errors.sku = "This SKU already exists"
    }
  }

  if (!data.color || data.color.trim().length === 0) {
    errors.color = "Color is required"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
