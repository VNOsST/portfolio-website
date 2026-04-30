import { cn } from "@/lib/utils"
import { getTechnology } from "@/data/technologies"
import type { TechnologyId } from "@/types"

interface TechnologyBadgeProps {
  id: TechnologyId
  size?: "sm" | "md"
  active?: boolean
  onClick?: () => void
}

export function TechnologyBadge({
  id,
  size = "sm",
  active,
  onClick,
}: TechnologyBadgeProps) {
  const tech = getTechnology(id)
  const Icon = tech.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border transition-colors",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted",
        onClick && "cursor-pointer"
      )}
      title={tech.name}
    >
      <Icon className={cn("shrink-0", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      <span className="font-medium">{tech.name}</span>
    </button>
  )
}
