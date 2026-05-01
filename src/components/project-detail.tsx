import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { TechnologyBadge } from "@/components/technology-badge"
import { buildImageUrl } from "@/lib/r2"
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconCalendar,
  IconWorld,
} from "@tabler/icons-react"
import type { Project } from "@/types"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <div className="space-y-6">
      {project.thumbnail_image && (
        <AspectRatio ratio={16 / 9} className="rounded-2xl overflow-hidden">
          <img
            src={buildImageUrl(project.thumbnail_image)}
            alt={`${project.title} thumbnail`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </AspectRatio>
      )}

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {project.title}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="h-4 w-4 mr-1.5" />
                  GitHub
                </a>
              </Button>
            )}
            {project.youtube && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandYoutube className="h-4 w-4 mr-1.5" />
                  Video
                </a>
              </Button>
            )}
            {project.demo && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWorld className="h-4 w-4 mr-1.5" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
          <IconCalendar className="h-4 w-4" />
          {project.startDate} - {project.endDate}
        </p>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Highlights</h2>
        <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
          {project.highlights.map((highlight, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Gallery</h2>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {project.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="bg-muted rounded-xl border border-border/50">
                    <img
                      src={buildImageUrl(img.src)}
                      alt={img.alt || `${project.title} screenshot ${idx + 1}`}
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
            images={project.images}
            open={lightboxOpen}
            onOpenChange={setLightboxOpen}
            startIndex={lightboxIndex}
            title={project.title}
          />
        </div>
      )}

      <Separator />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((techId) => (
            <TechnologyBadge key={techId} id={techId} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
