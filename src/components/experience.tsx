import { useMemo } from "react"
import { ExperienceCard } from "@/components/experience-card"
import { experiences } from "@/data/experiences"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import type { TechnologyId } from "@/types"

interface ExperienceSectionProps {
  activeFilters: Array<TechnologyId>
  toggleFilter: (id: TechnologyId) => void
}

export function ExperienceSection({
  activeFilters,
  toggleFilter,
}: ExperienceSectionProps) {
  const filteredExperiences = useMemo(() => {
    if (activeFilters.length === 0) return experiences
    return experiences.filter((exp) =>
      matchesAnyTechnologyFilter(exp.technologies, activeFilters)
    )
  }, [activeFilters])

  return (
    <section id="experience" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Professional Experience
        </h2>

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
