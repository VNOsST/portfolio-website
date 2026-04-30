import { useMemo } from "react"
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
import { BadgeScrollRow } from "@/components/badge-scroll-row"
import { experiences } from "@/data/experiences"
import { matchesAnyTechnologyFilter } from "@/data/technologies"
import { buildImageUrl } from "@/lib/r2"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"
import type { TechnologyId } from "@/types"

interface ExperienceSectionProps {
  activeFilters: Array<TechnologyId>
  toggleFilter: (id: TechnologyId) => void
}

export function ExperienceSection({
  activeFilters,
  toggleFilter,
}: ExperienceSectionProps) {
  const filteredExperiences = useMemo(() => {
    if (activeFilters.length === 0) return experiences
    return experiences.filter((exp) =>
      matchesAnyTechnologyFilter(exp.technologies, activeFilters)
    )
  }, [activeFilters])

  return (
    <section id="experience" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Professional Experience
        </h2>

        <div className="flex flex-col gap-6">
          {filteredExperiences.map((exp) => (
            <Card key={exp.id} className="group overflow-hidden">
              {exp.thumbnail_image && (
                <AspectRatio ratio={21 / 9}>
                  <img
                    src={buildImageUrl(exp.thumbnail_image)}
                    alt={`${exp.company} thumbnail`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              )}
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {exp.role}
                      {exp.type && (
                        <span className="text-muted-foreground font-normal">
                          {" "}
                          ({exp.type})
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar className="h-3.5 w-3.5" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconMapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {exp.images && exp.images.length > 0 && (
                  <div className="my-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {exp.images.map((img, idx) => (
                          <CarouselItem key={idx}>
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={buildImageUrl(img.src)}
                                alt={img.alt || `${exp.company} screenshot ${idx + 1}`}
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
                <Separator className="my-4" />
                <div className="space-y-2">
                  <BadgeScrollRow>
                    {exp.technologies.map((techId) => (
                      <TechnologyBadge
                        key={techId}
                        id={techId}
                        active={activeFilters.includes(techId)}
                        onClick={() => toggleFilter(techId)}
                      />
                    ))}
                  </BadgeScrollRow>
                  <BadgeScrollRow>
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal shrink-0">
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
