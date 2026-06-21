"use client"

export function LoadingSpinner({
  size = "md",
  fullScreen = false,
}: { size?: "sm" | "md" | "lg"; fullScreen?: boolean }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const spinner = (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-neutral-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-neutral-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return spinner
}
