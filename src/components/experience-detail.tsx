import { useState } from "react"
import { Badge } from "@/components/ui/badge"
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
import { ImageLightbox } from "@/components/ui/image-lightbox"
import {
  Timeline,
  TimelineBody,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline"
import { TechnologyBadge } from "@/components/technology-badge"
import { buildImageUrl } from "@/lib/r2"
import { formatDateRange, getExperienceDateRange } from "@/lib/experience"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"
import type { Experience, TechnologyId } from "@/types"

interface ExperienceDetailProps {
  experience: Experience
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const positions = experience.positions
  const isGrouped = positions.length > 1
  const range = getExperienceDateRange(positions)

  const allTechnologies: Array<TechnologyId> = positions
    .flatMap((p) => p.technologies)
    .filter((v, i, arr) => arr.indexOf(v) === i)

  const allTags: Array<string> = positions
    .flatMap((p) => p.tags ?? [])
    .filter((v, i, arr) => arr.indexOf(v) === i)

  const allHighlights: Array<string> = positions.flatMap((p) => p.highlights)

  return (
    <div className="space-y-8">
      {experience.thumbnail_image && (
        <AspectRatio ratio={21 / 9} className="rounded-2xl overflow-hidden">
          <img
            src={buildImageUrl(experience.thumbnail_image)}
            alt={`${experience.company} thumbnail`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </AspectRatio>
      )}

      {isGrouped ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {experience.icon && (
                <experience.icon className="h-14 w-14 shrink-0" />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {experience.company}
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  {positions.length} roles
                </p>
              </div>
            </div>
            {range && (
              <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar className="h-4 w-4" />
                  {formatDateRange(range.startDate, range.endDate)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconMapPin className="h-4 w-4" />
                  {experience.location}
                </span>
              </div>
            )}
          </div>
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
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                      <h2 className="text-lg font-semibold leading-tight">
                        {position.role}
                        {position.type && (
                          <span className="text-muted-foreground font-normal">
                            {" "}
                            ({position.type})
                          </span>
                        )}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                        <IconCalendar className="h-4 w-4 shrink-0" />
                        {formatDateRange(position.startDate, position.endDate)}
                      </span>
                    </div>
                  </TimelineBody>
                </TimelineItem>
              )
            })}
          </Timeline>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {experience.icon && (
              <experience.icon className="h-14 w-14 shrink-0" />
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {positions[0].role}
                {positions[0].type && (
                  <span className="text-muted-foreground font-normal">
                    {" "}
                    ({positions[0].type})
                  </span>
                )}
              </h1>
              <p className="text-base text-muted-foreground mt-1">
                {experience.company}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4" />
              {formatDateRange(positions[0].startDate, positions[0].endDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin className="h-4 w-4" />
              {experience.location}
            </span>
          </div>
        </div>
      )}

      {allHighlights.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">Highlights</h2>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              {allHighlights.map((highlight, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {experience.images && experience.images.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Gallery</h2>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {experience.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="bg-muted rounded-xl border border-border/50">
                    <img
                      src={buildImageUrl(img.src)}
                      alt={
                        img.alt || `${experience.company} screenshot ${idx + 1}`
                      }
                      className="max-w-full max-h-[600px] h-auto w-auto mx-auto cursor-pointer block"
                      loading="lazy"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setLightboxIndex(idx)
                        setLightboxOpen(true)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setLightboxIndex(idx)
                          setLightboxOpen(true)
                        }
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="start-2 z-10 bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background" />
            <CarouselNext className="end-2 z-10 bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background" />
          </Carousel>
          <ImageLightbox
            images={experience.images}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
            startIndex={lightboxIndex}
            title={experience.company}
          />
        </div>
      )}

      <Separator />

      <div className="space-y-4">
        {allTechnologies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((techId) => (
                <TechnologyBadge key={techId} id={techId} />
              ))}
            </div>
          </div>
        )}
        {allTags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
