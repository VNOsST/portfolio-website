import { useMemo } from "react"
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
import { BadgeScrollRow } from "@/components/badge-scroll-row"
import { projects } from "@/data/projects"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import { buildImageUrl } from "@/lib/r2"
import { IconCalendar, IconExternalLink } from "@tabler/icons-react"
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
                <div className="space-y-2">
                  <BadgeScrollRow>
                    {project.technologies.map((techId) => (
                      <TechnologyBadge
                        key={techId}
                        id={techId}
                        active={activeFilters.includes(techId)}
                        onClick={() => toggleFilter(techId)}
                      />
                    ))}
                  </BadgeScrollRow>
                  <BadgeScrollRow>
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal shrink-0">
                        {tag}
                      </Badge>
                    ))}
                  </BadgeScrollRow>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
