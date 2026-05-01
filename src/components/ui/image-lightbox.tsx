import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"
import { buildImageUrl } from "@/lib/r2"
import {
  IconX,
  IconZoomIn,
  IconZoomOut,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
  images: Array<{ src: string; alt?: string }>
  open: boolean
  onOpenChange: (open: boolean) => void
  startIndex?: number
  title?: string
}

export function ImageLightbox({
  images,
  open,
  onOpenChange,
  startIndex = 0,
  title,
}: ImageLightboxProps) {
  const [index, setIndex] = React.useState(startIndex)
  const [scale, setScale] = React.useState(1)
  const [pan, setPan] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [isDownloading, setIsDownloading] = React.useState(false)
  const dragStart = React.useRef({ x: 0, y: 0 })
  const hasDragged = React.useRef(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open) {
      setIndex(startIndex)
      setScale(1)
      setPan({ x: 0, y: 0 })
    }
  }, [open, startIndex])

  React.useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false)
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => {
          const next = i > 0 ? i - 1 : images.length - 1
          setScale(1)
          setPan({ x: 0, y: 0 })
          return next
        })
      } else if (e.key === "ArrowRight") {
        setIndex((i) => {
          const next = i < images.length - 1 ? i + 1 : 0
          setScale(1)
          setPan({ x: 0, y: 0 })
          return next
        })
      } else if (e.key === "+" || e.key === "=") {
        applyZoom(scale + 0.5, 0, 0)
      } else if (e.key === "-") {
        applyZoom(Math.max(scale - 0.5, 1), 0, 0)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, images.length, onOpenChange, scale])

  const currentImage = images[index]

  function goPrev() {
    setIndex((i) => {
      const next = i > 0 ? i - 1 : images.length - 1
      setScale(1)
      setPan({ x: 0, y: 0 })
      return next
    })
  }

  function goNext() {
    setIndex((i) => {
      const next = i < images.length - 1 ? i + 1 : 0
      setScale(1)
      setPan({ x: 0, y: 0 })
      return next
    })
  }

  /**
   * Zoom while keeping the point at (anchorX, anchorY) — relative to the
   * container centre — fixed on screen.
   *
   * transform: scale(s) translate(px/s, py/s)
   *   visual offset = (px, py)
   *
   * For a screen point offset (rx, ry) from container centre:
   *   image-local coords = (rx - px) / s
   *
   * After zoom to newScale:
   *   newPan = rx - local * newScale
   *          = rx - (rx - px) / s * newScale
   *          = rx * (1 - newScale/s) + px * newScale/s
   */
  function applyZoom(newScale: number, anchorX: number, anchorY: number) {
    const clamped = Math.min(Math.max(newScale, 1), 4)
    if (clamped === scale) return

    setScale((prevScale) => {
      const s = prevScale
      const ns = clamped
      setPan((prevPan) => {
        const rx = anchorX
        const ry = anchorY
        const newPanX = rx * (1 - ns / s) + prevPan.x * (ns / s)
        const newPanY = ry * (1 - ns / s) + prevPan.y * (ns / s)
        if (ns === 1) return { x: 0, y: 0 }
        return { x: newPanX, y: newPanY }
      })
      return ns
    })
  }

  function getRelativeMousePos(e: React.MouseEvent): { x: number; y: number } {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return {
      x: e.clientX - (rect.left + rect.width / 2),
      y: e.clientY - (rect.top + rect.height / 2),
    }
  }

  function zoomIn() {
    applyZoom(scale + 0.5, 0, 0)
  }

  function zoomOut() {
    applyZoom(Math.max(scale - 0.5, 1), 0, 0)
  }

  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    if (hasDragged.current) {
      hasDragged.current = false
      return
    }

    const pos = getRelativeMousePos(e)
    if (scale >= 4) {
      applyZoom(1, pos.x, pos.y)
    } else {
      applyZoom(Math.min(scale + 1, 4), pos.x, pos.y)
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (scale <= 1) return
    setIsDragging(true)
    hasDragged.current = false
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging || scale <= 1) return
    const newPan = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }
    const dist = Math.hypot(newPan.x - pan.x, newPan.y - pan.y)
    if (dist > 4) hasDragged.current = true
    setPan(newPan)
  }

  function handleMouseUp() {
    setIsDragging(false)
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault()
    const pos = getRelativeMousePos(e)
    const delta = e.deltaY < 0 ? 0.25 : -0.25
    applyZoom(scale + delta, pos.x, pos.y)
  }

  const imageUrl = buildImageUrl(currentImage.src)

  async function handleDownload() {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const response = await fetch(imageUrl)
      if (!response.ok) throw new Error("Failed to fetch image")
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      // Use the last segment of the path as filename
      const filename = currentImage.src.split("/").pop() || "image"
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch {
      // Fallback: open in new tab if fetch fails (e.g. CORS)
      window.open(imageUrl, "_blank", "noopener,noreferrer")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="fixed inset-0 z-50 bg-black/90 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          onClick={() => onOpenChange(false)}
        />
        <DialogPrimitive.Popup
          className="fixed inset-0 z-50 flex flex-col outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top toolbar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3 text-white/90">
              <span className="text-sm font-medium">
                {index + 1} / {images.length}
              </span>
              {title && (
                <span className="text-sm text-white/60 hidden sm:inline">
                  {title}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={zoomOut}
                disabled={scale <= 1}
                aria-label="Zoom out"
              >
                <IconZoomOut className="h-5 w-5" />
              </Button>
              <span className="text-xs text-white/70 w-10 text-center tabular-nums">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={zoomIn}
                disabled={scale >= 4}
                aria-label="Zoom in"
              >
                <IconZoomIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={handleDownload}
                disabled={isDownloading}
                aria-label="Download image"
              >
                {isDownloading ? (
                  <IconLoader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <IconDownload className="h-5 w-5" />
                )}
              </Button>
              <DialogPrimitive.Close
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    aria-label="Close"
                  />
                }
              >
                <IconX className="h-5 w-5" />
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Image area */}
          <div
            ref={containerRef}
            className="flex-1 relative flex items-center justify-center overflow-hidden cursor-default"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute start-2 sm:start-4 z-10 text-white/80 hover:text-white hover:bg-white/10 rounded-full h-10 w-10"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <IconChevronLeft className="h-6 w-6" />
              </Button>
            )}

            <img
              src={imageUrl}
              alt={currentImage.alt || `${title || "Image"} ${index + 1}`}
              className={cn(
                "max-h-full max-w-full object-contain transition-transform duration-200 select-none",
                scale > 1 &&
                  (isDragging ? "cursor-grabbing" : "cursor-crosshair")
              )}
              style={{
                transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
              }}
              onClick={handleImageClick}
              draggable={false}
            />

            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute end-2 sm:end-4 z-10 text-white/80 hover:text-white hover:bg-white/10 rounded-full h-10 w-10"
                onClick={goNext}
                aria-label="Next image"
              >
                <IconChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Bottom caption */}
          {currentImage.alt && (
            <div className="px-4 py-3 sm:px-6 text-center">
              <p className="text-sm text-white/80">{currentImage.alt}</p>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
