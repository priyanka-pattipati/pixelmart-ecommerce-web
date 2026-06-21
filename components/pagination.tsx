"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter((p) => {
    return p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  })

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-8 md:mt-10 overflow-x-auto pb-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex-shrink-0 p-2 h-10 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-foreground rounded-lg transition-colors"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </Button>

      {visiblePages.map((page, idx) => {
        const prevPage = visiblePages[idx - 1]
        return (
          <div key={page} className="flex items-center gap-1 md:gap-2">
            {prevPage && page - prevPage > 1 && (
              <span className="px-1 md:px-2 text-neutral-400 text-xs md:text-sm">...</span>
            )}
            <Button
              onClick={() => onPageChange(page)}
              className={`flex-shrink-0 h-10 px-2 md:px-4 text-sm md:text-base font-medium rounded-lg transition-colors ${
                page === currentPage
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-foreground border border-neutral-300 hover:bg-neutral-100"
              }`}
            >
              {page}
            </Button>
          </div>
        )
      })}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex-shrink-0 p-2 h-10 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-foreground rounded-lg transition-colors"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </Button>
    </div>
  )
}
