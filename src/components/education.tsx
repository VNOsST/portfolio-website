import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { education } from "@/data/education"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Education
        </h2>
        <div className="flex flex-col gap-4">
          {education.map((edu, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {edu.degree}
                      {edu.minor && (
                        <span> — Minor in {edu.minor}</span>
                      )}
                    </p>
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
              {edu.gpa && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    GPA: <span className="font-medium text-foreground">{edu.gpa}</span>
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
