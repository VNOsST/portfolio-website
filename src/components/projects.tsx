import { useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import type { TechnologyId } from "@/types"

interface ProjectsSectionProps {
  activeFilters: Array<TechnologyId>
  toggleFilter: (id: TechnologyId) => void
}

export function ProjectsSection({
  activeFilters,
  toggleFilter,
}: ProjectsSectionProps) {
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects
    return projects.filter((project) =>
      matchesAnyTechnologyFilter(project.technologies, activeFilters)
    )
  }, [activeFilters])

  return (
    <section id="projects" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Projects
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              activeFilters={activeFilters}
              toggleFilter={toggleFilter}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
