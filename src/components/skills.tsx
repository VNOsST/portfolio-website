import { useNavigate } from "@tanstack/react-router"
import { TechnologyBadge } from "@/components/technology-badge"
import { skills } from "@/data/skills"
import type { TechnologyId } from "@/types"

export function SkillsSection({ compact }: { compact?: boolean }) {
  const navigate = useNavigate()

  function handleSkillClick(id: TechnologyId) {
    navigate({ to: "/work", search: { tech: id } })
  }

  const content = (
    <>
      <h2
        className={
          compact
            ? "text-xl sm:text-2xl font-bold tracking-tight"
            : "text-xl sm:text-2xl font-bold tracking-tight mb-8"
        }
      >
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
                <TechnologyBadge
                  key={skill}
                  id={skill}
                  onClick={() => handleSkillClick(skill)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )

  if (compact) return content

  return (
    <section id="skills" className="scroll-mt-16 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">{content}</div>
    </section>
  )
}
