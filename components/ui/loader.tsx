import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "spinner" | "dots" | "pulse" | "bars"
}

export function Loader({ 
  className, 
  size = "md", 
  variant = "spinner" 
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  }

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-2", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary-600 animate-pulse",
              size === "sm" && "h-2 w-2",
              size === "md" && "h-3 w-3",
              size === "lg" && "h-4 w-4",
              size === "xl" && "h-5 w-5"
            )}
            style={{
              animationDelay: `${i * 150}ms`
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-primary-600 animate-ping"></div>
        <div className="relative rounded-full bg-primary-600" style={{ width: '100%', height: '100%' }}></div>
      </div>
    )
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-primary-600 animate-pulse",
              size === "sm" && "h-4 w-1",
              size === "md" && "h-6 w-1.5",
              size === "lg" && "h-8 w-2",
              size === "xl" && "h-10 w-2.5"
            )}
            style={{
              animationDelay: `${i * 100}ms`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

interface PageLoaderProps {
  text?: string
  fullScreen?: boolean
}

export function PageLoader({ text = "Loading...", fullScreen = true }: PageLoaderProps) {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    : "flex items-center justify-center p-8"

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        <Loader size="lg" variant="spinner" />
        {text && (
          <p className="text-sm font-medium text-slate-600 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

export function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center space-x-2", className)}>
      <Loader size="sm" variant="spinner" />
      <span className="text-sm text-slate-600">Loading...</span>
    </div>
  )
}