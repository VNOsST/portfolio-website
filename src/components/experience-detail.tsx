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
import { TechnologyBadge } from "@/components/technology-badge"
import { buildImageUrl } from "@/lib/r2"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"
import type { Experience } from "@/types"

interface ExperienceDetailProps {
  experience: Experience
}

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
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

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {experience.role}
            {experience.type && (
              <span className="text-muted-foreground font-normal">
                {" "}
                ({experience.type})
              </span>
            )}
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            {experience.company}
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar className="h-4 w-4" />
            {experience.startDate} - {experience.endDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="h-4 w-4" />
            {experience.location}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-lg font-semibold">Highlights</h2>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {experience.images && experience.images.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Gallery</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {experience.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={buildImageUrl(img.src)}
                      alt={
                        img.alt || `${experience.company} screenshot ${idx + 1}`
                      }
                      className="absolute inset-0 h-full w-full object-cover rounded-xl"
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

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((techId) => (
              <TechnologyBadge key={techId} id={techId} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
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
      </div>
    </div>
  )
}
