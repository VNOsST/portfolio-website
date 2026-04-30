import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TechnologyBadge } from "@/components/technology-badge"
import { TechnologyFilter } from "@/components/technology-filter"
import { projects } from "@/data/projects"
import { getTechnology, matchesAnyTechnologyFilter } from "@/data/technologies"
import { buildImageUrl } from "@/lib/r2"
import { IconCalendar, IconExternalLink } from "@tabler/icons-react"
import type { TechnologyId } from "@/types"

export function ProjectsSection() {
  const [activeFilters, setActiveFilters] = useState<Array<TechnologyId>>([])

  const allTechIds = useMemo(() => {
    const set = new Set<TechnologyId>()
    for (const project of projects) {
      for (const techId of project.technologies) {
        set.add(techId)
      }
    }
    return Array.from(set)
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects
    return projects.filter((project) =>
      matchesAnyTechnologyFilter(project.technologies, activeFilters)
    )
  }, [activeFilters])

  function toggleFilter(id: TechnologyId) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const filterLabel = activeFilters
    .map((id) => getTechnology(id).name)
    .join(", ")

  return (
    <section id="projects" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Projects
        </h2>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3">
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
              <span className="font-medium text-foreground">{filterLabel}</span>{" "}
              {filteredProjects.length > 0
                ? `(${filteredProjects.length} item${filteredProjects.length === 1 ? "" : "s"})`
                : "(no matches)"}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col h-full overflow-hidden">
              {project.thumbnail_image && (
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={buildImageUrl(project.thumbnail_image)}
                    alt={`${project.title} thumbnail`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1.5">
                      <IconCalendar className="h-3 w-3" />
                      {project.startDate} - {project.endDate}
                    </p>
                  </div>
                  {project.github && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 -mt-1 -mr-2"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                      >
                        <IconExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground mb-4 flex-1">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {project.images && project.images.length > 0 && (
                  <div className="mb-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {project.images.map((img, idx) => (
                          <CarouselItem key={idx}>
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={buildImageUrl(img.src)}
                                alt={img.alt || `${project.title} screenshot ${idx + 1}`}
                                className="absolute inset-0 h-full w-full object-cover rounded-md"
                                loading="lazy"
                              />
                            </AspectRatio>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="start-2" />
                      <CarouselNext className="end-2" />
                    </Carousel>
                  </div>
                )}
                <Separator className="mt-auto mb-3" />
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((techId) => (
                    <TechnologyBadge
                      key={techId}
                      id={techId}
                      active={activeFilters.includes(techId)}
                      onClick={() => toggleFilter(techId)}
                    />
                  ))}
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
