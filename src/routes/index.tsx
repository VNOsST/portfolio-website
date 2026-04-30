import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ExperienceSection } from "@/components/experience"
import { ProjectsSection } from "@/components/projects"
import { SkillsSection } from "@/components/skills"
import { EducationSection } from "@/components/education"
import { Footer } from "@/components/footer"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
      </main>
      <Footer />
    </div>
  )
}
