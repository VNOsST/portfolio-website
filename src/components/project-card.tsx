import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { TechnologyBadge } from "@/components/technology-badge"
import { BadgeScrollRow } from "@/components/badge-scroll-row"
import { buildImageUrl } from "@/lib/r2"
import { IconCalendar, IconExternalLink } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import type { Project, TechnologyId } from "@/types"

interface ProjectCardProps {
  project: Project
  activeFilters?: Array<TechnologyId>
  toggleFilter?: (id: TechnologyId) => void
}

export function ProjectCard({
  project,
  activeFilters = [],
  toggleFilter,
}: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden hover:ring-primary/30 transition-all">
      {project.thumbnail_image && (
        <AspectRatio ratio={16 / 9} className="overflow-hidden">
          <img
            src={buildImageUrl(project.thumbnail_image)}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </AspectRatio>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="hover:underline underline-offset-2"
          >
            <h3 className="text-base font-semibold leading-tight">
              {project.title}
            </h3>
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
              aria-label="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <IconExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <IconCalendar className="h-3 w-3" />
          {project.startDate} - {project.endDate}
        </p>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pt-0 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <BadgeScrollRow>
          {project.technologies.map((techId) => (
            <TechnologyBadge
              key={techId}
              id={techId}
              active={activeFilters.includes(techId)}
              onClick={toggleFilter ? () => toggleFilter(techId) : undefined}
            />
          ))}
        </BadgeScrollRow>
      </CardFooter>
    </Card>
  )
}
