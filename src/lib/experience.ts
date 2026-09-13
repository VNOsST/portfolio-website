const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

export function formatMonthYear(date: Date): string {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`
}

export function formatDateLabel(date: Date | null): string {
  return date ? formatMonthYear(date) : "Present"
}

function resolveEnd(end: Date | null): Date {
  return end ?? new Date()
}

/** Inclusive month count, e.g. May 2026 - Aug 2026 = 4 mos. */
export function monthsBetween(start: Date, end: Date | null): number {
  const resolvedEnd = resolveEnd(end)
  return (
    (resolvedEnd.getFullYear() - start.getFullYear()) * 12 +
    (resolvedEnd.getMonth() - start.getMonth()) +
    1
  )
}

export function formatDuration(start: Date, end: Date | null): string | null {
  const totalMonths = monthsBetween(start, end)
  if (totalMonths <= 0) return null
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: Array<string> = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`)
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`)
  return parts.join(" ")
}

export function formatDateRange(start: Date, end: Date | null): string {
  const duration = formatDuration(start, end)
  const range = `${formatDateLabel(start)} - ${formatDateLabel(end)}`
  return duration ? `${range} · ${duration}` : range
}

interface DatedPosition {
  startDate: Date
  endDate: Date | null
}

/** Derive overall range from positions: earliest start → latest end (null = Present wins). */
export function getExperienceDateRange(
  positions: Array<DatedPosition>
): { startDate: Date; endDate: Date | null } | null {
  if (positions.length === 0) return null
  let earliest = positions[0].startDate
  let latest: Date | null = positions[0].endDate
  let hasPresent = positions[0].endDate === null

  for (const position of positions) {
    if (position.startDate.getTime() < earliest.getTime()) {
      earliest = position.startDate
    }
    if (position.endDate === null) {
      hasPresent = true
    } else if (
      !hasPresent &&
      (latest === null || position.endDate.getTime() > latest.getTime())
    ) {
      latest = position.endDate
    }
  }

  return { startDate: earliest, endDate: hasPresent ? null : latest }
}
