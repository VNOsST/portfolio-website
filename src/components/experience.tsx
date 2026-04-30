import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TechnologyBadge } from "@/components/technology-badge"
import { TechnologyFilter } from "@/components/technology-filter"
import { experiences } from "@/data/experiences"
import {
  getTechnology,
  matchesAnyTechnologyFilter,
} from "@/data/technologies"
import { IconMapPin, IconCalendar } from "@tabler/icons-react"
import type { TechnologyId } from "@/types"

export function ExperienceSection() {
  const [activeFilters, setActiveFilters] = useState<TechnologyId[]>([])

  const allTechIds = useMemo(() => {
    const set = new Set<TechnologyId>()
    for (const exp of experiences) {
      for (const techId of exp.technologies) {
        set.add(techId)
      }
    }
    return Array.from(set)
  }, [])

  const filteredExperiences = useMemo(() => {
    if (activeFilters.length === 0) return experiences
    return experiences.filter((exp) =>
      matchesAnyTechnologyFilter(exp.technologies, activeFilters)
    )
  }, [activeFilters])

  function toggleFilter(id: TechnologyId) {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const filterLabel = activeFilters
    .map((id) => getTechnology(id).name)
    .join(", ")

  return (
    <section id="experience" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Professional Experience
        </h2>

        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <TechnologyFilter
              value={activeFilters}
              onChange={setActiveFilters}
              options={allTechIds}
            />
          </div>
          {activeFilters.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Showing results for{" "}
              <span className="font-medium text-foreground">
                {filterLabel}
              </span>{" "}
              {filteredExperiences.length > 0
                ? `(${filteredExperiences.length} item${filteredExperiences.length === 1 ? "" : "s"})`
                : "(no matches)"}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {filteredExperiences.map((exp) => (
            <Card key={exp.id} className="group">
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
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((techId) => (
                    <TechnologyBadge
                      key={techId}
                      id={techId}
                      active={activeFilters.includes(techId)}
                      onClick={() => toggleFilter(techId)}
                    />
                  ))}
                  {exp.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
