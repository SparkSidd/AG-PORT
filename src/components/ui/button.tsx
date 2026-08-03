import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-emerald-500 text-black hover:bg-emerald-400",
        variant === "outline" && "border border-white/20 bg-transparent text-white hover:bg-white/10",
        variant === "ghost" && "bg-transparent text-white hover:bg-white/10",
        className
      )}
      {...props}
    />
  )
)
Button.displayName = "Button"
export { Button }
