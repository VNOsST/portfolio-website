import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/navbar"
import { AboutMe } from "@/components/about-me"
import { Footer } from "@/components/footer"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-svh bg-background/88 text-foreground">
      <Navbar />
      <main>
        <AboutMe />
      </main>
      <Footer />
    </div>
  )
}
