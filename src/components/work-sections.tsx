import { useMemo } from "react"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { useQueryState, parseAsArrayOf, parseAsStringLiteral } from "nuqs"
import { ExperienceSection } from "@/components/experience"
import { ProjectsSection } from "@/components/projects"
import { TechnologyFilter } from "@/components/technology-filter"
import { experiences } from "@/data/experiences"
import { projects } from "@/data/projects"
import {
  getTechnology,
  getAllTechnologyIds,
  matchesAnyTechnologyFilter,
} from "@/data/technologies"
import type { TechnologyId } from "@/types"

const technologiesParser = parseAsArrayOf(
  parseAsStringLiteral(getAllTechnologyIds() as ReadonlyArray<TechnologyId>)
).withDefault([])

export function WorkSections({
  showFilter = true,
  limit,
}: {
  showFilter?: boolean
  limit?: number
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const [activeFilters, setActiveFiltersRaw] = useQueryState(
    "tech",
    technologiesParser
  )

  const allTechIds = useMemo(() => getAllTechnologyIds(), [])

  function setActiveFilters(value: Array<TechnologyId>) {
    setActiveFiltersRaw(value)
  }

  function toggleFilter(id: TechnologyId) {
    if (location.pathname !== "/work") {
      navigate({ to: "/work", search: { tech: id } })
      return
    }

    setActiveFiltersRaw((prev) =>
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
      {showFilter && (
        <section className="scroll-mt-16 pt-12 sm:pt-16 pb-4">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap justify-end">
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
      )}
      <ExperienceSection
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        limit={limit}
      />
      <ProjectsSection
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        limit={limit}
      />
    </>
  )
}
