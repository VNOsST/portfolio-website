import { TechnologyBadge } from "@/components/technology-badge"
import { skills } from "@/data/skills"

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
          Technical Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((category) => (
            <div
              key={category.category}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold mb-3 text-card-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <TechnologyBadge key={skill} id={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
