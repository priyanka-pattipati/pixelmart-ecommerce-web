"use client"

import type React from "react"

import type { FilterOptions } from "@/types"
import { CATEGORIES, BRANDS, PRODUCT_STATUS } from "@/utils/constants"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ProductFilterProps {
  currentFilters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

export function ProductFilter({ currentFilters, onFilterChange }: ProductFilterProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    price: true,
    category: false,
    brand: false,
    status: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const FilterSection = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between font-semibold text-foreground hover:text-blue-600 transition-colors"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${openSections[id] ? "rotate-180" : ""}`} />
      </button>
      {openSections[id] && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      {/* Price Range */}
      <FilterSection title="Price Range" id="price">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={currentFilters.priceRange[1]}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                priceRange: [currentFilters.priceRange[0], Number.parseInt(e.target.value)],
              })
            }
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-neutral-600 font-medium">
            <span>${currentFilters.priceRange[0]}</span>
            <span>${currentFilters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" id="category">
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.category.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange({
                      ...currentFilters,
                      category: [...currentFilters.category, category],
                    })
                  } else {
                    onFilterChange({
                      ...currentFilters,
                      category: currentFilters.category.filter((c) => c !== category),
                    })
                  }
                }}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand" id="brand">
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.brand.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange({
                      ...currentFilters,
                      brand: [...currentFilters.brand, brand],
                    })
                  } else {
                    onFilterChange({
                      ...currentFilters,
                      brand: currentFilters.brand.filter((b) => b !== brand),
                    })
                  }
                }}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Status */}
      <FilterSection title="Status" id="status">
        <div className="space-y-2">
          {PRODUCT_STATUS.map((status) => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.status.includes(status)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange({
                      ...currentFilters,
                      status: [...currentFilters.status, status],
                    })
                  } else {
                    onFilterChange({
                      ...currentFilters,
                      status: currentFilters.status.filter((s) => s !== status),
                    })
                  }
                }}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm text-neutral-700 group-hover:text-blue-600 transition-colors">{status}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset Filters */}
      <div className="pt-4">
        <Button
          onClick={() =>
            onFilterChange({
              search: "",
              category: [],
              brand: [],
              status: [],
              priceRange: [0, 1000],
              sortBy: "name",
            })
          }
          className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium py-2 rounded-lg transition-colors"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
