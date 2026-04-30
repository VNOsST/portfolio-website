import { useMemo, useState } from "react"
import { ExperienceSection } from "@/components/experience"
import { ProjectsSection } from "@/components/projects"
import { TechnologyFilter } from "@/components/technology-filter"
import { experiences } from "@/data/experiences"
import { projects } from "@/data/projects"
import { getTechnology, getAllTechnologyIds, matchesAnyTechnologyFilter } from "@/data/technologies"
import type { TechnologyId } from "@/types"

export function WorkSections() {
  const [activeFilters, setActiveFilters] = useState<Array<TechnologyId>>([])

  const allTechIds = useMemo(() => getAllTechnologyIds(), [])

  function toggleFilter(id: TechnologyId) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const filteredExperiences = useMemo(() => {
    if (activeFilters.length === 0) return experiences
    return experiences.filter((exp) =>
      matchesAnyTechnologyFilter(exp.technologies, activeFilters)
    )
  }, [activeFilters])

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects
    return projects.filter((project) =>
      matchesAnyTechnologyFilter(project.technologies, activeFilters)
    )
  }, [activeFilters])

  const filterLabel = activeFilters
    .map((id) => getTechnology(id).name)
    .join(", ")

  return (
    <>
      <section className="scroll-mt-16 pt-12 sm:pt-16 pb-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <TechnologyFilter
                value={activeFilters}
                onChange={setActiveFilters}
                options={allTechIds}
              />
            </div>
            {activeFilters.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Showing results for{" "}
                <span className="font-medium text-foreground">
                  {filterLabel}
                </span>
                {" · "}
                {filteredExperiences.length} experience
                {filteredExperiences.length === 1 ? "" : "s"}
                {", "}
                {filteredProjects.length} project
                {filteredProjects.length === 1 ? "" : "s"}
              </p>
            )}
          </div>
        </div>
      </section>
      <ExperienceSection
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
      />
      <ProjectsSection
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
      />
    </>
  )
}
