import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { TechnologyBadge } from "@/components/technology-badge"
import { BadgeScrollRow } from "@/components/badge-scroll-row"
import { buildImageUrl } from "@/lib/r2"
import {
  Timeline,
  TimelineBody,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline"
import { formatDateRange, getExperienceDateRange } from "@/lib/experience"
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
  const positions = experience.positions
  const isGrouped = positions.length > 1
  const range = getExperienceDateRange(positions)

  const allTechnologies: Array<TechnologyId> = positions
    .flatMap((p) => p.technologies)
    .filter((v, i, arr) => arr.indexOf(v) === i)

  const allTags: Array<string> = positions
    .flatMap((p) => p.tags ?? [])
    .filter((v, i, arr) => arr.indexOf(v) === i)

  if (!isGrouped) {
    const position = positions[0]
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {experience.icon && (
                <experience.icon className="h-10 w-10 shrink-0" />
              )}
              <div>
                <Link
                  to="/experiences/$experienceId"
                  params={{ experienceId: experience.id }}
                  className="hover:underline underline-offset-2"
                >
                  <h3 className="text-base font-semibold leading-tight">
                    {position.role}
                    {position.type && (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        ({position.type})
                      </span>
                    )}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {experience.company}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="h-3 w-3" />
                {formatDateRange(position.startDate, position.endDate)}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconMapPin className="h-3 w-3" />
                {experience.location}
              </span>
            </div>
          </div>
        </CardHeader>
        {(allTags.length > 0 || allTechnologies.length > 0) && (
          <CardFooter className="flex-col items-start gap-2 pt-0 pb-4">
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {allTags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {allTechnologies.length > 0 && (
              <BadgeScrollRow>
                {allTechnologies.map((techId) => (
                  <TechnologyBadge
                    key={techId}
                    id={techId}
                    active={activeFilters.includes(techId)}
                    onClick={
                      toggleFilter ? () => toggleFilter(techId) : undefined
                    }
                  />
                ))}
              </BadgeScrollRow>
            )}
          </CardFooter>
        )}
      </Card>
    )
  }

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
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {experience.icon && (
              <experience.icon className="h-10 w-10 shrink-0" />
            )}
            <div>
              <Link
                to="/experiences/$experienceId"
                params={{ experienceId: experience.id }}
                className="hover:underline underline-offset-2"
              >
                <h3 className="text-base font-semibold leading-tight">
                  {experience.company}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-0.5">
                {positions.length} roles
              </p>
            </div>
          </div>
          {range && (
            <div className="flex flex-col sm:items-end gap-0.5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="h-3 w-3" />
                {formatDateRange(range.startDate, range.endDate)}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconMapPin className="h-3 w-3" />
                {experience.location}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Timeline>
          {positions.map((position, idx) => {
            const isLast = idx === positions.length - 1
            return (
              <TimelineItem
                key={`${position.role}-${position.startDate.getTime()}`}
              >
                <TimelineHeader>
                  {!isLast && <TimelineSeparator />}
                  <TimelineIcon className="h-3 w-3" />
                </TimelineHeader>
                <TimelineBody className="-translate-y-1.5">
                  <h4 className="text-[15px] font-semibold leading-tight">
                    <Link
                      to="/experiences/$experienceId"
                      params={{ experienceId: experience.id }}
                      className="hover:underline underline-offset-2"
                    >
                      {position.role}
                    </Link>
                    {position.type && (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        ({position.type})
                      </span>
                    )}
                  </h4>
                </TimelineBody>
              </TimelineItem>
            )
          })}
        </Timeline>
      </CardContent>
      {(allTags.length > 0 || allTechnologies.length > 0) && (
        <CardFooter className="flex-col items-start gap-2 pt-0 pb-4">
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {allTags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {allTechnologies.length > 0 && (
            <BadgeScrollRow>
              {allTechnologies.map((techId) => (
                <TechnologyBadge
                  key={techId}
                  id={techId}
                  active={activeFilters.includes(techId)}
                  onClick={
                    toggleFilter ? () => toggleFilter(techId) : undefined
                  }
                />
              ))}
            </BadgeScrollRow>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
