import { useRef, useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

interface BadgeScrollRowProps {
  children: React.ReactNode
  className?: string
}

export function BadgeScrollRow({ children, className }: BadgeScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState])

  function scrollBy(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy(-160)}
          className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm h-5 w-5 hover:bg-muted cursor-pointer pointer-events-auto"
          aria-label="Scroll left"
        >
          <IconChevronLeft className="h-3 w-3" />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy(160)}
          className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm h-5 w-5 hover:bg-muted cursor-pointer pointer-events-auto"
          aria-label="Scroll right"
        >
          <IconChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
