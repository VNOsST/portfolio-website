import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { TechnologyBadge } from "@/components/technology-badge"
import { BadgeScrollRow } from "@/components/badge-scroll-row"
import { buildImageUrl } from "@/lib/r2"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import type { Experience, TechnologyId } from "@/types"

interface ExperienceCardProps {
  experience: Experience
  activeFilters?: Array<TechnologyId>
  toggleFilter?: (id: TechnologyId) => void
}

export function ExperienceCard({
  experience,
  activeFilters = [],
  toggleFilter,
}: ExperienceCardProps) {
  return (
    <Card className="group overflow-hidden hover:ring-primary/30 transition-all">
      {experience.thumbnail_image && (
        <AspectRatio ratio={21 / 9} className="overflow-hidden">
          <img
            src={buildImageUrl(experience.thumbnail_image)}
            alt={`${experience.company} thumbnail`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </AspectRatio>
      )}
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div>
            <Link
              to="/experiences/$experienceId"
              params={{ experienceId: experience.id }}
              className="hover:underline underline-offset-2"
            >
              <h3 className="text-base font-semibold leading-tight">
                {experience.role}
                {experience.type && (
                  <span className="text-muted-foreground font-normal">
                    {" "}
                    ({experience.type})
                  </span>
                )}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-0.5">
              {experience.company}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <IconCalendar className="h-3 w-3" />
              {experience.startDate} - {experience.endDate}
            </span>
            <span className="inline-flex items-center gap-1">
              <IconMapPin className="h-3 w-3" />
              {experience.location}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {experience.highlights[0]}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pt-0 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {experience.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <BadgeScrollRow>
          {experience.technologies.map((techId) => (
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
