import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { WorkSections } from "@/components/work-sections"
import { Footer } from "@/components/footer"

export const Route = createFileRoute("/work")({
  component: WorkPage,
})

function WorkPage() {
  return (
    <div className="min-h-svh bg-background/88 text-foreground">
      <Navbar />
      <main className="pt-14">
        <WorkSections />
      </main>
      <Footer />
    </div>
  )
}
