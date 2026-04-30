import { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { ExperienceCard } from "@/components/experience-card"
import { experiences } from "@/data/experiences"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import type { TechnologyId } from "@/types"

interface ExperienceSectionProps {
  activeFilters: Array<TechnologyId>
  toggleFilter: (id: TechnologyId) => void
  limit?: number
}

export function ExperienceSection({
  activeFilters,
  toggleFilter,
  limit,
}: ExperienceSectionProps) {
  const filteredExperiences = useMemo(() => {
    const items =
      activeFilters.length === 0
        ? experiences
        : experiences.filter((exp) =>
            matchesAnyTechnologyFilter(exp.technologies, activeFilters)
          )
    return limit ? items.slice(0, limit) : items
  }, [activeFilters, limit])

  return (
    <section id="experience" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Professional Experience
          </h2>
          {limit && (
            <Link
              to="/work"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
