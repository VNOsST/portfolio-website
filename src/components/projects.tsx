import { useMemo } from "react"
import { Link } from "@tanstack/react-router"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import type { TechnologyId } from "@/types"

interface ProjectsSectionProps {
  activeFilters: Array<TechnologyId>
  toggleFilter: (id: TechnologyId) => void
  limit?: number
}

export function ProjectsSection({
  activeFilters,
  toggleFilter,
  limit,
}: ProjectsSectionProps) {
  const filteredProjects = useMemo(() => {
    const items =
      activeFilters.length === 0
        ? projects
        : projects.filter((project) =>
            matchesAnyTechnologyFilter(project.technologies, activeFilters)
          )
    return limit ? items.slice(0, limit) : items
  }, [activeFilters, limit])

  return (
    <section id="projects" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Projects
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
