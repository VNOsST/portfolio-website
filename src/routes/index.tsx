import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WorkSections } from "@/components/work-sections"
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
        <WorkSections showFilter={false} limit={3} />
        <SkillsSection />
        <EducationSection />
      </main>
      <Footer />
    </div>
  )
}
