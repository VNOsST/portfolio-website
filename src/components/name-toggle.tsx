import { useState, useEffect, useRef } from "react"
import { profile } from "@/data/profile"
import { IconRepeat } from "@tabler/icons-react"

const TYPING_SPEED = 70
const DELETING_SPEED = 40

export function NameToggle() {
  const [isVietnamese, setIsVietnamese] = useState(true)
  const [displayText, setDisplayText] = useState(profile.vietnameseName)
  const isAnimating = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const toggle = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    const current = displayText
    const target = isVietnamese ? profile.englishName : profile.vietnameseName
    const nextIsVietnamese = !isVietnamese

    let chars = current.length
    function deleteStep() {
      if (chars <= 0) {
        let typed = 0
        function typeStep() {
          if (typed >= target.length) {
            setDisplayText(target)
            isAnimating.current = false
            setIsVietnamese(nextIsVietnamese)
            return
          }
          typed++
          setDisplayText(target.slice(0, typed))
          timeoutRef.current = setTimeout(typeStep, TYPING_SPEED)
        }
        timeoutRef.current = setTimeout(typeStep, TYPING_SPEED)
        return
      }
      chars--
      setDisplayText(current.slice(0, chars))
      timeoutRef.current = setTimeout(deleteStep, DELETING_SPEED)
    }
    timeoutRef.current = setTimeout(deleteStep, DELETING_SPEED)
  }

  return (
    <button
      onClick={toggle}
      disabled={isAnimating.current}
      className="group inline-flex items-center gap-2"
      aria-label={`Toggle name. Current: ${displayText}`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        {displayText}
        <span className="inline-block w-[3px] h-[1em] bg-current ml-0.5 align-middle animate-cursor-blink" />
      </h1>
      <span className="text-muted-foreground/0 group-hover:text-muted-foreground transition-colors duration-200">
        <IconRepeat className="h-4 w-4" />
      </span>
    </button>
  )
}
