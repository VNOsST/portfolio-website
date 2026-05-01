import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageLightbox } from "@/components/ui/image-lightbox"
import { education } from "@/data/education"
import { IconMapPin, IconCalendar, IconAward } from "@tabler/icons-react"
import type { Education } from "@/types"

function EducationCard({ edu }: { edu: Education }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            {edu.icon && <edu.icon className="h-10 w-10 shrink-0" />}
            <div>
              <h3 className="text-lg font-semibold leading-tight">
                {edu.institution}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {edu.degree}
                {edu.minor && <span> — Minor in {edu.minor}</span>}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-3.5 w-3.5" />
              {edu.startDate} - {edu.endDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin className="h-3.5 w-3.5" />
              {edu.location}
            </span>
          </div>
        </div>
      </CardHeader>
      {(edu.gpa || edu.scholarsListImage) && (
        <CardContent className="pt-0 flex flex-wrap items-center gap-2">
          {edu.gpa && (
            <p className="text-sm text-muted-foreground">
              GPA:{" "}
              <span className="font-medium text-foreground">{edu.gpa}</span>
            </p>
          )}
          {edu.scholarsListImage && (
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-primary/90 shadow-sm"
              onClick={() => setLightboxOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setLightboxOpen(true)
                }
              }}
            >
              <IconAward className="h-3.5 w-3.5" />
              Scholar's List
            </Badge>
          )}
        </CardContent>
      )}
      {edu.scholarsListImage && (
        <ImageLightbox
          images={[
            {
              src: edu.scholarsListImage,
              alt: "Scholar's List for Academic Excellence",
            },
          ]}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          startIndex={0}
          title="Scholar's List"
        />
      )}
    </Card>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Education
        </h2>
        <div className="flex flex-col gap-4">
          {education.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  )
}
